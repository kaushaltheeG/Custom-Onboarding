import React from "react";
import { Divider, ValidationContainer, PageOneContainer } from "../styles";
import Input from "../../../ui/Input";
import useNewUserDebounceInput from "../../../../hooks/useNewUserDebounceInput";
import { useSelector } from "react-redux";
import { getLoggedInUser, getNewUserInfo } from "../../../../services/user/selectors";

const PageOne: React.FC = () => {
  const newUserInfo = useSelector(getNewUserInfo);
  const currentUser = useSelector(getLoggedInUser);
  const pendingCustomer = React.useMemo(() => (
    currentUser ? currentUser.pendingCustomer : null    
  ), [currentUser]);

  const initialEmail = newUserInfo.email || pendingCustomer?.email || '';
  const initialPassword = newUserInfo.password || '';
  const initialFirstName = newUserInfo.firstName || pendingCustomer?.firstName || '';
  const initialLastName = newUserInfo.lastName || pendingCustomer?.lastName || '';

  const [newUser, handleChange] = useNewUserDebounceInput(
      {
        email: initialEmail,
        password: initialPassword,
        firstName: initialFirstName,
        lastName: initialLastName,
      },
      100 // Debounce delay in milliseconds
  );
  const [passwordTwo, setPasswordTwo] = React.useState(newUserInfo.password || '');

  return (
    <>
      <ValidationContainer>
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
      </ValidationContainer>
      <Divider />
      <ValidationContainer>
        <PageOneContainer>
          <Input
            label="First Name"
            type="text"
            name="firstName"
            value={newUser.firstName}
            onChange={handleChange}
            required
            />
          <Input
            label="Last Name"
            type="text"
            name="lastName"
            value={newUser.lastName}
            onChange={handleChange}
            required
            />
        </PageOneContainer>
      </ValidationContainer>
    </>
  )
};
export default PageOne;
