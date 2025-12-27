import { nanoid } from "nanoid";

export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\w-]+/g, "")
    .replace(/--+/g, "-");
}

export function generateRandomSuffix(length: number = 4): string {
  return nanoid(length);
}
