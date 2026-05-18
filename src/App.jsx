import { useRoutes } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators";
import ViewCreator from "./pages/ViewCreator";
import EditCreator from "./pages/EditCreator";
import AddCreator from "./pages/AddCreator";
import "./App.css";

const App = () => {
  const element = useRoutes([
    {
      path: "/", // Default path
      element: <ShowCreators />,
    },
    {
      path: "/view/:id",
      element: <ViewCreator />,
    },
    {
      path: "/edit/:id",
      element: <EditCreator />,
    },
    {
      path: "/new",
      element: <AddCreator />,
    },
  ]);

  return <div className="App">{element}</div>;
};

export default App;
