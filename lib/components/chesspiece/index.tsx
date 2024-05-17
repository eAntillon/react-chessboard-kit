import { useDraggable } from "@dnd-kit/core";
import { boardAtom } from "../../store";
import { useAtom } from "jotai";

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

    const [boardState, setBoardState] = useAtom(boardAtom)

    return <div className={`chesspiece ${type}`} ref={setNodeRef} style={style}  onMouseDown={
        () => {
            console.log("mousedown", id);
            setBoardState({
                ...boardState,
                selectedSquare: id
            })
        }
    } {...listeners} {...attributes}></div>;
}

export default Chesspiece;