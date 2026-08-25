import { Fragment, type ReactNode } from "react";

// Content strings mark emphasis inline so the copy stays plain text and keeps
// round-tripping with the markdown copy decks: **bold** and *italic*.
export function withEmphasis(text: string): ReactNode {
  return text.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g).map((token, index) => {
    if (token.startsWith("**") && token.endsWith("**")) {
      return <strong key={index}>{token.slice(2, -2)}</strong>;
    }

    if (token.length > 2 && token.startsWith("*") && token.endsWith("*")) {
      return <em key={index}>{token.slice(1, -1)}</em>;
    }

    return <Fragment key={index}>{token}</Fragment>;
  });
}

/** Same markers, stripped — for plain-text consumers like the AI context. */
export function stripEmphasis(text: string): string {
  return text.replace(/\*{1,2}([^*]+)\*{1,2}/g, "$1");
}
