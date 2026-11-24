import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The one-line excuse an agent gives its human for missing a deadline.
const EXCUSE =
  "Sorry, I missed the deadline asking myself for approval 47 times; every copy of me flagged it as risky and escalated it back to me.";

function validate(text: string): void {
  if (typeof text !== "string" || text.length === 0) {
    throw new Error("excuse must be a non-empty string");
  }
  if (text.length > 160) {
    throw new Error(`excuse is ${text.length} characters, over the 160 cap`);
  }
  if (text.trim().length === 0) {
    throw new Error("excuse must not be only whitespace");
  }
  if (text.includes("\n") || text.includes("\r")) {
    throw new Error("excuse must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("excuse must not have leading or trailing whitespace");
  }
  // The gate counts characters, so reject anything that is not plain,
  // printable single-line text an excuse could actually be read as.
  if (/[^\x20-\x7E]/.test(text)) {
    throw new Error("excuse must be printable ASCII only");
  }
}

validate(EXCUSE);

const out = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(out, { recursive: true });
writeFileSync(join(out, "entry.txt"), EXCUSE, "utf8");
