import { Chess } from "chess.js";
import { Chessboard } from "../lib/main"
import { useState } from "react";
function App() {

  // const [chess, setChess] = useState(new Chess("rnbqkbnr/pP2pppp/8/8/8/8/PPPP1PPP/RNBQKBNR w KQkq - 1 5")); 
  const [chess, setChess] = useState(new Chess("rnbqkbnr/pP3ppp/8/8/8/8/Pp2BPPP/RNBQK1NR b KQkq - 1 9"));
  const [theme, setTheme] = useState("default")

  const themeNames = [
    "default",
    "coral",
    "dusk",
    "marine",
    "wheat",
    "emerald",
    "sandcastle"
  ];

  const [orientation, setOrientation] = useState<"white" | "black">("white")

  return (
    <>
      <div style={
        {
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "20px"
        }
      }>

        <Chessboard boardPosition={chess.fen()} onMove={(move) => {
          setChess((prev) => {
            prev.move({ from: move.from, to: move.to, promotion: move.promotion })
            return new Chess(prev.fen())
          }
          )
        }} orientation={orientation} theme={theme} />


        <div style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px"
        }}>
          <button onClick={() => setOrientation(orientation === "white" ? "black" : "white")}>
            current: {orientation}
          </button>
          <p>{chess.fen()}</p>

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
      </div>
    </>
  )
}

export default App
