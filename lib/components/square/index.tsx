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
    reset: () => void;
}

const addAnimation = async ({ source, target }: { source: string, target: string }) => {
    const sourceSquare = document.getElementById(source);
    const targetSquare = document.getElementById(target);

    if (sourceSquare && targetSquare) {
        console.log(sourceSquare.offsetLeft, sourceSquare.offsetHeight);
        console.log(targetSquare.offsetLeft, targetSquare.offsetHeight)
        const piece = sourceSquare.querySelector(".chesspiece");
        if (piece) {
            const keyframes = `
                0% {
                    transform: translate(0, 0);
                }
                100% {
                    transform: translate(${targetSquare.offsetLeft - sourceSquare.offsetLeft}px, ${targetSquare.offsetTop - sourceSquare.offsetTop}px);
                }
            `
            const animation = document.createElement("style");
            animation.type = "text/css";
            animation.innerHTML = `@keyframes move {${keyframes}}`;
            document.head.appendChild(animation);
            piece.classList.add("moving");
            piece.style.animation = "move 0.2s forwards";
          
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 200);
            })

        }
    }
}


function Square({ color, children, id, notation, dropPiece, selected: selectedSquare, validMoves, reset }: SquareProps) {
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
            })}
            onClick={async () => {
                if (validMoves?.[id]) {
                    await addAnimation({
                        source: selectedSquare?.square as string,
                        target: id,
                    });
                    dropPiece(selectedSquare?.square as string, id);
                } else if (!children) {
                    reset();
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
