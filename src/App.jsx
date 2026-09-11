import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Players from "./pages/Players";
import PlayerDetail from "./pages/PlayerDetail";
import Predict from "./pages/Predict";
import Leaderboard from "./pages/Leaderboard";
import Quiz from "./pages/Quiz";

import TeamBuilder from "./pages/TeamBuilder";

export default function App() {
  return (
    <BrowserRouter>
      <nav className="navbar">
        <Link to="/">Home</Link>
        <Link to="/players">Players</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <Link to="/predict">Predict</Link>
        <Link to="/quiz">Quiz</Link>
            <Link to="/team-builder">Team Builder</Link>
      </nav>
      <div className="page">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/players" element={<Players />} />
          <Route path="/players/:id" element={<PlayerDetail />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/team-builder" element={<TeamBuilder />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}