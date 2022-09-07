import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import MatchForm from "./components/Main/Main.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<MatchForm />} />
      </Routes>
    </Router>
  );
};

export default App;
