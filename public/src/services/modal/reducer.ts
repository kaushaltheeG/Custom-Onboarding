import { SET_MODAL, CLOSE_MODAL } from './action';

export interface IModalState {
  isVisible: boolean;
  title: string;
  message: string;
  onConfirm: () => void; 

}

const initialState: IModalState = {
  isVisible: false,
  title: '',
  message: '',
  onConfirm: () => {},
};

const modalReducer = (state = initialState, action: any) => {
  console.log(`action.type: ${action.type}`)
  switch (action.type) {
    case SET_MODAL:
      const { title, message, onConfirm } = action.payload;
      return {
        ...state,
        isVisible: true,
        title,
        message,
        onConfirm,
      };
    case CLOSE_MODAL:
      return initialState;
    default:
      return state;
  }
};

export default modalReducer;
