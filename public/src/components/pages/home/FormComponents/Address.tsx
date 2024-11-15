import React from "react";
import { AddressContainer, ColumnAlign, StyledLabel } from "../styles";
import Input from "../../../ui/Input";
import DynamicSelect from "../../../ui/DynamicSelect";
import { IPageTwoAndThreeState } from "../Pages/pageTwoOrThree";
import { stateAcronymList } from "../../../../utils";

interface IAddressProps {
  newUser: IPageTwoAndThreeState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const Address: React.FC<IAddressProps> = ({
  newUser,
  handleChange,
}) => {
  return (
    <ColumnAlign>
      <StyledLabel>Address</StyledLabel>
      <AddressContainer>
        <Input
          label="Street Name"
          name="streetName"
          value={newUser.streetName}
          onChange={handleChange}
        />
        <Input
          label="City"
          name="city"
          value={newUser.city}
          onChange={handleChange}
        />
        <DynamicSelect
          label="State"
          name="state"
          value={newUser.state}
          options={stateAcronymList}
          onChange={handleChange}
        />
        <Input
          label="Zip"
          name="zip"
          value={newUser.zip}
          onChange={handleChange}
        />
      </AddressContainer>
    </ColumnAlign>
  );
};

export default Address;
