import { useDroppable } from "@dnd-kit/core";
import Notation from "../notation";
import classNames from "classnames";
import { SelectedSquare } from "../Chessboard.types";
import { addAnimation, resetAnimation } from "../../utils";

interface SquareProps {
    id: string;
    color: string;
    children: React.ReactNode;
    notation?: string[];
    canBeMove?: boolean;
    canBeCapture?: boolean;
    selected?: SelectedSquare | null;
    validMoves: { [key: string]: boolean };
    dropPiece: (source: string, target: string) => void;
    reset?: () => void;
    inCheck?: boolean;
}
function Square({ color, children, id, notation, dropPiece, selected: selectedSquare, validMoves, reset, inCheck}: SquareProps) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    return (
        <div
            id={id}
            ref={setNodeRef}
            className={classNames({
                "square": true,
                [color]: true,
                highlight: isOver && selectedSquare?.square !== id,
                selected: selectedSquare?.square === id,
                "valid-move": validMoves?.[id] ?? false,
                "in-check": inCheck,
            })}
            onClick={async () => {
                if (validMoves?.[id]) {
                    await addAnimation({
                        source: selectedSquare?.square as string,
                        target: id,
                    });
                    dropPiece(selectedSquare?.square as string, id);
                } else if (!children && selectedSquare?.square) {
                    if (reset)
                    reset();
                    resetAnimation({
                        source: selectedSquare?.square as string,
                        target: id,
                    });
                }
            }}
        >
            {notation && <Notation color={color} notation={notation} />
            }
            {children}
        </div>
    );
}

export default Square;
