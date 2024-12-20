import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../../services/user/selectors";
import { Dispatch } from "redux";
import { fetchUsers, IUserActions } from "../../../services/user/actions";
import { StyledTable, TableContainer } from "./styled";

const Data: React.FC = () => {
  const allUsers = useSelector(getAllUsers);
  const [loaded, setLoaded] = React.useState(false);
  const dispatch = useDispatch<Dispatch<IUserActions>>();

  React.useEffect(() => {
    if (loaded) {
      return;
    }
    dispatch(fetchUsers());
    setLoaded(true);
  }, [loaded, dispatch])

  return (
    <TableContainer>
      <StyledTable>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Birthday</th>
            <th>Address</th>
            <th>About Me</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user) => (
            <tr key={user._id}>
              <td>{user.firstName} {user.lastName}</td>
              <td>{user.email}</td>
              <td>
                {user.data.birthday.month} {user.data.birthday.day}, {user.data.birthday.year}
              </td>
              <td>
                {`${user.data.address.streetName}, ${user.data.address.city}, ${user.data.address.state}, ${user.data.address.zip}`}
              </td>
              <td>{user.data.aboutMe}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default Data;
