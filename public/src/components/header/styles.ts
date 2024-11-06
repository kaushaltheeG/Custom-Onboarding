import styled from 'styled-components'
import { Link } from 'react-router-dom';

export const NavbarContainer = styled.div`
    background-color: #ffffff;
    border-radius: 10px;
    padding: 10px 20px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 20px;
    width: 40rem;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  margin: 0 15px;
  
  &:hover {
      color: #007bff;
  }
`;

export const HeaderContainer = styled.header`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
`;

