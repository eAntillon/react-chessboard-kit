import { Chess } from "chess.js";
import { Chessboard } from "../lib/main"
import { useEffect, useState } from "react";
function App() {

  const [chess] = useState(new Chess("r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3")); // Inicializa chess.js con la posición FEN
  const [board, setBoard] = useState(chess.board()); // Genera el estado inicial del tablero

const [orientation, setOrientation] = useState<"white" | "black">("white")

  useEffect(() => {
    chess.load("r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 3 3");
    console.log(chess.board());
    setBoard(chess.board());
  }, [chess]);

  // const handleMove = (move) => {
  //   const result = chess.move(move);
  //   if (result !== null) {
  //     setBoard(chess.board()); // Actualizar el estado del tablero después de un movimiento válido
  //   }
  // };


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
          console.log("Move", move)
        }} orientation={orientation} />
        {/* <Chessboard orientation="black" /> */}

        <button onClick={() => setOrientation(orientation === "white" ? "black" : "white")}>
          change {orientation}
        </button>
      </div>
    </>
  )
}

export default App
