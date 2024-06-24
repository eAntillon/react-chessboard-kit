import classNames from "classnames";
import { createPortal } from "react-dom"
import { PromotionState } from "../Chessboard.types";

interface PromotionProps {
  promotionState: PromotionState
  dropPiece: (source: string, target: string, promotion: string) => void
  resetPromotion?: () => void
  orientation: "white" | "black"
}

function Promotion({
  promotionState: {
    square,
    nextMove,
    color
  }, dropPiece,
  orientation
}: PromotionProps) {

  const pieces = color == "black" ? ["q", "r", "b", "n"] : ["Q", "R", "B", "N"];
  
  let side = "bottom";
  if (orientation === "white") {
    side = color === "white" ? "top" : "bottom";
  }
  if (orientation === "black") {
    side = color === "white" ? "bottom" : "top";
  }


  return <>
    {square && createPortal(
      <div id="promotion" className={
        classNames({
          "promotion": true,
          [color!]: true,
          [side!]: true
        })
      }
      >
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
      </div >, document.querySelector(`#${square}`) as Element
    )
    }
  </>
}

export default Promotion