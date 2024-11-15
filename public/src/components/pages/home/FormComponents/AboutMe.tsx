import React from "react";
import { IPageTwoAndThreeState } from "../Pages/pageTwoOrThree";
import TextArea from "../../../ui/TextArea";

interface IAboutMeProps {
  newUser: IPageTwoAndThreeState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const AboutMe: React.FC<IAboutMeProps> = ({
  newUser,
  handleChange,
}) => {
  return (
    <TextArea
      label="About Me"
      name="aboutMe"
      maxChars={200}
      value={newUser.aboutMe}
      handleChange={handleChange}
    />
  );
};

export default AboutMe;
