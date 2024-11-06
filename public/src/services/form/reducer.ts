import { IFormActions, SET_CURRENT_FORM_PAGE, SET_FORM_ERROR } from "./action";


export interface IFormState {
  currentPage: number,
  error: Error | null,
}

const INITIAL_FORM_STATE: IFormState = {
  currentPage: 1,
  error: null,
};

const formReducer = (state: IFormState = INITIAL_FORM_STATE, action: IFormActions) => {
  switch (action.type) {
    case SET_CURRENT_FORM_PAGE:
      const { currentPage } = action.payload;
      return {
        ...state,
        currentPage,
      };
    case SET_FORM_ERROR:
      const { error } = action.payload;
      return {
        ...state,
        error,
      };
    default:
      return state;
  }
};
export default formReducer;
