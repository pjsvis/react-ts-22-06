import { removeSpaces } from "./string-helpers";

const delay = (time: number) => {
  return new Promise((resolve) => setTimeout(resolve, time));
};

const getValidityAsync = async (answer: string) => {
  await delay(500);
  if (removeSpaces(answer) === "42") {
    return true;
  }
  if (removeSpaces(answer).toLowerCase() === "fortytwo") {
    return true;
  }
  return false;
};

export interface DeepThoughtApi {
  question: string;
  getValidityAsync(answer: string): boolean;
}
export const deepThoughtApi = {
  question: "What is the answer to life, the universe, and everything?",
  getValidityAsync: getValidityAsync
};
