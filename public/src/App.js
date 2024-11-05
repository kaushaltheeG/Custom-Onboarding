import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMainSite } from "./services/site/actions";
import { getSite } from "./services/site/selectors";

function App() {
  const dispatch = useDispatch();
  const site = useSelector(getSite);

  useEffect(() => {
    dispatch(fetchMainSite());
  }, [dispatch]);
  return (
    <>{site ? site.name : 'loading'}</>
  );
}

export default App;
