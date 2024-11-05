import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMainSite } from "./services/site/actions";
import { getSite } from "./services/site/selectors";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from "./components/header";
function App() {
  const dispatch = useDispatch();
  const site = useSelector(getSite);
  // const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // if (site) {
    //   setLoaded(true);
    //   return;
    // }
    dispatch(fetchMainSite());
  }, [dispatch, site]);

  return (
    <Router>
      <Header />
      <Routes>
        <Route exact path="/"></Route>
      </Routes>
    </Router>
  )
}

export default App;
