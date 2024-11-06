
export const SET_CURRENT_FORM_PAGE = 'form/SET_CURRENT_FORM_PAGE';
export const SET_FORM_ERROR = 'form/SET_FORM_ERROR';

export interface ISetCurrentFormPageType {
  payload: { currentPage: number };
  type: typeof SET_CURRENT_FORM_PAGE;
}

export interface ISetFormError {
  payload: { error: Error | null };
  type: typeof SET_FORM_ERROR;
}

export type IFormActions = (
  ISetCurrentFormPageType |
  ISetFormError
);

export const setCurrentFormPage = (currentPage: number): ISetCurrentFormPageType => {
  return {
    payload: { currentPage },
    type: SET_CURRENT_FORM_PAGE,
  };
};

export const setFormError = (error: Error | null): ISetFormError => {
  return {
    payload: { error },
    type: SET_FORM_ERROR,
  };
};
