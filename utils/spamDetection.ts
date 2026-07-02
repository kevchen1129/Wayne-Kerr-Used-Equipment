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

export function isSpam(_payload: ContactPayload): SpamCheckResult {
  return { spam: false };
}
