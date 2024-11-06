import React, { useCallback } from "react";
import { FormControl } from "../styles";
import RoundedButton from "../../../ui/RoundedButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import PageIndicator from "./indicator";

interface IFormControlerProps {
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  currentPage: number;
}

const FormControler: React.FC<IFormControlerProps> = ({
  onNext,
  onPrev,
  onSubmit,
  currentPage
}) => {
  const renderLastButton = useCallback(() => {
    if (currentPage === 3) {
      return (
        <RoundedButton onClick={onSubmit}>Submit</RoundedButton>
      );
    }
    return (
      <RoundedButton onClick={onNext}>
        <FontAwesomeIcon icon={faArrowRight}/>
      </RoundedButton>
    )
  }, [currentPage, onNext, onSubmit]);

  return (
    <FormControl>
      <RoundedButton onClick={onPrev} disabled={currentPage === 1}>
        <FontAwesomeIcon icon={faArrowLeft}/>
      </RoundedButton>
      <PageIndicator currentPage={currentPage}/>
      {renderLastButton()}
    </FormControl>
  )
};

export default FormControler;
