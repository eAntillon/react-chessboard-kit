import { useDroppable } from "@dnd-kit/core";
import Notation from "../notation";
import classNames from "classnames";

interface SquareProps {
    id: string;
    color: string;
    children: React.ReactNode;
    notation?: string[];
    canBeMove?: boolean;
    canBeCapture?: boolean;
    selectedSquare?: string;
    validMoves: { [key: string]: boolean };
    setSelectedSquare: (square: string) => void;
    dropPiece: (source: string, target: string) => void;
}

function Square({ color, children, id, notation, dropPiece, selectedSquare, validMoves}: SquareProps) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className={classNames({
                square: true,
                [color]: true,
                highlight: isOver && selectedSquare !== id,
                selected: selectedSquare === id,
                "valid-move": validMoves?.[id] ?? false,
            })}
            onClick={() => {
                if (validMoves?.[id]) {
                    dropPiece(selectedSquare as string, id);
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
