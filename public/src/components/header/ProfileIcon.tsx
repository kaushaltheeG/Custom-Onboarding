import React from "react";
import { IconContainer } from "./styles";

interface ProfileIconProps {
  firstName: string;
}

const ProfileIcon: React.FC<ProfileIconProps> = ({ firstName }) => {
  const displayName = firstName.length > 10 ? `${firstName.slice(0, 10)}...` : firstName;

  return (
    <IconContainer title={firstName}> {/* Add title for full name on hover */}
      {displayName}
    </IconContainer>
  );
};

export default ProfileIcon;
