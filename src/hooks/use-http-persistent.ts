import { useCallback, useReducer } from 'react';

import { QuestionType, Tag } from '../components/Question.types';
import { Loading } from '../data/types';

type Data = {
  items: QuestionType[] | [];
  hasMore: boolean;
};

enum HttpActionKind {
  SEND,
  SUCCESSED,
  FAILED,
}

type HttpAction = {
  type: HttpActionKind;
  responseData?: {
    items: QuestionType[];
    hasMore: boolean;
  };
  error?: string | null;
};

type HttpState = {
  loading: Loading;
  data: {
    items: QuestionType[];
    hasMore: boolean;
  } | null;
  error: string | null;
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
        data: {
          items: state.data
            ? [...state.data.items, ...responseData!.items]
            : responseData!.items,
          hasMore: responseData!.hasMore,
        },
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
function useHttPersistent(requestFunction: Function, startWithPending = false) {
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
      } catch (error: any) {
        dispatch({
          type: HttpActionKind.FAILED,
          error: error.message || 'Something went wrong!',
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

export default useHttPersistent;
