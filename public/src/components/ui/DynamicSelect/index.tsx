import React from 'react';
import { SelectContainer, StyledLabel, StyledSelect } from './styled';


interface DynamicSelectProps {
  label: string;
  options: string[] | number[];
  value: string | number;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DynamicSelect: React.FC<DynamicSelectProps> = ({ label, options, value, name, onChange }) => {
    const calculateWidth = (options: string[] | number[]) => {
      const maxWidth = options.reduce((max: number, option: string | number) => {
        const width = String(option).length * 10; // Approximate width (adjust as needed)
        return Math.max(max, width);
      }, 0);

      return maxWidth + 40; // Adding padding
    };

    const dynamicWidth = React.useMemo(() => calculateWidth(options), [options]);

    return (
      <SelectContainer>
          <StyledLabel>{label}</StyledLabel>
          <StyledSelect
            name={name}
            value={value}
            onChange={onChange}
            dynamicWidth={dynamicWidth} // Pass dynamic width to styled component
          >
            <option value="" disabled>Select an option</option>
            {options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </StyledSelect>
      </SelectContainer>
    );
};

export default DynamicSelect;