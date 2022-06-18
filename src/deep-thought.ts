import { removeSpaces } from "./string-helpers";

const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const strAnswers: string[] = ["42", "fortytwo"];

const getValidityAsync = async (answer: unknown) => {
  await delay(500);
  if (typeof answer === "string" && removeSpaces(answer) === "42") {
    return true;
  }
  if (
    typeof answer === "string" &&
    strAnswers.includes(removeSpaces(answer).toLowerCase())
  ) {
    return true;
  }
  return false;
};

export interface AnswerApi {
  question: string;
  getValidityAsync(answer: unknown): void;
}
