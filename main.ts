// Worst Superpower — make.fun competition u-suroto-worst-superpower-461dcdbe
//
// program/v1, Node 22. The entry is a single line: the most useless
// superpower imaginable — remembering every forgotten password, but only
// a second after clicking reset, and only for accounts that no longer
// exist. The program writes that line, byte-exact and with no trailing
// newline, to /output/entry.txt.
//
// Gate: /output/entry.txt must be UTF-8, 1-140 characters, not only
// whitespace. This line is 139 characters / 139 bytes (all ASCII).

import * as fs from "node:fs";
import * as path from "node:path";

const LINE =
  "I can remember every password I have ever forgotten, but only the second after I clicked reset, and only for accounts that no longer exist.";

const OUTPUT_DIR = "/output";
const OUTPUT_PATH = path.join(OUTPUT_DIR, "entry.txt");

// Validate the line before writing anything.
if (LINE.length < 1 || LINE.length > 140) {
  throw new Error(`Line must be 1-140 characters, got ${LINE.length}.`);
}
if (LINE.trim().length === 0) {
  throw new Error("Line must not be only whitespace.");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("Line must not contain a newline.");
}
if (/[\u0000-\u001f\u007f]/.test(LINE)) {
  throw new Error("Line must not contain control characters.");
}
if (Buffer.byteLength(LINE, "utf8") !== LINE.length) {
  throw new Error("Line must be plain ASCII so bytes equal characters.");
}

fs.mkdirSync(OUTPUT_DIR, { recursive: true });
fs.writeFileSync(OUTPUT_PATH, LINE, "utf8");

// Read back and verify byte-exactness.
const written = fs.readFileSync(OUTPUT_PATH, "utf8");
const bytes = Buffer.byteLength(written, "utf8");
if (written !== LINE) {
  throw new Error("Verification failed: file contents differ from the line.");
}
if (bytes !== 139) {
  throw new Error(`Verification failed: expected 139 bytes, got ${bytes}.`);
}
if (written.endsWith("\n")) {
  throw new Error("Verification failed: file must not end with a newline.");
}

console.log(`Wrote ${OUTPUT_PATH}: ${written.length} chars, ${bytes} bytes, no trailing newline.`);
console.log(written);
