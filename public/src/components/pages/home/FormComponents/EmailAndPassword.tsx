import React from "react";
import { PageOneContainer } from "../styles";
import Input from "../../../ui/Input";
import { IPageOneState } from "../Pages/pageOne";
import { Dispatch } from "redux";
import { IFormActions, setFormError } from "../../../../services/form/action";
import { useDispatch, useSelector } from "react-redux";
import { getFormError } from "../../../../services/form/selector";

interface IEmailAndPasswordProps {
  newUser: IPageOneState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const EmailAndPassword: React.FC<IEmailAndPasswordProps> = ({
  newUser,
  handleChange,
}) => {
  const [passwordTwo, setPasswordTwo] = React.useState(''); // move this logic to debouncer
  const dispatch = useDispatch<Dispatch<IFormActions>>();
  const formError = useSelector(getFormError);

 const checkPassword = React.useCallback(() => {
    const passwordOne = newUser.password;
    if (!passwordOne.length || !passwordTwo.length) {
      return; 
    }

    if (passwordTwo !== passwordOne && !formError) {
      dispatch(setFormError(new Error('Passwords do not match, please recheck')));
    } else if (formError && passwordTwo === passwordOne) {
      dispatch(setFormError(null));
    }
  }, [dispatch, formError, newUser.password, passwordTwo]);

  React.useEffect(() => {
    checkPassword();
  }, [checkPassword]);

  return (
    <PageOneContainer>
      <Input
        label="Email"
        type="email"
        name="email"
        value={newUser.email}
        onChange={handleChange}
        required
      />
      <Input
        label="Password"
        type="password"
        name="password"
        value={newUser.password}
        onChange={handleChange}
        required
      />
      <Input
        label="Re-enter Password"
        type="password"
        value={passwordTwo}
        onChange={(e) => setPasswordTwo(e.target.value)}
        required
      />
    </PageOneContainer>
  );
};

export default EmailAndPassword;
