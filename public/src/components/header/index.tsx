import React from "react";
import { HeaderContainer } from "./styles";
import Navbar from "./Navbar";

const Header: React.FC = () => {

  return (
    <HeaderContainer>
      <Navbar />
    </HeaderContainer>
  )
};

export default Header;
