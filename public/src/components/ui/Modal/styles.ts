import styled from "styled-components";

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0; 
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5); // Semi-transparent background to overlay the app
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 999; // High z-index to layer over other elements
`;

export const ModalContainer = styled.div`
  background: #fff;
  padding: 24px;
  width: 400px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const ModalTitle = styled.h2`
  margin: 0;
  font-size: 1.5em;
  font-weight: bold;
`;

export const ModalMessage = styled.p`
  font-size: 1em;
  margin: 0;
  color: #333;
  flex-grow: 1;
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 16px;
`;

