import { useDroppable } from "@dnd-kit/core";
import Notation from "../notation";
import { useAtom } from "jotai";
import { boardAtom } from "../../store";
import classNames from "classnames";

interface SquareProps {
    id: string;
    color: string;
    children: React.ReactNode;
    notation?: string[];
    canBeMove?: boolean
    canBeCapture?: boolean
}

function Square({ color, children, id, notation }: SquareProps) {

    const [boardState, _] = useAtom(boardAtom)
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            // className={`square ${color} ${isOver ? "highlight" : ""}`}
            className={
                classNames({
                    "square": true,
                    [color]: true,
                    "highlight": isOver && boardState.selectedSquare !== id,
                    "clicked": boardState.selectedSquare === id
                })
            }
            // onClick={() => {
            //     console.log("clicked: ", id)
            //     setBoardState({
            //         ...boardState,
            //         selectedSquare: id
            //     })
            // }}
        >
            {notation && <Notation color={color} notation={notation} />
            }
            {children}
        </div>
    );
}

export default Square;
