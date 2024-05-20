import '../css/index.css';
import { boardAtom, useBoardListener } from '../store';
import { Chess } from 'chess.js';
import { ChessboardProps } from './Chessboard.types';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { fenToBoard } from '../utils';
import { getRankName } from '../utils';
import { snapCenterToCursor } from '@dnd-kit/modifiers';
import { useAtom, type WritableAtom } from 'jotai'
import { useHydrateAtoms } from 'jotai/utils';
import Chesspiece from './chesspiece';
import React, { useCallback, useEffect } from 'react';
import Square from './square';

interface HydrateAtomsProps {
    initialValues: Iterable<
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        readonly [WritableAtom<unknown, [any], unknown>, unknown]
    >
    children: React.ReactNode;
}

const HydrateAtoms = ({ initialValues, children }: HydrateAtomsProps) => {
    useHydrateAtoms(new Map(initialValues));
    return children;
}

export function Chessboard({
    boardPosition,
    orientation = "white",
    highlightMoves = false,
}: ChessboardProps) {

    // const initialBoardSetup = boardPosition?.split(" ")[0].split('/').map(row => {
    //     const newRow = [];
    //     for (let i = 0; i < row.length; i++) {
    //         const char = row[i];
    //         if (!isNaN(Number(char))) {
    //             for (let j = 0; j < Number(char); j++) {
    //                 newRow.push("");
    //             }
    //         } else {
    //             newRow.push(char);
    //         }
    //     }
    //     return newRow;
    // });
    // const [board, setBoard] = React.useState(orientation === 'white' ? initialBoardSetup : initialBoardSetup?.slice().reverse());

    const [boardState, setBoardState] = useAtom(boardAtom)

    useBoardListener(useCallback(
        (_get, _set, newVal, prevVal) => {
            if (newVal.selectedSquare && newVal.selectedSquare !== prevVal.selectedSquare) {
                console.log(`selected square: ${newVal.selectedSquare}`)
                const chess = new Chess();
                chess.load(boardPosition, {
                    skipValidation: true
                });
                const validMoves = chess.moves({ square: newVal.selectedSquare, verbose: true }).map(move => move.to);
                const validMovesObj: { [key: string]: boolean } = {};
                validMoves.forEach(move => {
                    validMovesObj[move] = true;
                })
                setBoardState({
                    ...boardState,
                    validMoves: validMovesObj
                })
            }
        },
        [boardPosition, boardState, setBoardState],
    ),
    )

    useEffect(() => {
        if (orientation != boardState.orientation) {
            console.log(`from ${boardState.orientation} to ${orientation}`)
            setBoardState({
                ...boardState,
                board: boardState.board.slice().reverse(),
                orientation,
                selectedSquare: null
            })
        }
    }, [boardState, orientation, setBoardState])


    const handleDrop = (event: DragEndEvent) => {
        const { over, active } = event;
        if (!over || !active) return;
        const isSameCell = over.id === active.id;
        if (isSameCell) return;
        const activeId = active.id as string;
        const overId = over.id as string;
        const sourceRow = 8 - Number(activeId[1]);
        const sourceCol = activeId.charCodeAt(0) - 97;
        const targetRow = 8 - Number(overId[1]);
        const targetCol = overId.charCodeAt(0) - 97;
        const newBoard = boardState.board?.map(row => row.slice());
        newBoard[targetRow][targetCol] = newBoard[sourceRow][sourceCol];
        newBoard[sourceRow][sourceCol] = "";
        setBoardState({
            ...boardState,
            board: newBoard,
            turn: boardState.turn === 'w' ? 'b' : 'w',
            selectedSquare: null,
            validMoves: {}
        });
    }

    return (
        <DndContext onDragEnd={handleDrop} modifiers={[snapCenterToCursor]}>
            <HydrateAtoms initialValues={[[boardAtom, {
                board: orientation === 'white' ? fenToBoard(boardPosition) : fenToBoard(boardPosition)?.slice().reverse(),
                orientation,
                selectedPiece: null,
                turn: boardPosition.split(" ")[1],
                highlightMoves
            }]]}>
                <div className="board">
                    {
                        boardState.board?.map((row, i) => (
                            row.map((piece, j) => {
                                const color = (i + j) % 2 === 0 ? 'white' : 'black';
                                const rowNotation = j == 0 ? (orientation === 'black' ? i + 1 : 7 - i + 1) : "";
                                const colNotation = i == 7 ? String.fromCharCode(97 + (orientation === 'black' ? 7 - j : j)) : "";
                                const id = orientation === 'white' ? `${getRankName(j)}${(8 - i)}` : `${getRankName(7 - j)}${(i + 1)}`;
                                return (
                                    <Square key={id} id={id} color={color}
                                        notation={[colNotation, rowNotation.toString()]}
                                    >
                                        {piece && <Chesspiece id={id} type={piece} />}
                                    </Square>
                                );
                            })
                        ))
                    }
                </div>
            </HydrateAtoms>
        </DndContext>
    )


}
