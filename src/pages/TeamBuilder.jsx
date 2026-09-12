import { useEffect, useState } from "react";
import { getPlayers } from "../api/client";

export default function TeamBuilder() {
  const [pool, setPool] = useState([]);
  const [search, setSearch] = useState("");
  const [squad, setSquad] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlayers(300).then((res) => setPool(res.data)).finally(() => setLoading(false));
  }, []);

  const addPlayer = (p) => {
    if (squad.length >= 11) return;
    if (squad.find((s) => s.player_id === p.player_id)) return;
    setSquad([...squad, p]);
  };

  const removePlayer = (id) => setSquad(squad.filter((s) => s.player_id !== id));

  const filtered = pool
    .filter((p) => p.name?.toLowerCase().includes(search.toLowerCase()))
    .slice(0, 20);

  const avgOverall = squad.length
    ? Math.round(squad.reduce((sum, p) => sum + p.overall_rating, 0) / squad.length)
    : 0;

  if (loading) return <p>Loading player pool...</p>;

  return (
    <div>
      <h1>Team builder</h1>
      <p>Search and add up to 11 players to build your squad.</p>

      <div className="squad-summary">
        <div className="summary-stat">
          <div className="label">Squad size</div>
          <div className="value">{squad.length}/11</div>
        </div>
        <div className="summary-stat">
          <div className="label">Average overall</div>
          <div className="value">{avgOverall || "-"}</div>
        </div>
      </div>

      <div className="form-section">
        <h3>Your squad</h3>
        {squad.length === 0 ? (
          <p>No players added yet — search below to get started.</p>
        ) : (
          <div className="player-grid">
            {squad.map((p) => (
              <div key={p.player_id} className="player-card squad-card">
                <span className="score-badge">{p.overall_rating}</span>
                <img src={p.image} alt={p.name} referrerPolicy="no-referrer" />
                <h3>{p.name}</h3>
                <p>{p.club_name}</p>
                <button className="remove-btn" onClick={() => removePlayer(p.player_id)}>Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="form-section">
        <h3>Add players</h3>
        <div className="search-bar">
          <span className="icon">🔍</span>
          <input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Club</th>
              <th>Overall</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((p, i) => (
              <tr key={p.player_id} style={{ animationDelay: `${i * 30}ms` }}>
                <td>{p.name}</td>
                <td>{p.club_name}</td>
                <td>{p.overall_rating}</td>
                <td>
                  <button onClick={() => addPlayer(p)} disabled={squad.length >= 11}>
                    Add
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}