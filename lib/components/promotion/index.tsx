import classNames from "classnames";
import { createPortal } from "react-dom"
import { PromotionState } from "../Chessboard.types";

interface PromotionProps {
  promotionState: PromotionState
  dropPiece: (source: string, target: string, promotion: string) => void
  setPromotionState: (promotionState: PromotionState) => void
}

function Promotion({
  promotionState: {
    square,
    nextMove,
    color
  }, dropPiece,
  
}: PromotionProps) {

  const pieces = square[1] === "1" ? ["q", "r", "b", "n"] : ["Q", "R", "B", "N"];
  const side = color === "white" ? "top" : "bottom";

  const handleCancel = () => {
    dropPiece(nextMove.source, nextMove.target, "")
  }
  return <>
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