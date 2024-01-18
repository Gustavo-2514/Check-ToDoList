import { Route, RouterProvider } from "react-router-dom";
import router from "./routes/routes";
import ContextProvider from "./context/useContext";
import Routes from "./routes/routes";

function App() {
  return (
    <ContextProvider>
      <Routes/>
    </ContextProvider>
  );
}

export default App;
