import React from "react";
import { BirthdayContainer, ColumnAlign, StyledLabel } from "../styles";
import Input from "../../../ui/Input";
import DynamicSelect from "../../../ui/DynamicSelect";
import { IPageTwoAndThreeState } from "../Pages/pageTwoOrThree";
import { allMonthList, daysInMonthList } from "../../../../utils";

interface IBirthdayProps {
  newUser: IPageTwoAndThreeState;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

const Birthday: React.FC<IBirthdayProps> = ({
  newUser,
  handleChange,
}) => {
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
};

export default Birthday;
