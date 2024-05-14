import { useDroppable } from "@dnd-kit/core";

interface SquareProps {
    id: string;
    color: string;
    children: React.ReactNode;
}

function Square({ color, children, id }: SquareProps) {
    const { isOver, setNodeRef } = useDroppable({
        id,
    });

    return (
        <div
            ref={setNodeRef}
            className={`square ${color} ${isOver ? "highlight" : ""}`}
        >
            {children}
        </div>
    );
}

export default Square;
