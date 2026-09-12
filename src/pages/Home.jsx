import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlayers } from "../api/client";

const fallbackAvatar = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0B3D2E&color=fff&bold=true`;

export default function Home() {
  const [players, setPlayers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPlayers(8)
      .then((res) => setPlayers(res.data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return (
    <div className="skeleton-grid">
      {Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton-card" />)}
    </div>
  );
  if (error) return <p className="error-text">Error: {error}</p>;

  return (
    <div>
      <section className="hero">
        <h1>Player Score Predictor</h1>
        <p>Browse real player ratings, or predict a new player's overall score.</p>
        <Link to="/predict" className="btn">Try the Predictor →</Link>
      </section>

      <h2 style={{ marginTop: "2.5rem" }}>Top Rated Players</h2>
      <div className="player-grid">
        {players.map((p, i) => (
          <Link
            to={`/players/${p.player_id}`}
            key={p.player_id}
            className="player-card"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <span className="score-badge">{p.overall_rating}</span>
            <img
              src={p.image}
              alt={p.name}
              referrerPolicy="no-referrer"
              onError={(e) => { e.target.onerror = null; e.target.src = fallbackAvatar(p.name); }}
            />
            <h3>{p.name}</h3>
            <p>{p.club_name}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}