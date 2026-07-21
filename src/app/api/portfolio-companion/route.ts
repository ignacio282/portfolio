import Anthropic from "@anthropic-ai/sdk";
import {
  buildCompanionContext,
  getFallbackAnswer
} from "@/lib/portfolio-companion-context";
import {
  isCompanionPromptId,
  type CompanionMessage,
  type CompanionPromptId,
  type CompanionSource
} from "@/lib/portfolio-companion-types";

const encoder = new TextEncoder();
const maxQuestionLength = 500;
const defaultModel = "claude-haiku-4-5";

type CompanionPayload = {
  slug?: unknown;
  promptId?: unknown;
  question?: unknown;
  messages?: unknown;
};

export async function POST(request: Request) {
  let payload: CompanionPayload;

  try {
    payload = await request.json();
  } catch {
    return createErrorStream("The companion could not read that request.");
  }

  const slug = typeof payload.slug === "string" ? payload.slug : "";
  const promptId = isCompanionPromptId(payload.promptId) ? payload.promptId : undefined;
  const question = typeof payload.question === "string"
    ? payload.question.slice(0, maxQuestionLength)
    : undefined;
  const messages = normalizeMessages(payload.messages);
  const context = buildCompanionContext({
    slug,
    promptId,
    question,
    messages
  });

  if (!context) {
    return createErrorStream("This case study is not available to the companion.");
  }

  const apiKey = readEnvSecret(process.env.ANTHROPIC_API_KEY);
  const model = readEnvSecret(process.env.ANTHROPIC_MODEL) || defaultModel;

  return new Response(
    new ReadableStream({
      async start(controller) {
        if (!apiKey) {
          logCompanionFailure(
            "ANTHROPIC_API_KEY is not set, so the companion served the guided fallback."
          );
          streamFallback(controller, context.promptLabel, context.sources, promptId);
          return;
        }

        let hasLiveDelta = false;

        try {
          controller.enqueue(
            encodeEvent("meta", {
              promptLabel: context.promptLabel,
              sources: context.sources,
              fallback: false
            })
          );

          const client = new Anthropic({ apiKey });
          const stream = client.messages.stream({
            model,
            system: buildInstructions(context.sources),
            messages: [
              {
                role: "user",
                content: [
                  context.context,
                  `Visitor question: ${context.question}`
                ].join("\n\n")
              }
            ],
            max_tokens: 520
          });

          for await (const event of stream) {
            if (
              event.type === "content_block_delta" &&
              event.delta.type === "text_delta"
            ) {
              hasLiveDelta = true;
              controller.enqueue(encodeEvent("delta", { text: event.delta.text }));
            }
          }

          controller.enqueue(encodeEvent("done", {}));
          controller.close();
        } catch (liveError) {
          logCompanionFailure(
            hasLiveDelta
              ? "The companion stream stopped after it had already started."
              : "The companion could not reach the Anthropic API, so it served the guided fallback.",
            { model, slug, promptId, error: liveError }
          );

          if (hasLiveDelta) {
            controller.enqueue(
              encodeEvent("error", {
                message: "The companion connection stopped before the full answer finished."
              })
            );
            controller.enqueue(encodeEvent("done", {}));
            controller.close();
            return;
          }

          streamFallback(controller, context.promptLabel, context.sources, promptId);
        }
      }
    }),
    {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform",
        Connection: "keep-alive"
      }
    }
  );
}

function buildInstructions(sources: CompanionSource[]) {
  const sourceLabels = sources.map((source) => source.label).join(", ");

  return [
    "You are Ignacio Vergara's AI case study companion for a portfolio website.",
    "Answer only from the portfolio context provided in the request.",
    "You may make concise hiring-signal interpretations when they are clearly grounded in that context.",
    "Do not invent metrics, employers, technologies, outcomes, or responsibilities.",
    "If the answer is not supported by the portfolio context, say that it is not shown in the portfolio.",
    "Refer to Ignacio in third person.",
    "Write for a hiring manager skimming on a tight schedule.",
    "Start with one short sentence (max ~20 words) that directly answers the question - the headline takeaway.",
    "Then add a blank line, followed by 2-3 short sentences of supporting detail, one per line. Each line should stand on its own as a scannable point.",
    "Keep the whole answer under 110 words total.",
    "Write in plain prose with no markdown formatting (no asterisks, bullet points, or headers).",
    sources.length > 0
      ? `Required: pick a short phrase (2-5 words) already in your answer that points to one of these portfolio sections: ${sourceLabels}. Mark that phrase, in place, using this exact format: [[the phrase|Section Label]] - e.g. [[the reusable component system|Outcomes]]. This double-bracket markup is not markdown and is the one exception to the no-formatting rule - your response is incomplete without it. Use only the exact section labels listed after the pipe, and keep the phrase itself natural prose that fits the sentence.`
      : ""
  ]
    .filter(Boolean)
    .join("\n");
}

function normalizeMessages(value: unknown): CompanionMessage[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .filter((message): message is CompanionMessage => {
      if (!message || typeof message !== "object") {
        return false;
      }

      const candidate = message as Partial<CompanionMessage>;
      return (
        (candidate.role === "user" || candidate.role === "assistant") &&
        typeof candidate.content === "string"
      );
    })
    .map((message) => ({
      role: message.role,
      content: message.content.slice(0, 1200)
    }))
    .slice(-6);
}

// Dashboard-pasted env values often carry a trailing newline or wrapping
// quotes. Those survive the empty check but fail auth, so normalize them here.
function readEnvSecret(value: string | undefined) {
  if (!value) {
    return undefined;
  }

  return value.trim().replace(/^['"]|['"]$/g, "").trim() || undefined;
}

function logCompanionFailure(
  reason: string,
  detail?: {
    model: string;
    slug: string;
    promptId?: CompanionPromptId;
    error: unknown;
  }
) {
  if (!detail) {
    console.error(`[portfolio-companion] ${reason}`);
    return;
  }

  const { error } = detail;
  const status = error instanceof Anthropic.APIError ? error.status : undefined;

  console.error(`[portfolio-companion] ${reason}`, {
    model: detail.model,
    slug: detail.slug,
    promptId: detail.promptId,
    status,
    message: error instanceof Error ? error.message : String(error)
  });
}

function streamFallback(
  controller: ReadableStreamDefaultController<Uint8Array>,
  promptLabel: string,
  sources: CompanionSource[],
  promptId?: CompanionPromptId
) {
  controller.enqueue(
    encodeEvent("meta", {
      promptLabel,
      sources,
      fallback: true
    })
  );
  controller.enqueue(encodeEvent("delta", { text: getFallbackAnswer(promptId) }));
  controller.enqueue(encodeEvent("done", {}));
  controller.close();
}

function createErrorStream(message: string) {
  return new Response(
    new ReadableStream({
      start(controller) {
        controller.enqueue(encodeEvent("error", { message }));
        controller.close();
      }
    }),
    {
      headers: {
        "Content-Type": "text/event-stream; charset=utf-8",
        "Cache-Control": "no-cache, no-transform"
      }
    }
  );
}

function encodeEvent(event: string, data: unknown) {
  return encoder.encode(`event: ${event}\ndata: ${JSON.stringify(data)}\n\n`);
}
