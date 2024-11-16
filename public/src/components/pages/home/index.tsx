import React from "react";
import { FormContainer, FixedWidth, CenteringDiv, Title, TitleContainer, FlexContainer } from "./styles";
import { useSelector } from "react-redux";
import PageOne from "./Pages/pageOne";
import FormControler from "./FormControler";
import useFormControler from "../../../hooks/useFormControler";
import { getCurrentFormPage, getFormError } from "../../../services/form/selector";
import PageTwoOrThree from "./Pages/pageTwoOrThree";
import { getCurrentPageMap } from "../../../services/site/selectors";
import ErrorComponent from "../../ui/ErrorComponent";

const Home: React.FC = () => {
  const currentFormPage = useSelector(getCurrentFormPage);
  const currentFormPageLayoutMap = useSelector(getCurrentPageMap);
  const { onPrev, onNext, onSubmit } = useFormControler(currentFormPage);
  const error = useSelector(getFormError);

  const validationForm = React.useCallback(() => {
    switch(currentFormPage) {
      case 1:
        return <PageOne />;
      case 2:
        return <PageTwoOrThree components={currentFormPageLayoutMap[currentFormPage]} />;
      case 3:
        return <PageTwoOrThree  components={currentFormPageLayoutMap[currentFormPage]}/>;
      default:
        console.error(`current page ${currentFormPage} not found`)
        return;
    }
  }, [currentFormPage, currentFormPageLayoutMap]);

  return(
    <FlexContainer> 
      <FixedWidth>
        <TitleContainer>
          <Title>{'Enter Your Information'}</Title>
        </TitleContainer>
        <CenteringDiv>
          <FormContainer>
            {validationForm()}
          </FormContainer>
          <FormControler
            onNext={onNext}
            onPrev={onPrev}
            onSubmit={onSubmit}
            currentPage={currentFormPage}
            />
          {error && <ErrorComponent message={error.message}/>}
        </CenteringDiv>
      </FixedWidth>
    </FlexContainer>
  
  )
};
export default Home;
