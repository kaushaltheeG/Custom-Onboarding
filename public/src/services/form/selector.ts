import { IState } from "../state";

export const getCurrentFormPage = (state: IState): number => state.form.currentPage;
