import React from "react";
import { NavbarContainer, NavLink } from "./styles";

const Navbar: React.FC = () => {
    return (
        <NavbarContainer>
            <NavLink to="/">Onboard</NavLink>
            <NavLink to="/admin">Form Layout</NavLink>
            <NavLink to="/data">User Datatable</NavLink>
        </NavbarContainer>
    );
};

export default Navbar;
