import { useCallback, useReducer } from 'react';

import { AnswerType, Loading, QuestionType, Tag } from '../data/types';

type Data = QuestionType[] | QuestionType | Tag[] | AnswerType;

enum HttpActionKind {
  SEND,
  SUCCESSED,
  FAILED,
}

type HttpAction = {
  type: HttpActionKind;
  responseData?: QuestionType[] | QuestionType | Tag[] | AnswerType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any;
};

type HttpState = {
  loading: Loading;
  data: QuestionType[] | QuestionType | Tag[] | null | AnswerType;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error: any;
};

function httpReducer(state: HttpState, action: HttpAction): HttpState {
  const { type, responseData, error } = action;
  switch (type) {
    case HttpActionKind.SEND:
      return {
        data: state.data,
        error: null,
        loading: 'pending',
      };
    case HttpActionKind.SUCCESSED:
      return {
        data: responseData!,
        error: null,
        loading: 'succeeded',
      };
    case HttpActionKind.FAILED:
      return {
        data: null,
        error: error!,
        loading: 'failed',
      };

    default:
      return state;
  }
}

// eslint-disable-next-line @typescript-eslint/ban-types
function useHttp(requestFunction: Function, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    loading: startWithPending ? 'pending' : 'idle',
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    async function (requestData?: any) {
      dispatch({ type: HttpActionKind.SEND });
      try {
        const responseData: Data = await requestFunction(requestData);

        dispatch({
          type: HttpActionKind.SUCCESSED,
          responseData,
        });
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        dispatch({
          type: HttpActionKind.FAILED,
          error: error || 'Something went wrong!',
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
