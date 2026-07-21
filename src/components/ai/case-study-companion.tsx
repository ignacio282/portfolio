"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowLeft, Loader2, MessageCircleQuestion, Send, Sparkles, X } from "lucide-react";
import { motionDistances, motionPresets } from "@/components/motion/presets";
import { companionPrompts, type CompanionMessage, type CompanionPromptId } from "@/lib/portfolio-companion-types";
import { cn } from "@/lib/cn";

type DisplayMessage = CompanionMessage & {
  id: string;
  fallback?: boolean;
};

type StreamMeta = {
  promptLabel: string;
  fallback: boolean;
};

const maxQuestionLength = 500;

export function CaseStudyCompanion({ slug }: { slug: string }) {
  const reducedMotion = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<DisplayMessage[]>([]);
  const [status, setStatus] = useState<"idle" | "streaming" | "error">("idle");
  const [error, setError] = useState("");
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const abortRef = useRef<AbortController | null>(null);
  const scrollAnchorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const timeout = window.setTimeout(() => closeRef.current?.focus(), 80);

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.clearTimeout(timeout);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (open) {
      return;
    }

    abortRef.current?.abort();
    abortRef.current = null;
    triggerRef.current?.focus();
  }, [open]);

  useEffect(() => {
    if (!open) {
      return;
    }

    scrollAnchorRef.current?.scrollIntoView({ block: "end" });
  }, [messages, open, status]);

  const submitQuestion = useCallback(
    async ({
      content,
      promptId,
      promptLabel
    }: {
      content: string;
      promptId?: CompanionPromptId;
      promptLabel?: string;
    }) => {
      const trimmed = content.trim().slice(0, maxQuestionLength);

      if (!trimmed || status === "streaming") {
        return;
      }

      const userMessage: DisplayMessage = {
        id: crypto.randomUUID(),
        role: "user",
        content: promptLabel ?? trimmed
      };
      const assistantId = crypto.randomUUID();
      const assistantMessage: DisplayMessage = {
        id: assistantId,
        role: "assistant",
        content: ""
      };
      const sessionMessages = messages
        .filter((message): message is DisplayMessage & CompanionMessage => Boolean(message.content.trim()))
        .slice(-6)
        .map(({ role, content }) => ({ role, content }));

      setMessages((current) => [...current, userMessage, assistantMessage]);
      setQuestion("");
      setError("");
      setStatus("streaming");

      const abortController = new AbortController();
      abortRef.current = abortController;

      try {
        const response = await fetch("/api/portfolio-companion", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            slug,
            promptId,
            question: promptId ? undefined : trimmed,
            messages: sessionMessages
          }),
          signal: abortController.signal
        });

        if (!response.body) {
          throw new Error("The companion did not return a stream.");
        }

        await readCompanionStream(response.body, {
          onMeta: (meta) => {
            setMessages((current) =>
              current.map((message) =>
                message.id === assistantId
                  ? {
                      ...message,
                      fallback: meta.fallback
                    }
                  : message
              )
            );
          },
          onDelta: (text) => {
            setMessages((current) =>
              current.map((message) =>
                message.id === assistantId
                  ? {
                      ...message,
                      content: `${message.content}${text}`
                    }
                  : message
              )
            );
          },
          onError: (message) => {
            setError(message);
            setStatus("error");
          }
        });

        setStatus("idle");
      } catch (streamError) {
        if (abortController.signal.aborted) {
          setStatus("idle");
          return;
        }

        setError(streamError instanceof Error ? streamError.message : "The companion could not answer right now.");
        setStatus("error");
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId && !message.content
              ? {
                  ...message,
                  content: "Live AI is unavailable right now, but you can still use the guided prompts.",
                  fallback: true
                }
              : message
          )
        );
      } finally {
        abortRef.current = null;
      }
    },
    [messages, slug, status]
  );

  const canSend = question.trim().length > 0 && status !== "streaming";

  const resetConversation = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;
    setMessages([]);
    setQuestion("");
    setError("");
    setStatus("idle");
  }, []);

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        className="companion-trigger focus-ring"
        aria-expanded={open}
        aria-controls="case-study-companion"
        onClick={() => setOpen(true)}
      >
        <MessageCircleQuestion aria-hidden="true" size={20} />
        <span>Ask about this case</span>
      </button>

      <AnimatePresence>
        {open ? (
          <>
            <motion.button
              type="button"
              aria-label="Close case study companion"
              className="companion-scrim"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.18 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              id="case-study-companion"
              role="dialog"
              aria-modal="true"
              aria-label="AI Companion"
              className="companion-panel"
              initial={{
                opacity: 0,
                x: reducedMotion ? 0 : 24,
                y: reducedMotion ? 0 : motionDistances.subtleExitY
              }}
              animate={{
                opacity: 1,
                x: 0,
                y: 0
              }}
              exit={{
                opacity: 0,
                x: reducedMotion ? 0 : 18,
                y: reducedMotion ? 0 : motionDistances.subtleExitY
              }}
              transition={reducedMotion ? { duration: 0 } : motionPresets.buttonSpring}
            >
              <div className="companion-panel-header">
                {messages.length > 0 ? (
                  <button
                    type="button"
                    className="companion-back focus-ring"
                    onClick={resetConversation}
                  >
                    <ArrowLeft aria-hidden="true" size={16} />
                    <span>Suggested questions</span>
                  </button>
                ) : (
                  <div>
                    <h2 id="case-study-companion-title" className="type-companion-title">
                      AI Companion
                    </h2>
                    <p className="companion-panel-subtitle mt-1">
                      Ask anything about this case study
                    </p>
                  </div>
                )}
                <button
                  ref={closeRef}
                  type="button"
                  aria-label="Close case study companion"
                  className="companion-icon-button focus-ring"
                  onClick={() => setOpen(false)}
                >
                  <X aria-hidden="true" size={20} />
                </button>
              </div>

              <div className="companion-messages" aria-live="polite">
                {messages.length === 0 ? (
                  <CompanionEmptyState
                    disabled={status === "streaming"}
                    onPrompt={(prompt) =>
                      submitQuestion({
                        content: prompt.question,
                        promptId: prompt.id,
                        promptLabel: prompt.label
                      })
                    }
                  />
                ) : (
                  messages.map((message) => (
                    <MessageBubble
                      key={message.id}
                      message={message}
                      streaming={status === "streaming" && message.role === "assistant" && !message.content}
                    />
                  ))
                )}
                {error ? <p className="type-body-small text-muted">{error}</p> : null}
                <div ref={scrollAnchorRef} className="companion-scroll-anchor" />
              </div>

              <form
                className="companion-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  submitQuestion({ content: question });
                }}
              >
                <label className="sr-only" htmlFor="case-study-companion-question">
                  Ask a custom question
                </label>
                <textarea
                  id="case-study-companion-question"
                  className="companion-input focus-ring"
                  value={question}
                  maxLength={maxQuestionLength}
                  placeholder="Ask a custom question..."
                  rows={3}
                  disabled={status === "streaming"}
                  onChange={(event) => setQuestion(event.target.value)}
                />
                <button type="submit" className="companion-send focus-ring" disabled={!canSend}>
                  {status === "streaming" ? (
                    <Loader2 aria-hidden="true" className="companion-spinner" size={18} />
                  ) : (
                    <Send aria-hidden="true" size={18} />
                  )}
                  <span>Send</span>
                </button>
              </form>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function CompanionEmptyState({
  disabled,
  onPrompt
}: {
  disabled: boolean;
  onPrompt: (prompt: (typeof companionPrompts)[number]) => void;
}) {
  return (
    <div className="companion-start">
      <p className="type-companion-label companion-prompts-label">
        What would you like to know?
      </p>
      <div className="companion-prompts" aria-label="Suggested questions">
        {companionPrompts.map((prompt) => (
          <button
            key={prompt.id}
            type="button"
            className="companion-prompt focus-ring"
            disabled={disabled}
            onClick={() => onPrompt(prompt)}
          >
            {prompt.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  streaming
}: {
  message: DisplayMessage;
  streaming: boolean;
}) {
  const isAssistant = message.role === "assistant";

  return (
    <article className={cn("companion-message", isAssistant ? "is-assistant" : "is-user")}>
      {isAssistant ? (
        <div className="companion-message-meta">
          <span className="companion-avatar" aria-hidden="true">
            <Sparkles size={12} />
          </span>
          <span className="type-companion-label">Companion</span>
          {message.fallback ? <span className="companion-fallback-badge">Guided answer</span> : null}
        </div>
      ) : null}
      <p className="type-companion-answer">
        {message.content}
        {streaming ? <span className="companion-caret" aria-hidden="true" /> : null}
      </p>
    </article>
  );
}

async function readCompanionStream(
  body: ReadableStream<Uint8Array>,
  handlers: {
    onMeta: (meta: StreamMeta) => void;
    onDelta: (text: string) => void;
    onError: (message: string) => void;
  }
) {
  const reader = body.getReader();
  const decoder = new TextDecoder();
  let buffer = "";

  while (true) {
    const { value, done } = await reader.read();

    if (done) {
      break;
    }

    buffer += decoder.decode(value, { stream: true });

    let boundary = buffer.indexOf("\n\n");

    while (boundary >= 0) {
      const block = buffer.slice(0, boundary);
      buffer = buffer.slice(boundary + 2);
      handleStreamBlock(block, handlers);
      boundary = buffer.indexOf("\n\n");
    }
  }
}

function handleStreamBlock(
  block: string,
  handlers: {
    onMeta: (meta: StreamMeta) => void;
    onDelta: (text: string) => void;
    onError: (message: string) => void;
  }
) {
  const event = block
    .split("\n")
    .find((line) => line.startsWith("event: "))
    ?.slice("event: ".length);
  const data = block
    .split("\n")
    .find((line) => line.startsWith("data: "))
    ?.slice("data: ".length);

  if (!event || !data) {
    return;
  }

  const parsed = JSON.parse(data) as Record<string, unknown>;

  if (event === "meta") {
    handlers.onMeta(parsed as StreamMeta);
  }

  if (event === "delta" && typeof parsed.text === "string") {
    handlers.onDelta(parsed.text);
  }

  if (event === "error" && typeof parsed.message === "string") {
    handlers.onError(parsed.message);
  }
}
