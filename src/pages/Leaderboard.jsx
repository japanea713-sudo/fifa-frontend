import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlayers } from "../api/client";

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    getPlayers(50).then((res) => setPlayers(res.data));
  }, []);

  return (
    <div>
      <h1>Leaderboard — Top 50</h1>
      <ol>
        {players.map((p, i) => (
          <li key={p.player_id} style={{ marginBottom: "0.5rem", animationDelay: `${i * 30}ms` }}>
            <Link to={`/players/${p.player_id}`}>
              {p.name} — {p.club_name} — <strong>{p.overall_rating}</strong>
            </Link>
          </li>
        ))}
      </ol>
    </div>
  );
}