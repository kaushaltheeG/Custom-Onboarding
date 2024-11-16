import React from "react";
import { PageOneContainer } from "../styles";
import Input from "../../../ui/Input";
import { IPageOneState } from "../Pages/pageOne";

interface IFullNameProps {
  newUser: IPageOneState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const FullName: React.FC<IFullNameProps> = ({
  newUser,
  handleChange,
}) => {
  return (
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
  );
};

export default FullName;
