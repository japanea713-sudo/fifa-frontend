import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getPlayers } from "../api/client";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPlayers(200)
      .then((res) => setPlayers(res.data))
      .finally(() => setLoading(false));
  }, []);

  const filtered = players.filter((p) =>
    p.short_name.toLowerCase().includes(search.toLowerCase()) ||
    p.club_name?.toLowerCase().includes(search.toLowerCase())
  );

 if (loading) return (
  <div className="skeleton-grid">
    {Array.from({ length: 8 }).map((_, i) => <div key={i} className="skeleton-card" />)}
  </div>
);

  return (
    <div>
      <h1>Players</h1>
      <div className="search-bar">
  <span className="icon">🔍</span>
      <input
        placeholder="Search by name or club..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      </div>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th align="left">Name</th>
            <th align="left">Club</th>
            <th align="left">Nationality</th>
            <th align="left">Position</th>
            <th align="left">Overall</th>
          </tr>
        </thead>
        <tbody>
            {filtered.map((p, i) => (
    <tr key={p.sofifa_id} style={{ animationDelay: `${i * 30}ms` }}>
              <td>
                <Link to={`/players/${p.sofifa_id}`}>{p.short_name}</Link>
              </td>
              <td>{p.club_name}</td>
              <td>{p.nationality_name}</td>
              <td>{p.player_positions}</td>
              <td>{p.overall}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}