import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import { Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Route path="/" exact>
        <Login />
      </Route>
      <Route path="/home">
        <Home />
      </Route>
    </BrowserRouter>
  );
}

export default App;
