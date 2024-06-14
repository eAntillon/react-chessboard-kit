import { useDraggable } from "@dnd-kit/core";
import classNames from "classnames";
import { SelectedSquare } from "../Chessboard.types";

interface ChesspieceProps {
    id: string;
    type: string;
    selected?: SelectedSquare;
    setSelected: (square: SelectedSquare) => void;
}

function Chesspiece({
    id,
    type,
    selected,
    setSelected
}: ChesspieceProps) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 20,
    } : undefined;
    
    return <div className={classNames({
        'chesspiece': true,
        [type]: true,
        
    })} ref={setNodeRef} style={style} onMouseDown={
        () => {
                console.log("clicked: ", id, selected)
                setSelected({
                    square: id,
                    piece: type
                })
        }
    } {...listeners} {...attributes}></div>;
}

export default Chesspiece;