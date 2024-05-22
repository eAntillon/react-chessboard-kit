import { Chess } from "chess.js";
import { Chessboard } from "../lib/main"
import { useState } from "react";
function App() {

  const [chess] = useState(new Chess()); // Inicializa chess.js con la posición FEN

const [orientation, setOrientation] = useState<"white" | "black">("white")

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
          console.log("Move from app", move)
          const result = chess.move(move);
          
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
