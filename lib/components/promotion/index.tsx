import classNames from "classnames";
import { createPortal } from "react-dom"
import { PromotionState } from "../Chessboard.types";

interface PromotionProps {
  promotionState: PromotionState
  dropPiece: (source: string, target: string, promotion: string) => void
}

function Promotion({
  promotionState: {
    square,
    nextMove,
    side,
    color
  }, dropPiece
}: PromotionProps) {

  const pieces = square[1] === "1" ? ["q", "r", "b", "n"] : ["Q", "R", "B", "N"];
  return <>
    {
      JSON.stringify(square)
    }
    {square && createPortal(
      <div className={
        classNames({
          "promotion": true,
          [color!]: true,
          [side!]: true
        })

      }>
        {
          pieces.map((p, i) => (
            <div key={i} className={
              classNames({
                "chesspiece": true,
                [p]: true
              })
            } onClick={() => {
              dropPiece(nextMove.source, nextMove.target, p.toLowerCase())
            }}>
            </div>
          ))
        }
      </div>, document.querySelector(`#${square}`) as Element
    )}
  </>
}

export default Promotion