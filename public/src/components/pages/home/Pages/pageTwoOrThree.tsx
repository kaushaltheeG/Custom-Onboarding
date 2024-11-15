import React, { useCallback } from "react";
import TextArea from "../../../ui/TextArea";
import { useSelector } from "react-redux";
import { getNewUserInfo } from "../../../../services/user/selectors";
import useNewUserDebounceInput from "../../../../hooks/useNewUserDebounceInput";
import DynamicSelect from "../../../ui/DynamicSelect";
import { BirthdayContainer, ColumnAlign, AddressContainer, StyledLabel, PageTwoAndThreeContainer } from "../styles";
import { allMonthList, daysInMonthList, stateAcronymList } from "../../../../utils";
import Input from "../../../ui/Input";

const PageTwoOrThree: React.FC<{components: string[]}> = ({ components }) => {
  const newUserInfo = useSelector(getNewUserInfo);

  const { inputState: newUser, handleChange } = useNewUserDebounceInput(
    {
      aboutMe: newUserInfo?.aboutMe,
      streetName: newUserInfo?.streetName,
      city: newUserInfo?.city,
      state: newUserInfo?.state,
      zip:  newUserInfo?.zip,
      month: newUserInfo?.month,
      day: newUserInfo?.day,
      year: newUserInfo?.year,
    },
    100 // Debounce delay in milliseconds
  );

  const renderAboutMe = useCallback(() => {
    return (
      <TextArea
        label="About Me"
        name="aboutMe"
        maxChars={200}
        value={newUser.aboutMe}
        handleChange={handleChange}
      />
    );
  },[newUser.aboutMe, handleChange]);

  const renderBirthday = useCallback(() => {
    return (
      <ColumnAlign>
        <StyledLabel>Birthday</StyledLabel>
        <BirthdayContainer>
          <DynamicSelect
            label="Month"
            name="month"
            value={newUser.month}
            options={allMonthList}
            onChange={handleChange}
          />
          <DynamicSelect
            label="Day"
            name="day"
            value={newUser.day}
            options={daysInMonthList}
            onChange={handleChange}
          />
          <Input
            label="Year"
            name="year"
            value={newUser.year}
            onChange={handleChange}
          />
        </BirthdayContainer>
      </ColumnAlign>
    );
  }, [handleChange, newUser.day, newUser.month, newUser.year]);

  const renderAddress = useCallback(() => {
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
    )
  }, [handleChange, newUser.city, newUser.state, newUser.streetName, newUser.zip])

  const renderComponents = React.useCallback(() => {
    if (!components) {
      return null;
    }
    return components.map((component) => {
      switch(component) {
        case 'aboutMe':
          return renderAboutMe();
        case  'address':
          return renderAddress();
        case 'birthday':
          return renderBirthday();
        default:
          return null;
      }
    })
  }, [components, renderAboutMe, renderAddress, renderBirthday]);

  return (
    <PageTwoAndThreeContainer>
      {renderComponents()}
    </PageTwoAndThreeContainer>
  );
};
export default PageTwoOrThree;
