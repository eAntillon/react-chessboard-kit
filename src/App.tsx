import { Chess } from "chess.js";
import { Chessboard } from "../lib";
import { useState } from "react";

function App() {
  // const [chess, setChess] = useState(new Chess("rnbqkbnr/pP2pppp/8/8/8/8/PPPP1PPP/RNBQKBNR w KQkq - 1 5"));
  const [chess, setChess] = useState(new Chess());
  const [theme, setTheme] = useState("default");

  const themeNames = [
    "default",
    "coral",
    "dusk",
    "marine",
    "wheat",
    "emerald",
    "sandcastle",
  ];

  const [orientation, setOrientation] = useState<"white" | "black">("white");

  return (
    <>
      <div className="container">
        <Chessboard
          boardPosition={chess.fen()}
          onMove={(move) => {
            setChess((prev) => {
              prev.move({
                from: move.from,
                to: move.to,
                promotion: move.promotion,
              });
              return new Chess(prev.fen());
            });
          }}
          orientation={orientation}
          theme={theme}
        />

        <div>


          <div>
            <p>{orientation}</p>
            <button
              onClick={() =>
                setOrientation(orientation === "white" ? "black" : "white")
              }
            >
              Rotate
            </button>
          </div>
        </div>

        <div>
          <p>Change theme:</p>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            {themeNames.map((themeName) => (
              <option key={themeName} value={themeName}>
                {themeName}
              </option>
            ))}
          </select>
        </div>
      </div>
    </>
  );
}
export default App;
