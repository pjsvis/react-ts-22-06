import to from "await-to-js";
import { proxy, useSnapshot } from "valtio";
import { deepThoughtApi } from "./deep-thought-api";

export interface Store {
  question: string;
  answer: string;
  validity: boolean;
  conclusion: string;
}

const storeDefaults: Store = {
  question: deepThoughtApi.question,
  answer: "",
  validity: false,
  conclusion: ""
};
const store = proxy(storeDefaults);

interface StoreApi {
  setAnswer: (answer: string) => void;
}

const setAnswer = async (answer: string) => {
  store.answer = answer;
  const [err, res] = await to(deepThoughtApi.getValidityAsync(answer));
  if (err || res === undefined) {
    store.validity = false;
    store.conclusion = `Deep Thought could not return an answer`;
    return;
  }

  store.validity = res;
  if (answer.length === 0) {
    store.conclusion = "";
    return;
  }

  store.conclusion = res
    ? `
  The answer to life, the universe, and everything is ${answer}`
    : `The answer is not "${answer} `;
};

export const storeApi: StoreApi = {
  setAnswer: (answer) => setAnswer(answer)
};

export const useStoreState = () => {
  const storeState = useSnapshot(store);
  return [storeState];
};
