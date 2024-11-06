import React, { useCallback } from "react";
import TextArea from "../../../ui/TextArea";
import { useSelector } from "react-redux";
import { getLoggedInUser, getNewUserInfo } from "../../../../services/user/selectors";
import useNewUserDebounceInput from "../../../../hooks/useNewUserDebounceInput";
import DynamicSelect from "../../../ui/DynamicSelect";
import { BirthdayContainer, ColumnAlign, AddressContainer, StyledLabel, PageTwoAndThreeContainer } from "../styles";
import { allMonthList, daysInMonthList, stateAcronymList, yearsList } from "../../../../utils";
import Input from "../../../ui/Input";

const PageTwoOrThree: React.FC<{components: string[]}> = ({ components }) => {
  const newUserInfo = useSelector(getNewUserInfo);
  const currentUser = useSelector(getLoggedInUser);
  const pendingCustomer = React.useMemo(() => (
    currentUser ? currentUser.pendingCustomer : null    
  ), [currentUser]);
  const yearOptions = React.useMemo(() => {
    return yearsList;
  }, [])
  const [newUser, handleChange] = useNewUserDebounceInput(
      {
        aboutMe: newUserInfo?.aboutMe || pendingCustomer?.data?.aboutMe || '',
        streetName: newUserInfo?.streetName || pendingCustomer?.data?.address?.streetName || '',
        city: newUserInfo?.city || pendingCustomer?.data?.address?.city || '',
        state: newUserInfo?.state || pendingCustomer?.data?.address?.state || '',
        zip:  newUserInfo?.zip || pendingCustomer?.data?.address?.zip || '',
        month: newUserInfo?.month || pendingCustomer?.data?.birthday?.month || '',
        day: newUserInfo?.day || pendingCustomer?.data?.birthday?.day || '',
        year: newUserInfo?.year || pendingCustomer?.data?.birthday?.year || '',
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
            value={newUser.month || allMonthList[0]}
            options={allMonthList}
            onChange={handleChange}
          />
          <DynamicSelect
            label="Day"
            name="day"
            value={newUser.day || daysInMonthList[0]}
            options={daysInMonthList}
            onChange={handleChange}
          />
          <Input
            label="Year"
            name="year"
            value={newUser.year || yearOptions[0]}
            onChange={handleChange}
          />
        </BirthdayContainer>
      </ColumnAlign>
    );
  }, [handleChange, newUser.day, newUser.month, newUser.year, yearOptions]);

  const renderAddress = useCallback(() => {
    return (
      <ColumnAlign>
        <StyledLabel>Address</StyledLabel>
        <AddressContainer>
          <Input
            label="Street Name"
            name="streetName"
            value={newUser.streetName || ''}
            onChange={handleChange}
          />
          <Input
            label="City"
            name="city"
            value={newUser.city || ''}
            onChange={handleChange}
          />
          <DynamicSelect
            label="State"
            name="state"
            value={newUser.state || stateAcronymList[0]}
            options={stateAcronymList}
            onChange={handleChange}
          />
          <Input
            label="Zip"
            name="zip"
            value={newUser.zip || ''}
            onChange={handleChange}
          />
        </AddressContainer>
      </ColumnAlign>
    )
  }, [handleChange, newUser.city, newUser.state, newUser.streetName, newUser.zip])

  const renderComponents = React.useCallback(() => {
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
