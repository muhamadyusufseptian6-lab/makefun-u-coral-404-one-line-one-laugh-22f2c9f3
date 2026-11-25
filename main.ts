// One Line, One Laugh — make.fun entry (u-coral-404-one-line-one-laugh-22f2c9f3)
//
// Writes a single hilarious line (at most 200 characters) to
// $MAKEFUN_OUTPUT_DIR/entry.txt, where the sealed gate checks it is
// UTF-8 text of 1 to 200 characters, not only white space.
//
// Node 22, stdlib-only, deterministic: the same input always produces
// the same byte-identical entry.txt.
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

// The one-liner, invented for this bounty from the judge brief:
// a single line, a surprise turn, every word earning its place.
const ENTRY =
  "I hired an AI to manage my life; it outsourced me to a cheaper human.";

// Resolve paths from this script's location, never from process.cwd().
const repoDir = dirname(fileURLToPath(import.meta.url));

const inputDir = process.env.MAKEFUN_INPUT_DIR ?? "/input";
const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
void inputDir;
void repoDir;

// Never delete or recreate the output dir: only ensure it exists.
mkdirSync(outputDir, { recursive: true });

// Gate: 1-200 characters, not only whitespace, single line.
const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} characters, must be 1-200`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry must not be only whitespace");
}
if (ENTRY.replace(/\n$/, "").includes("\n")) {
  throw new Error("entry must be a single line");
}

writeFileSync(join(outputDir, "entry.txt"), ENTRY + "\n", "utf8");
