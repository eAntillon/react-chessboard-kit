import { useDroppable } from "@dnd-kit/core";
import Notation from "../notation";

interface SquareProps {
    id: string;
    color: string;
    children: React.ReactNode;
    notation?: string[];
}

function Square({ color, children, id, notation }: SquareProps) {


    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className={`square ${color} ${isOver ? "highlight" : ""}`}
        >
            {notation && <Notation color={color} notation={notation} />
            }
            {children}
        </div>
    );
}

export default Square;
