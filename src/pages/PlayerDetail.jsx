import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlayer } from "../api/client";

export default function PlayerDetail() {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPlayer(id)
      .then((res) => setPlayer(res.data))
      .catch((err) => setError(err.message));
  }, [id]);

  if (error) return <p className="error-text">Error: {error}</p>;
  if (!player) return <p>Loading...</p>;
  if (player.error) return <p>{player.error}</p>;

  const statFields = [
    "pace", "shooting", "passing", "dribbling", "defending", "physic",
    "movement_reactions", "mentality_composure", "skill_ball_control", "power_stamina"
  ];

  return (
    <div>
      <div className="detail-header">
        <img
          src={player.player_face_url}
          alt={player.short_name}
          referrerPolicy="no-referrer"
        />
        <div>
          <h1>{player.long_name}</h1>
          <p>{player.club_name} — {player.nationality_name}</p>
          <p>Position: {player.player_positions}</p>
          <div className="score-big">{player.overall}</div>
        </div>
      </div>

      <h3 style={{ marginTop: "1.75rem" }}>Stats</h3>
      <div className="stat-grid">
        {statFields.map((f) => (
          <div key={f} className="stat-box">
            <div className="label">{f.replaceAll("_", " ")}</div>
            <div className="value">{player[f] || "-"}</div>
            <div className="stat-bar-track">
              <div className="stat-bar-fill" style={{ width: `${player[f] || 0}%` }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}