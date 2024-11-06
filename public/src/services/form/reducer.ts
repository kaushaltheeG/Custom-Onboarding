import { IFormActions, SET_CURRENT_FORM_PAGE } from "./action";


export interface IFormState {
  currentPage: number,
}

const INITIAL_FORM_STATE: IFormState = {
  currentPage: 1,
};

const formReducer = (state: IFormState = INITIAL_FORM_STATE, action: IFormActions) => {
  switch (action.type) {
    case SET_CURRENT_FORM_PAGE:
      const { currentPage } = action.payload;
      return {
        ...state,
        currentPage,
      };
    default:
      return state;
  }
};
export default formReducer;
