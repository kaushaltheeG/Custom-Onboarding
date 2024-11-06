import React from "react";
import { FormContainer, CenteringDiv, ValidationContainer, Form, Divider } from "./styles";
import Input from "../../ui/Input";
import RoundedButton from "../../ui/RoundedButton";
import { useDispatch, useSelector } from "react-redux";
import { IUserActions, validateUser } from "../../../services/user/actions";
import { Dispatch } from "redux";
import { getLoggedInUser, isLoggedIn } from '../../../services/user/selectors';
import PageOne from "./Pages/pageOne";
import FormControler from "./FormControler";
import useFormControler from "../../../hooks/useFormControler";
import { getCurrentFormPage } from "../../../services/form/selector";
import PageTwoOrThree from "./Pages/pageTwoOrThree";


const Home: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [passwordOne, setPasswordOne] = React.useState('');
  const [tiredValidation, setTriedValidation] = React.useState(true);
  const [errors, setErrors] = React.useState('');
  const dispatch = useDispatch<Dispatch<IUserActions>>();
  const loggedInUser = useSelector(getLoggedInUser);
  const loggedIn = useSelector(isLoggedIn);
  const currentFormPage = useSelector(getCurrentFormPage);
  const { onPrev, onNext } = useFormControler(currentFormPage);


  const handleSubmit = React.useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setErrors('');
    if (!email || !passwordOne) {
      setErrors('Email and Password cannot be empty');
      return;
    }

    if (!tiredValidation) {
      console.log(`email: ${email} passwordOne: ${passwordOne}`)
      dispatch(validateUser(email, passwordOne));
      setTriedValidation(true);
      return;
    }
  },[dispatch, email, passwordOne, tiredValidation]);

  const validationForm = React.useCallback(() => {
    if (!tiredValidation) {
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
        return  <PageTwoOrThree />//<PageOne />;
      case 2:
        return;
      case 3:
        return;
      default:
        console.error(`current page ${currentFormPage} not found`)
        return;
    }
  }, [tiredValidation, errors, handleSubmit, passwordOne, email, currentFormPage]);

  React.useEffect(() => {
    if (loggedIn && loggedInUser) {
      setEmail(loggedInUser.pendingCustomer.email);
      setPasswordOne('');
    }
  }, [loggedIn, loggedInUser, setEmail]);

  return(
    <CenteringDiv>
      <FormContainer>
        {validationForm()}
      </FormContainer>
      <FormControler
        onNext={onNext}
        onPrev={onPrev}
        onSubmit={() => {}}
        currentPage={currentFormPage}
      />
    </CenteringDiv>
  )
};
export default Home;
