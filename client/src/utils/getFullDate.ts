import type { Experience } from "../types/resume.ts";
import { getMonthFromInt } from "./getMonthFromInt.ts";

export function getFullDate(exp: Experience) {
  const startedAt = new Date(exp.startedAt as unknown as string);
  const endedAt = new Date(exp.endedAt as unknown as string);

  const start = `${getMonthFromInt(
    startedAt.getMonth() + 1
  )} ${startedAt.getFullYear()}`;
  const end = `${getMonthFromInt(
    endedAt.getMonth() + 1
  )} ${endedAt.getFullYear()}`;

  return { start, end };
}
