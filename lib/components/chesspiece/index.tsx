import { useDraggable } from "@dnd-kit/core";
import classNames from "classnames";
import { SelectedSquare } from "../Chessboard.types";
import { resetAnimation } from "../../utils";

interface ChesspieceProps {
    id: string;
    type: string;
    selected?: SelectedSquare | null;
    setSelected: (square: SelectedSquare) => void;
}

function Chesspiece({
    id,
    type,
    selected,
    setSelected,
}: ChesspieceProps) {

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id,
    });
    const style = transform ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
        zIndex: 20,
        backgroundColor: "transparent",
    } : undefined;

    return <div className={classNames({
        'chesspiece': true,
        [type]: true,
    })} ref={setNodeRef} style={style} onMouseDown={
        () => {
            if (selected?.square != id) {
                setSelected({
                    square: id,
                    piece: type
                })
                resetAnimation({
                    source: selected?.square as string,
                    target: id,
                });
            }

        }
    } {...listeners} {...attributes}></div>;
}

export default Chesspiece;