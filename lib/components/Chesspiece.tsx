import { useDraggable } from "@dnd-kit/core";

interface ChesspieceProps {
    id: string;
    type: string;
}

function Chesspiece({
    id,
    type
}: ChesspieceProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
    } : undefined;

    return <div className={`chesspiece ${type}`} ref={setNodeRef} style={style} {...listeners} {...attributes}></div>;
}

export default Chesspiece;