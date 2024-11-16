import { IState } from "../state";

export const isVisible = (state: IState) => state.modal.isVisible;

export const getModalValues = (state: IState) => ({
  title: state.modal.title,
  message: state.modal.message,
  onConfirm: state.modal.onConfirm,
});
