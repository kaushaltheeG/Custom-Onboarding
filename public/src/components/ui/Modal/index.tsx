import React from "react";
import { ButtonContainer, ModalContainer, ModalMessage, ModalOverlay, ModalTitle } from "./styles";
import RoundedButton from "../RoundedButton";
import { useDispatch, useSelector } from "react-redux";
import { getModalValues, isVisible } from "../../../services/modal/selector";
import { Dispatch } from "redux";
import { closeModal, IModalActions } from "../../../services/modal/action";


const Modal: React.FC = () => {
  const isModalVisiable = useSelector(isVisible);
  const { title, message, onConfirm } = useSelector(getModalValues);
  const dispatch = useDispatch<Dispatch<IModalActions>>();
  
  const onClose = React.useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  const handleSubmit =  React.useCallback(() => {
    onConfirm();
    dispatch(closeModal());
  }, [dispatch, onConfirm]);

  if (!isModalVisiable) {
    return null;
  }

  return (
    <ModalOverlay>
      <ModalContainer>
        <ModalTitle>{title}</ModalTitle>
        <ModalMessage>{message}</ModalMessage>
        <ButtonContainer>
          <RoundedButton onClick={onClose}>Cancel</RoundedButton>
          <RoundedButton onClick={handleSubmit}>Confirm</RoundedButton>
        </ButtonContainer>
      </ModalContainer>
    </ModalOverlay>
  )
};

export default Modal;
