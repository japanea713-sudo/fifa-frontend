import { useEffect, useState } from "react";
import { getRandomQuizPlayer } from "../api/client";

import RunningLoader from "../components/RunningLoader";

export default function Quiz() {
  const [player, setPlayer] = useState(null);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);
  const [loading, setLoading] = useState(true);

  const loadPlayer = () => {
    setLoading(true);
    setRevealed(false);
    setSelected(null);
    getRandomQuizPlayer()
      .then((res) => setPlayer(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(loadPlayer, []);

if (loading || !player) return <RunningLoader label="Finding a mystery player..." />;


  const clues = [
    `Position: ${player.player_positions}`,
    `Club: ${player.club_name}`,
    `Nationality: ${player.nationality_name}`,
    `Age: ${player.age}`,
    `Preferred foot: ${player.preferred_foot}`,
  ];

  const handlePick = (option) => {
    setSelected(option);
    setRevealed(true);
  };

  const isCorrect = selected === player.short_name;

  return (
    <div>
      <h1>Guess the player</h1>
      <p>Read the clues, then pick who you think it is.</p>

      <div className="form-section">
        <h3>Clues</h3>
        <ul style={{ lineHeight: 2 }}>
          {clues.map((c) => <li key={c}>{c}</li>)}
        </ul>
      </div>

      <div className="quiz-options">
        {player.options.map((option) => {
          let stateClass = "";
          if (revealed) {
            if (option === player.short_name) stateClass = "correct";
            else if (option === selected) stateClass = "wrong";
          }
          return (
            <button
              key={option}
              className={`quiz-option ${stateClass}`}
              onClick={() => !revealed && handlePick(option)}
              disabled={revealed}
            >
              {option}
            </button>
          );
        })}
      </div>

      {revealed && (
        <div>
          <p style={{ marginTop: "1.5rem", color: isCorrect ? "#8fd19e" : "#e0788c", fontWeight: 600 }}>
            {isCorrect ? "Correct!" : `Not quite — it was ${player.short_name}.`}
          </p>

          <div className="detail-header" style={{ marginTop: "1rem" }}>
            <img src={player.player_face_url} alt={player.short_name} referrerPolicy="no-referrer" />
            <div>
              <h1>{player.long_name}</h1>
              <p>{player.club_name} — {player.nationality_name}</p>
              <div className="score-big">{player.overall}</div>
            </div>
          </div>

          <button onClick={loadPlayer} style={{ marginTop: "1.5rem" }}>Next player →</button>
        </div>
      )}
    </div>
  );
}