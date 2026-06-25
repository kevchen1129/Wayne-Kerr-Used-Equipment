export type SpamCheckResult = { spam: boolean; reason?: string };

type ContactPayload = {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  country?: string;
  topic?: string;
  model?: string;
  message?: string;
};

const VOWELS = new Set(["a", "e", "i", "o", "u"]);

function getAsciiLetters(s: string): string {
  return s.replace(/[^a-zA-Z]/g, "");
}

function vowelRatioSpam(value: string): boolean {
  const letters = getAsciiLetters(value);
  if (letters.length < 5) return false;
  let vowels = 0;
  for (const ch of letters.toLowerCase()) {
    if (VOWELS.has(ch)) vowels++;
  }
  const ratio = vowels / letters.length;
  return ratio < 0.15 || ratio > 0.7;
}

function caseFlipSpam(value: string): boolean {
  const letters = getAsciiLetters(value);
  if (letters.length < 6) return false;
  let flips = 0;
  for (let i = 1; i < letters.length; i++) {
    const prevUpper = letters[i - 1] >= "A" && letters[i - 1] <= "Z";
    const curUpper = letters[i] >= "A" && letters[i] <= "Z";
    if (prevUpper !== curUpper) flips++;
  }
  return flips / (letters.length - 1) >= 0.5;
}

export function isSpam(payload: ContactPayload): SpamCheckResult {
  const name = (payload.name || "").trim();
  const company = (payload.company || "").trim();
  const message = (payload.message || "").trim();
  const email = (payload.email || "").trim();

  for (const [field, value] of [
    ["name", name],
    ["company", company],
    ["message", message],
  ] as const) {
    if (vowelRatioSpam(value)) {
      return { spam: true, reason: `vowel-ratio:${field}` };
    }
    if (caseFlipSpam(value)) {
      return { spam: true, reason: `case-flip:${field}` };
    }
  }

  const atIdx = email.indexOf("@");
  if (atIdx > 0) {
    const local = email.slice(0, atIdx);
    const dotCount = (local.match(/\./g) || []).length;
    if (dotCount > 4) {
      return { spam: true, reason: "email-dots" };
    }
  }

  return { spam: false };
}
