export type CompanionPromptId =
  | "recruiter-summary"
  | "role"
  | "decisions"
  | "tradeoffs"
  | "impressive";

export type CompanionMessage = {
  role: "user" | "assistant";
  content: string;
};

export type CompanionPrompt = {
  id: CompanionPromptId;
  label: string;
  question: string;
};

export const companionPrompts: CompanionPrompt[] = [
  {
    id: "recruiter-summary",
    label: "Give Me The 30-Second Recruiter Summary",
    question: "Give me the 30-second recruiter summary for this case study."
  },
  {
    id: "role",
    label: "What Was Ignacio's Role?",
    question: "What was Ignacio's role in this project?"
  },
  {
    id: "decisions",
    label: "What Decisions Should I Notice?",
    question: "What important design or product decisions should I notice in this case study?"
  },
  {
    id: "tradeoffs",
    label: "What Tradeoffs Did He Make?",
    question: "What tradeoffs did Ignacio make in this project?"
  },
  {
    id: "impressive",
    label: "Why Is This Project Impressive?",
    question: "Why is this project impressive from a hiring manager perspective?"
  }
];

export function isCompanionPromptId(value: unknown): value is CompanionPromptId {
  return companionPrompts.some((prompt) => prompt.id === value);
}

