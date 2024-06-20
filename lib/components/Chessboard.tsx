import "../css/index.css";
import { ChessboardProps, PromotionState, SelectedSquare } from "./Chessboard.types";
import { useLayoutEffect, useState } from "react";
import { fenToBoard, getRankName } from "../utils";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import Square from "./square";
import Chesspiece from "./chesspiece";
import { Chess } from "chess.js";
import Promotion from "./promotion";

export function Chessboard({
    boardPosition,
    orientation,
    showNotation = true,
    onMove,
}: ChessboardProps) {

    const [board, setBoard] = useState<string[][]>([]);
    const [validMoves, setValidMoves] = useState<{ [key: string]: boolean }>({})
    const [selected, setSelected] = useState<SelectedSquare>()
    const [promotionState, setPromotionState] = useState<PromotionState>(
        {
            square: "", piece: "", nextMove: {
                source: "",
                target: "",
            },
        }
    )


    useLayoutEffect(() => {
        if (orientation === "white") {
            setBoard(fenToBoard(boardPosition))
        } else {
            const reverseBoard = fenToBoard(boardPosition)?.slice().reverse().map((row) => row.slice().reverse())
            setBoard(reverseBoard)
        }
    }, [boardPosition, orientation]);


    useLayoutEffect(() => {
        setPromotionState({ square: "", piece: "", nextMove: { source: "", target: "" } })
        if (selected) {
            const chess = new Chess();
            chess.load(boardPosition, {
                skipValidation: true
            });
            const validMoves = chess.moves({ square: selected.square, verbose: true }).map(move => move.to);
            const validMovesObj: { [key: string]: boolean } = {};
            validMoves.forEach(move => {
                validMovesObj[move] = true;
            })
            setValidMoves(validMovesObj);
        } else {
            setValidMoves({});
        }
    }, [selected, board]);

    const handleDrop = (event: DragEndEvent) => {
        const { over, active } = event;
        if (!over || !active) return;
        const isSameCell = over.id === active.id;
        if (isSameCell) return;
        const activeId = active.id as string;
        const overId = over.id as string;


        dropPiece(activeId, overId);
    };

    const dropPiece = (source: string, target: string, promotion = "") => {
        const isPromotion = selected?.square[1] === "7" && target[1] === "8" && selected?.piece === "P" || selected?.square[1] === "2" && target[1] === "1" && selected?.piece === "p";
        if (isPromotion && !promotion) {
            setPromotionState({ square: target, piece: selected?.piece, nextMove: { source, target }, color: selected?.piece === "P" ? "white" : "black" });
            return;
        }

        const sourceRow = 8 - Number(source[1]);
        const sourceCol = source.charCodeAt(0) - 97;
        const targetRow = 8 - Number(target[1]);
        const targetCol = target.charCodeAt(0) - 97;

        if (validMoves && !validMoves[target]) {
            return;
        }

        const newBoard = board?.map((row) => row.slice());
        newBoard[targetRow][targetCol] = newBoard[sourceRow][sourceCol];
        newBoard[sourceRow][sourceCol] = "";

        setBoard(newBoard);
        setSelected(undefined);
        setValidMoves({});

        onMove?.({
            from: `${getRankName(sourceCol)}${8 - sourceRow}`,
            to: `${getRankName(targetCol)}${8 - targetRow}`,
            promotion
        });
    };


    const reset = () => {
        setSelected(undefined);
        setValidMoves({});
    }

    return (
        <DndContext onDragEnd={handleDrop} modifiers={[snapCenterToCursor]} >
            <div className="board">
                {board?.map((row, i) =>
                    row.map((piece, j) => {
                        const color = (i + j) % 2 === 0 ? "white" : "black";
                        const rowNotation =
                            j == 0 ? (orientation === "black" ? i + 1 : 7 - i + 1) : "";
                        const colNotation =
                            i == 7
                                ? String.fromCharCode(
                                    97 + (orientation === "black" ? 7 - j : j)
                                )
                                : "";
                        const id =
                            orientation === "white"
                                ? `${getRankName(j)}${8 - i}`
                                : `${getRankName(7 - j)}${i + 1}`;
                        return (
                            <Square
                                key={id}
                                id={id}
                                color={color}
                                notation={
                                    showNotation
                                        ? [colNotation, rowNotation.toString()]
                                        : undefined
                                }
                                dropPiece={dropPiece}
                                selected={selected}
                                setSelected={setSelected}
                                validMoves={validMoves}
                                reset={reset}
                            >
                                {piece && <Chesspiece id={id} type={piece} selected={selected} setSelected={setSelected} />}
                            </Square>
                        );
                    })
                )}
            </div>
            <Promotion promotionState={promotionState} dropPiece={dropPiece} />
        </DndContext>
    );
}
