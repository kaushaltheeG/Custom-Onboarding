import React from "react";
import { HeaderContainer, ParentComponent} from "./styles";
import Navbar from "./Navbar";
import { useSelector } from "react-redux";
import { getLoggedInUser } from "../../services/user/selectors";
import ProfileIcon from "./ProfileIcon";

const Header: React.FC = () => {
  const loggedInUser = useSelector(getLoggedInUser);

  const renderHeader = React.useCallback(() => {
    if (loggedInUser) {
      return (
        <HeaderContainer loggedIn={true}>
          <div />
          <Navbar />
          <ProfileIcon firstName={loggedInUser.firstName}/>
        </HeaderContainer>
      );
    }
    return (
      <HeaderContainer loggedIn={false}>
        <Navbar />
      </HeaderContainer>
    )
  }, [loggedInUser])
  return (
    <ParentComponent>
      {renderHeader()}
    </ParentComponent>
  )
};

export default Header;
