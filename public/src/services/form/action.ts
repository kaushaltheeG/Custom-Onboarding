
export const SET_CURRENT_FORM_PAGE = 'form/SET_CURRENT_FORM_PAGE';

export interface ISetCurrentFormPageType {
  payload: { currentPage: number };
  type: typeof SET_CURRENT_FORM_PAGE;
}

export type IFormActions = (
  ISetCurrentFormPageType
);

export const setCurrentFormPage = (currentPage: number): ISetCurrentFormPageType => {
  return {
    payload: { currentPage },
    type: SET_CURRENT_FORM_PAGE,
  };
};
