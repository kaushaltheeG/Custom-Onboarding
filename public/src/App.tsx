import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMainSite, ISiteActions } from "./services/site/actions";
import { getSite } from "./services/site/selectors";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/header";
import Home from "./components/pages/Home";
import Admin from "./components/pages/Admin";
import Data from "./components/pages/Data";
import { Dispatch } from "redux";

function App() {
  const dispatch = useDispatch<Dispatch<ISiteActions>>();
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
				<Route path="/admin" element={<Admin />}></Route>
				<Route path="/data" element={<Data />}></Route>
				<Route path="/" element={<Home />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
