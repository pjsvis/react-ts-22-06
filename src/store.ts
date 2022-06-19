import to from "await-to-js";
import { proxy, useSnapshot } from "valtio";
import { answerApi } from "./deep-thought";

export interface Store {
  question: string;
  answer: string;
  validity: boolean;
}

const storeDefaults: Store = {
  question: answerApi.question,
  answer: "",
  validity: false
};
const store = proxy(storeDefaults);

interface StoreApi {
  setAnswer: (answer: string) => void;
}
const setAnswer = async (answer: string) => {
  store.answer = answer;
  const [err, res] = await to(answerApi.setValidityAsync(answer));
  if (err || !res) {
    store.validity = false;
    return;
  }
  store.validity = res;
};

export const storeApi: StoreApi = {
  setAnswer: (answer) => setAnswer(answer)
};

export const useStoreState = () => {
  const storeState = useSnapshot(store);
  return [storeState];
};
