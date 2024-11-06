import React from "react";
import { FormContainer, FixedWidth, CenteringDiv, ValidationContainer, Form, Divider, Title, TitleContainer, FlexContainer } from "./styles";
import Input from "../../ui/Input";
import RoundedButton from "../../ui/RoundedButton";
import { useDispatch, useSelector } from "react-redux";
import { IUserActions, validateUser } from "../../../services/user/actions";
import { Dispatch } from "redux";
import { getLoggedInUser, isLoggedIn } from '../../../services/user/selectors';
import PageOne from "./Pages/pageOne";
import FormControler from "./FormControler";
import useFormControler from "../../../hooks/useFormControler";
import { getCurrentFormPage, getFormError } from "../../../services/form/selector";
import PageTwoOrThree from "./Pages/pageTwoOrThree";
import { getCurrentPageMap } from "../../../services/site/selectors";
import ErrorComponent from "../../ui/ErrorComponent";


const Home: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [passwordOne, setPasswordOne] = React.useState('');
  const [tiredValidation, setTriedValidation] = React.useState(false);
  const [errors, setErrors] = React.useState('');
  const dispatch = useDispatch<Dispatch<IUserActions>>();
  const loggedInUser = useSelector(getLoggedInUser);
  const loggedIn = useSelector(isLoggedIn);
  const currentFormPage = useSelector(getCurrentFormPage);
  const currentFormPageLayoutMap = useSelector(getCurrentPageMap);
  const { onPrev, onNext, onSubmit } = useFormControler(currentFormPage);
  const error = useSelector(getFormError);

  const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors('');
    if (!email || !passwordOne) {
      setErrors('Email and Password cannot be empty');
      return;
    }

    if (!tiredValidation && !loggedIn) {
      dispatch(validateUser(email, passwordOne));
      setTriedValidation(true);
      return;
    }
  },[dispatch, email, passwordOne, tiredValidation, loggedIn]);

  const validationForm = React.useCallback(() => {
    if (!loggedIn && !tiredValidation) {
      return (
        <>
          <ValidationContainer>
            <Form onSubmit={handleSubmit}>
              <Input
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Input
                label="Password"
                type="password"
                value={passwordOne}
                onChange={(e) => setPasswordOne(e.target.value)}
                required
              />
              <RoundedButton type="submit">Submit</RoundedButton>
              {errors}
            </Form>
          </ValidationContainer>
          <Divider />
        </>
      );
    }
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
  }, [tiredValidation, errors, handleSubmit, passwordOne, email, loggedIn, currentFormPage, currentFormPageLayoutMap]);

  React.useEffect(() => {
    if (loggedIn && loggedInUser) {
      setEmail(loggedInUser.pendingCustomer.email);
      setPasswordOne('');
    }
  }, [loggedIn, loggedInUser, setEmail]);

  return(
    <FlexContainer> 
      <FixedWidth>
        <TitleContainer>
          <Title>{!loggedIn && !tiredValidation ? 'Already in the System?' : 'Onboard Customer'}</Title>
        </TitleContainer>
        <CenteringDiv>
          <FormContainer>
            {validationForm()}
          </FormContainer>
          { error && <ErrorComponent message={error.message}/>}
          <FormControler
            onNext={onNext}
            onPrev={onPrev}
            onSubmit={onSubmit}
            currentPage={currentFormPage}
            />
        </CenteringDiv>
      </FixedWidth>
    </FlexContainer>
  
  )
};
export default Home;
