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
  width: 40rem;
  margin-top: 20px;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: #333;
  font-weight: bold;
  
  &:hover {
      color: #007bff;
  }
`;
export const ParentComponent = styled.div`
  width: 100%;
`;
export const HeaderContainer = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  border-radius: 30px;
  padding: 5px;
  background-color: #ffffff;
  color: e8f5e9;
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-top: 20px;
`;
