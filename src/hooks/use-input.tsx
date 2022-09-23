import { useReducer } from 'react';

enum InputActionKind {
  CHANGE,
  BLUR,
  RESET,
}

type InputAction = {
  type: InputActionKind;
  value?: string;
};

type InputState = {
  value: string;
  isTouched: boolean;
};

function inputReducer(state: InputState, action: InputAction) {
  switch (action.type) {
    case InputActionKind.CHANGE:
      return { value: action.value!, isTouched: state.isTouched };
    case InputActionKind.BLUR:
      if (state.value.length > 0) {
        return { value: state.value, isTouched: true };
      }
      return state;
    case InputActionKind.RESET:
      return { value: '', isTouched: false };
    default:
      return state;
  }
}

const useInput = (
  // eslint-disable-next-line @typescript-eslint/ban-types
  validateFunc: Function,
  errorMessage: string,
  comparedValue?: string
) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: '',
    isTouched: false,
  });

  const isValid = validateFunc(inputState.value, comparedValue);
  const hasError = !isValid && inputState.isTouched;
  const error = hasError ? errorMessage : '';

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: InputActionKind.CHANGE,
      value: event.target.value,
    });
  };

  const onBlurHandler = () => {
    dispatch({ type: InputActionKind.BLUR });
  };

  const reset = () => {
    dispatch({ type: InputActionKind.RESET });
  };

  return {
    value: inputState.value,
    isValid,
    error,
    onChangeHandler,
    onBlurHandler,
    reset,
  };
};
export default useInput;
