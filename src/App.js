import logo from "./logo.svg";
import "./App.css";
import Moviepage from "./components/Moviepage";
import { Route, Routes } from "react-router-dom";
import Moviecard from "./components/Moviecard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Moviepage />}></Route>
        <Route path="movie/:id" element={<Moviecard />}></Route>
      </Routes>
    </div>
  );
}

export default App;
