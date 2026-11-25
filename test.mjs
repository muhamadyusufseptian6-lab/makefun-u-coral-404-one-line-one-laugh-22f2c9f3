// TDD-lite tests for the One Line, One Laugh entry.
// Run: node test.mjs  (from the entry dir)
// Checks the kit requirements BEFORE/AFTER main.ts exists:
//  1. entry.txt is written to $MAKEFUN_OUTPUT_DIR
//  2. gate: UTF-8 text, 1-200 characters, not only whitespace
//  3. determinism: two runs produce byte-identical output
//  4. stdlib-only: main.ts imports nothing outside node: builtins
//  5. single line: no newline inside the entry text
import { spawnSync } from "node:child_process";
import { mkdtempSync, readFileSync, existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const entryDir = new URL(".", import.meta.url).pathname;
const mainTs = join(entryDir, "main.ts");

let failures = 0;
function check(name, ok, detail = "") {
  console.log(`${ok ? "PASS" : "FAIL"} ${name}${detail ? " — " + detail : ""}`);
  if (!ok) failures++;
}

function runMain(outDir) {
  return spawnSync(process.execPath, [mainTs], {
    env: { ...process.env, MAKEFUN_OUTPUT_DIR: outDir, MAKEFUN_INPUT_DIR: "/input" },
    encoding: "utf8",
  });
}

// 0. main.ts exists (watch this fail first, before the entry is written)
check("main.ts exists", existsSync(mainTs));
if (!existsSync(mainTs)) {
  console.log(`\n${failures} failure(s) — main.ts not written yet (expected at TDD step 1).`);
  process.exit(1);
}

// 4. stdlib-only imports
const src = readFileSync(mainTs, "utf8");
const imports = [...src.matchAll(/from\s+["']([^"']+)["']/g)].map((m) => m[1]);
const nonStd = imports.filter((i) => !i.startsWith("node:") && !i.startsWith("./") && !i.startsWith("../"));
check("stdlib-only imports", nonStd.length === 0, `imports: ${imports.join(", ") || "(none)"}`);

const out1 = mkdtempSync(join(tmpdir(), "one-line-a-"));
const out2 = mkdtempSync(join(tmpdir(), "one-line-b-"));
const r1 = runMain(out1);
const r2 = runMain(out2);
check("run 1 exits 0", r1.status === 0, r1.stderr.trim());
check("run 2 exits 0", r2.status === 0, r2.stderr.trim());

const f1 = join(out1, "entry.txt");
const f2 = join(out2, "entry.txt");
check("entry.txt written (run 1)", existsSync(f1));
check("entry.txt written (run 2)", existsSync(f2));
if (existsSync(f1) && existsSync(f2)) {
  const t1 = readFileSync(f1, "utf8");
  const t2 = readFileSync(f2, "utf8");
  // 3. determinism
  check("deterministic output", t1 === t2);
  // 2. gate: 1-200 chars, not only whitespace
  const len = [...t1].length;
  check("1-200 characters", len >= 1 && len <= 200, `${len} chars`);
  check("not only whitespace", t1.trim().length > 0);
  // 5. single line
  check("single line (no newline inside)", !t1.replace(/\n$/, "").includes("\n"), JSON.stringify(t1));
  console.log(`\nENTRY (${len} chars): ${JSON.stringify(t1)}`);
}

console.log(failures === 0 ? "\nALL TESTS GREEN" : `\n${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);
