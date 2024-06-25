import "../css/index.css";
import {
    BoardState,
    ChessboardProps,
    SelectedSquare,
} from "./Chessboard.types";
import { useLayoutEffect, useMemo, useState } from "react";
import { fenToBoard, getRankName, getValidMoves, inCheck, reverseBoard } from "../utils";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import { snapCenterToCursor } from "@dnd-kit/modifiers";
import Square from "./square";
import Chesspiece from "./chesspiece";
import Promotion from "./promotion";

export function Chessboard({
    boardPosition,
    orientation = "white",
    showNotation = true,
    onMove,
    theme = "default",
}: ChessboardProps) {
    const themeClass = `theme-${theme}`;
    const DEFAULT_BOARD = useMemo(() => (orientation == "white" ? fenToBoard(boardPosition) : reverseBoard(fenToBoard(boardPosition))), [boardPosition, orientation])

    const [boardState, setBoardState] = useState<BoardState>({
        selected: null,
        promotionState: {
            square: "",
            nextMove: { source: "", target: "" },
        },
        validMoves: {},
    });

    const resetBoardState = () => {
        setBoardState({
            selected: null,
            validMoves: {},
            promotionState: {
                square: "",
                nextMove: { source: "", target: "" },
            },
        });
    }

    const isInCheck = inCheck(boardPosition);
    useLayoutEffect(() => {
        if (boardState.selected) {
            setBoardState((prevState) => {
                return {
                    ...prevState,
                    validMoves: getValidMoves(boardPosition, prevState.selected!.square),
                    promotionState: {
                        square: "",
                        nextMove: { source: "", target: "" },
                    },
                }
            })
        } else {
            setBoardState((prevState) => {
                return {
                    ...prevState,
                    validMoves: {},
                    promotionState: {
                        square: "",
                        nextMove: { source: "", target: "" },
                    },
                }
            })
        }
    }, [boardState.selected]);

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
        const isPromotion =
            (boardState.selected?.square[1] === "7" &&
                target[1] === "8" &&
                boardState.selected?.piece === "P") ||
            (boardState.selected?.square[1] === "2" &&
                target[1] === "1" &&
                boardState.selected?.piece === "p");
        if (isPromotion && !promotion && boardState.validMoves[target]) {
            setBoardState({
                ...boardState,
                promotionState: {
                    square: target,
                    nextMove: { source, target },
                    color: boardState.selected?.piece === "P" ? "white" : "black",
                },
            });
            return;
        }

        const sourceRow = 8 - Number(source[1]);
        const sourceCol = source.charCodeAt(0) - 97;
        const targetRow = 8 - Number(target[1]);
        const targetCol = target.charCodeAt(0) - 97;

        if (boardState.validMoves && !boardState.validMoves[target]) {
            return;
        }

        setBoardState({
            ...boardState,
            selected: null,
            validMoves: {},
        });

        onMove?.({
            from: `${getRankName(sourceCol)}${8 - sourceRow}`,
            to: `${getRankName(targetCol)}${8 - targetRow}`,
            promotion,
        });
    };

    return (
        <DndContext onDragEnd={handleDrop} modifiers={[snapCenterToCursor]}>
            <div className={`board ${themeClass}`}>
                {DEFAULT_BOARD.map((row, i) =>
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
                                selected={boardState.selected}
                                validMoves={boardState.validMoves}
                                reset={resetBoardState}
                                inCheck={piece == isInCheck}
                            >
                                {piece && (
                                    <Chesspiece
                                        id={id}
                                        type={piece}
                                        selected={boardState.selected}
                                        setSelected={(square: SelectedSquare) =>
                                            setBoardState({ ...boardState, selected: square })
                                        }
                                    />
                                )}
                            </Square>
                        );
                    })
                )}
            </div>
            <Promotion
                orientation={orientation}
                promotionState={boardState.promotionState}
                resetPromotion={resetBoardState}
                dropPiece={dropPiece}
            />
        </DndContext>
    );
}
