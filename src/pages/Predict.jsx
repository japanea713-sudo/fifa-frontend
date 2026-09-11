import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { predictScore, getModelInfo } from "../api/client";

const fieldGroups = [
  {
    title: "Physical",
    fields: [
      { name: "age", label: "Age", min: 16, max: 45, type: "range" },
      { name: "height_cm", label: "Height (cm)", min: 150, max: 210, type: "range" },
      { name: "weight_kg", label: "Weight (kg)", min: 50, max: 110, type: "range" },
    ],
  },
  {
    title: "Attacking",
    fields: [
      { name: "pace", label: "Pace", min: 1, max: 99, type: "range" },
      { name: "shooting", label: "Shooting", min: 1, max: 99, type: "range" },
      { name: "passing", label: "Passing", min: 1, max: 99, type: "range" },
      { name: "dribbling", label: "Dribbling", min: 1, max: 99, type: "range" },
    ],
  },
  {
    title: "Physicality & Defense",
    fields: [
      { name: "defending", label: "Defending", min: 1, max: 99, type: "range" },
      { name: "physic", label: "Physic", min: 1, max: 99, type: "range" },
      { name: "power_stamina", label: "Stamina", min: 1, max: 99, type: "range" },
    ],
  },
  {
    title: "Mentality & Skill",
    fields: [
      { name: "movement_reactions", label: "Reactions", min: 1, max: 99, type: "range" },
      { name: "mentality_composure", label: "Composure", min: 1, max: 99, type: "range" },
      { name: "skill_ball_control", label: "Ball control", min: 1, max: 99, type: "range" },
    ],
  },
  {
    title: "Style",
    fields: [
      { name: "preferred_foot", label: "Preferred foot", type: "select", options: ["Right", "Left"] },
      { name: "work_rate", label: "Work rate", type: "select", options: ["Low/Low", "Medium/Medium", "High/High", "High/Medium", "Medium/High"] },
    ],
  },
];

const initialForm = {
  age: 25, height_cm: 180, weight_kg: 75,
  pace: 70, shooting: 65, passing: 65, dribbling: 70,
  defending: 50, physic: 65, power_stamina: 70,
  movement_reactions: 65, mentality_composure: 65, skill_ball_control: 70,
  preferred_foot: "Right", work_rate: "Medium/Medium",
};

export default function Predict() {
  const [form, setForm] = useState(initialForm);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modelInfo, setModelInfo] = useState([]);

  useEffect(() => {
    getModelInfo().then((res) => setModelInfo(res.data));
  }, []);

  const handleChange = (name, value, isRange) => {
    setForm((prev) => ({ ...prev, [name]: isRange ? Number(value) : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await predictScore(form);
      setResult(res.data.predicted_score);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Predict a player's score</h1>
      <p>Adjust the attributes below to build a player and see their predicted overall rating.</p>

      <form onSubmit={handleSubmit}>
        {fieldGroups.map((group) => (
          <div className="form-section" key={group.title}>
            <h3>{group.title}</h3>
            <div className="field-grid">
              {group.fields.map((f) =>
                f.type === "select" ? (
                  <label key={f.name}>
                    {f.label}
                    <select value={form[f.name]} onChange={(e) => handleChange(f.name, e.target.value, false)}>
                      {f.options.map((o) => <option key={o}>{o}</option>)}
                    </select>
                  </label>
                ) : (
                  <label key={f.name}>
                    {f.label}
                    <div className="slider-row">
                      <input
                        type="range"
                        min={f.min}
                        max={f.max}
                        value={form[f.name]}
                        onChange={(e) => handleChange(f.name, e.target.value, true)}
                      />
                      <span className="slider-value">{form[f.name]}</span>
                    </div>
                  </label>
                )
              )}
            </div>
          </div>
        ))}

        <button type="submit" className="predict-submit" disabled={loading}>
          {loading ? "Predicting..." : "Predict score"}
        </button>
      </form>

      {error && <p className="error-text">Error: {error}</p>}

      {result !== null && (
        <div className="result-reveal">
          <div className="label">Predicted overall</div>
          <div className="value">{result}</div>
        </div>
      )}

      {result !== null && modelInfo.length > 0 && (
        <div className="form-section">
          <h3>What influenced this prediction</h3>
          <div style={{ width: "100%", height: 320 }}>
            <ResponsiveContainer>
              <BarChart data={modelInfo.slice(0, 8)} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" stroke="rgba(243,233,238,0.5)" />
                <YAxis
                  dataKey="feature"
                  type="category"
                  width={140}
                  stroke="rgba(243,233,238,0.5)"
                  tickFormatter={(v) => v.replaceAll("_", " ")}
                />
                <Tooltip
                  contentStyle={{ background: "#1e1a24", border: "1px solid rgba(255,255,255,0.08)", color: "#f3e9ee" }}
                  formatter={(v) => [(v * 100).toFixed(1) + "%", "Importance"]}
                />
                <Bar dataKey="importance" fill="#c9a574" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
}