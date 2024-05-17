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
        zIndex: 20,
    } : undefined;

    return <div className={`chesspiece ${type}`} ref={setNodeRef} style={style}  onMouseDown={
        () => {
            console.log("mousedown", id);
            // get valid moves
            // const chess = new Chess();
            // chess.load(boardPosition);
            // const moves = chess.moves({ square: id });
            // console.log(moves);
        }
    } {...listeners} {...attributes}></div>;
}

export default Chesspiece;