import React from "react";
import { HeaderContainer, ParentComponent} from "./styles";
import Navbar from "./Navbar";

const Header: React.FC = () => {
  return (
    <ParentComponent>
      <HeaderContainer>
        <Navbar />
      </HeaderContainer>
    </ParentComponent>
  )
};

export default Header;
