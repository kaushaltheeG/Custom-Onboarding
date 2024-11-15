export const SET_MODAL = 'modal/SET_MODAL';
export const CLOSE_MODAL = 'modal/CLOSE_MODAL';

interface IModalProps {
  title: string;
  message: string;
  onConfirm: () => void; 
}

export interface ISetModal {
  payload: IModalProps,
  type: typeof SET_MODAL, 
}

export interface ICloseModal {
  type: typeof CLOSE_MODAL,
}

export type IModalActions = (
  ISetModal |
  ICloseModal
) 

export const setModal = (payload: IModalProps): ISetModal => {
  return {
    payload,
    type: SET_MODAL,
  };
};

export const closeModal = (): ICloseModal => {
  return {
    type: CLOSE_MODAL,
  };
};

