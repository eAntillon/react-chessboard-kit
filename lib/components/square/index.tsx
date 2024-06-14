import { useDroppable } from "@dnd-kit/core";
import Notation from "../notation";
import classNames from "classnames";
import { SelectedSquare } from "../Chessboard.types";

interface SquareProps {
    id: string;
    color: string;
    children: React.ReactNode;
    notation?: string[];
    canBeMove?: boolean;
    canBeCapture?: boolean;
    selected?: SelectedSquare;
    validMoves: { [key: string]: boolean };
    setSelected: (square: SelectedSquare) => void;
    dropPiece: (source: string, target: string) => void;
}

function Square({ color, children, id, notation, dropPiece, selected: selectedSquare, validMoves}: SquareProps) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className={classNames({
                square: true,
                [color]: true,
                highlight: isOver && selectedSquare?.square !== id,
                selected: selectedSquare?.square === id,
                "valid-move": validMoves?.[id] ?? false,
            })}
            onClick={() => {
                if (validMoves?.[id]) {
                    dropPiece(selectedSquare?.square as string, id);
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
