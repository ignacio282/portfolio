import OpenAI from "openai";
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
const defaultModel = "gpt-5.4-mini";

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

  const apiKey = process.env.OPENAI_API_KEY;
  const model = process.env.OPENAI_MODEL || defaultModel;

  return new Response(
    new ReadableStream({
      async start(controller) {
        if (!apiKey) {
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

          const client = new OpenAI({ apiKey });
          const stream = await client.responses.create({
            model,
            instructions: buildInstructions(context.sources.length > 0),
            input: [
              context.context,
              `Visitor question: ${context.question}`
            ].join("\n\n"),
            stream: true,
            max_output_tokens: 520
          });

          for await (const event of stream) {
            if (event.type === "response.output_text.delta" && event.delta) {
              hasLiveDelta = true;
              controller.enqueue(encodeEvent("delta", { text: event.delta }));
            }
          }

          controller.enqueue(encodeEvent("done", {}));
          controller.close();
        } catch {
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

function buildInstructions(hasSources: boolean) {
  return [
    "You are Ignacio Vergara's AI case study companion for a portfolio website.",
    "Answer only from the portfolio context provided in the request.",
    "You may make concise hiring-signal interpretations when they are clearly grounded in that context.",
    "Do not invent metrics, employers, technologies, outcomes, or responsibilities.",
    "If the answer is not supported by the portfolio context, say that it is not shown in the portfolio.",
    "Refer to Ignacio in third person.",
    "Keep answers concise, useful, and specific. Target 120-180 words.",
    hasSources ? "End with one short sentence that starts with 'Relevant sections:' and names the relevant source labels." : ""
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
