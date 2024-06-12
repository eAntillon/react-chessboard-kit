import "../css/index.css";
import { ChessboardProps } from "./Chessboard.types";
import { useLayoutEffect, useState } from "react";
import { fenToBoard, getRankName } from "../utils";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import Square from "./square";
import Chesspiece from "./chesspiece";
import { Chess } from "chess.js";

export function Chessboard({
    boardPosition,
    orientation,
    showNotation = true,
    onMove,
}: ChessboardProps) {

    const [board, setBoard] = useState<string[][]>([]);
    const [validMoves, setValidMoves] = useState<{ [key: string]: boolean }>({})
    const [selectedSquare, setSelectedSquare] = useState<string>()
    useLayoutEffect(() => {
        if (orientation === "white") {
            setBoard(fenToBoard(boardPosition))
        } else {
            const reverseBoard = fenToBoard(boardPosition)?.slice().reverse().map((row) => row.slice().reverse())
            setBoard(reverseBoard)
        }
    }, [boardPosition, orientation]);


    useLayoutEffect(() => {
        if (selectedSquare) {
            const chess = new Chess();
            chess.load(boardPosition, {
                skipValidation: true
            });
            const validMoves = chess.moves({ square: selectedSquare, verbose: true }).map(move => move.to);
            const validMovesObj: { [key: string]: boolean } = {};
            validMoves.forEach(move => {
                validMovesObj[move] = true;
            })
            console.log({ validMovesObj });
            setValidMoves(validMovesObj);
        } else {
            setValidMoves({});
        }
    }, [selectedSquare, board]);

    const handleDrop = (event: DragEndEvent) => {
        const { over, active } = event;
        if (!over || !active) return;
        const isSameCell = over.id === active.id;
        if (isSameCell) return;
        const activeId = active.id as string;
        const overId = over.id as string;
        dropPiece(activeId, overId);
    };

    const dropPiece = (source: string, target: string) => {
        console.log({ source, target });
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

        // set({
        //     ...boardState,
        //     board: newBoard,
        //     turn: turn === "w" ? "b" : "w",
        //     selectedSquare: null,
        //     validMoves: {},
        // });
        onMove?.({
            from: `${getRankName(sourceCol)}${8 - sourceRow}`,
            to: `${getRankName(targetCol)}${8 - targetRow}`,
        });
    };


    return (
        <DndContext onDragEnd={handleDrop} modifiers={[snapCenterToCursor]}>
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
                                selectedSquare={selectedSquare}
                                setSelectedSquare={setSelectedSquare}
                                validMoves={validMoves}
                            >
                                {piece && <Chesspiece id={id} type={piece} selectedSquare={selectedSquare} setSelectedSquare={setSelectedSquare} />}
                            </Square>
                        );
                    })
                )}
            </div>
        </DndContext>
    );
}
