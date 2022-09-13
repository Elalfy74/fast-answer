import { useReducer, useCallback } from "react";
import { QuestionType, Tag } from "../components/Question.types";
import { Loading } from "../data/types";
type Data = QuestionType[] | QuestionType | Tag[];

enum HttpActionKind {
  SEND = "SEND",
  SUCCESSED = "SUCCESSED",
  FAILED = "FAILED",
}

type HttpAction = {
  type: HttpActionKind;
  responseData?: QuestionType[] | QuestionType | Tag[];
  error?: string | null;
};

type HttpState = {
  loading: Loading;
  data: QuestionType[] | QuestionType | Tag[] | null;
  error: string | null;
};

function httpReducer(state: HttpState, action: HttpAction): HttpState {
  const { type, responseData, error } = action;
  switch (type) {
    case HttpActionKind.SEND:
      return {
        data: null,
        error: null,
        loading: "pending",
      };
    case HttpActionKind.SUCCESSED:
      return {
        data: responseData!,
        error: null,
        loading: "succeeded",
      };
    case HttpActionKind.FAILED:
      return {
        data: null,
        error: error!,
        loading: "failed",
      };

    default:
      return state;
  }
}

function useHttp(requestFunction: Function, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    loading: startWithPending ? "pending" : "idle",
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (requestData: any) {
      dispatch({ type: HttpActionKind.SEND });
      try {
        const responseData: Data = await requestFunction(requestData);

        dispatch({
          type: HttpActionKind.SUCCESSED,
          responseData,
        });
      } catch (error: any) {
        dispatch({
          type: HttpActionKind.FAILED,
          error: error.message || "Something went wrong!",
        });
      }
    },
    [requestFunction]
  );
  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
