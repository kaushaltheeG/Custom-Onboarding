import { IState } from "../state";

export const getCurrentFormPage = (state: IState): number => state.form.currentPage;

export const getFormError = (state: IState): Error | null => state.form.error;
