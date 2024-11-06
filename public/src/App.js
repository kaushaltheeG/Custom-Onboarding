import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMainSite } from "./services/site/actions";
import { getSite } from "./services/site/selectors";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/header";
import Home from "./components/pages/Home";
import Admin from "./components/pages/Admin";
function App() {
  const dispatch = useDispatch();
  const site = useSelector(getSite);

  useEffect(() => {
    if (site) {
      return;
    }
    dispatch(fetchMainSite());
  }, [dispatch, site]);

  return (
		<Router>
			<Header />
			<Routes>
				<Route exact path="/" Component={Home}></Route>
				<Route exact path="/admin" Component={Admin}></Route>
			</Routes>
		</Router>
	);
}

export default App;
