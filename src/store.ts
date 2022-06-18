import to from "await-to-js";
import { proxy, useSnapshot } from "valtio";
import { answerApi } from "./deep-thought";

export interface Store {
  question: string;
  answer: unknown;
  validity: boolean;
}

const storeDefaults: Store = {
  question: answerApi.question,
  answer: undefined,
  validity: false
};
const store = proxy(storeDefaults);

interface StoreStateApi {
  setAnswer: (answer: unknown) => void;
}
const setAnswer = async (answer: unknown) => {
  store.answer = answer;
  const [err, res] = await to(answerApi.getValidityAsync(answer));
  if (err) {
    store.validity = false;
    return;
  }
  if (res === true) {
    store.validity = true;
    return;
  }
};

export const storeStateApi: StoreStateApi = {
  setAnswer: (answer) => setAnswer(answer)
};

export const useStoreState = () => {
  const storeState = useSnapshot(store);
  return [storeState];
};
