import styled from 'styled-components'
import { Link } from 'react-router-dom';

export const NavbarContainer = styled.div`
    background-color: #ffffff; /* White background for the navbar */
    border-radius: 10px; /* Rounded corners */
    padding: 10px 20px; /* Padding for spacing */
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1); /* Slight shadow for depth */
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px; /* Margin for spacing from the top */
    width: 40rem;
`;

export const NavLink = styled(Link)`
  text-decoration: none; /* Remove underline from links */
  color: #333; /* Text color */
  font-weight: bold; /* Bold text */
  margin: 0 15px; /* Margin between links */
  
  &:hover {
      color: #007bff; /* Change color on hover */
  }
`;

export const HeaderContainer = styled.header`
    display: flex;
    justify-content: center; /* Space between nav and user icon */
    align-items: center;
    width: 100%;
`;

