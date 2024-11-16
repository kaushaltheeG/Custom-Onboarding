import React from "react";
import { Divider, ValidationContainer } from "../styles";
import useNewUserDebounceInput from "../../../../hooks/useNewUserDebounceInput";
import { useSelector } from "react-redux";
import { getNewUserInfo } from "../../../../services/user/selectors";
import EmailAndPassword from "../FormComponents/EmailAndPassword";
import FullName from "../FormComponents/FullName";

export interface IPageOneState {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

const PageOne: React.FC = () => {
  const newUserInfo = useSelector(getNewUserInfo);
  const {inputState: newUser, handleChange } = useNewUserDebounceInput<IPageOneState>(
    {
      email: newUserInfo.email,
      password: newUserInfo.password,
      firstName: newUserInfo.firstName,
      lastName: newUserInfo.lastName,
    },
    100 // Debounce delay in milliseconds
  ); 

  return (
    <>
      <ValidationContainer>
        <EmailAndPassword newUser={newUser} handleChange={handleChange}/>
      </ValidationContainer>
      <Divider />
      <ValidationContainer>
        <FullName newUser={newUser} handleChange={handleChange}/>
      </ValidationContainer>
    </>
  )
};
export default PageOne;
