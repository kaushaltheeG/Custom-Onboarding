import React from "react";
import { useSelector } from "react-redux";
import { getNewUserInfo } from "../../../../services/user/selectors";
import useNewUserDebounceInput from "../../../../hooks/useNewUserDebounceInput";
import { PageTwoAndThreeContainer } from "../styles";
import Address from "../FormComponents/Address";
import Birthday from "../FormComponents/Birthday";
import AboutMe from "../FormComponents/AboutMe";

export interface IPageTwoAndThreeState {
  aboutMe: string;
  streetName: string;
  city: string;
  state: string;
  zip:  string;
  month: string;
  day: number;
  year: number;
}

const PageTwoOrThree: React.FC<{components: string[]}> = ({ components }) => {
  const newUserInfo = useSelector(getNewUserInfo);
  const { inputState: newUser, handleChange } = useNewUserDebounceInput<IPageTwoAndThreeState>(
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

  const renderComponents = React.useCallback(() => {
    if (!components) {
      return null;
    }
    return components.map((component) => {
      switch(component) {
        case 'aboutMe':
          return <AboutMe newUser={newUser} handleChange={handleChange}/>;
        case  'address':
          return <Address newUser={newUser} handleChange={handleChange}/>;
        case 'birthday':
          return <Birthday newUser={newUser} handleChange={handleChange}/>;
        default:
          return null;
      }
    });
  }, [components, newUser, handleChange]);

  return (
    <PageTwoAndThreeContainer>
      {renderComponents()}
    </PageTwoAndThreeContainer>
  );
};
export default PageTwoOrThree;
