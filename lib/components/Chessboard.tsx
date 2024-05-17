import '../css/index.css';
import {  boardAtom, useBoardListener } from '../store';
import { ChessboardProps } from './Chessboard.types';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { useHydrateAtoms } from 'jotai/utils';
import Chesspiece from './chesspiece';
import React, { useCallback, useEffect } from 'react';
import Square from './square';
import {  useAtom, type WritableAtom } from 'jotai'
import { fenToBoard } from '../utils';
import { snapCenterToCursor } from '@dnd-kit/modifiers';



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
        (get, set, newVal, prevVal) => {
          // Every time `countAtom`'s value is set, we check if its new value
          console.log("update selected", newVal.selectedSquare)
        },
        [],
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
    }, [orientation])


    const handleDrop = (event: DragEndEvent) => {
        const { over, active } = event;
        if (!over || !active) return;
        const isSameCell = over.id === active.id;
        if (isSameCell) return;
        const [sourceRow, sourceCol] = String(active.id).split('-').map(Number);
        const [targetRow, targetCol] = String(over.id).split('-').map(Number);
        console.log({ active, over, sourceRow, sourceCol, targetRow, targetCol })
        const newBoard = boardState.board?.map(row => row.slice());
        newBoard[targetRow][targetCol] = newBoard[sourceRow][sourceCol];
        newBoard[sourceRow][sourceCol] = "";
        setBoardState({
            ...boardState,
            board: newBoard,
            turn: boardState.turn === 'w' ? 'b' : 'w'
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
                                // const color = ((i + j) % 2 === 0 ? 'white' : 'black') === (orientation === 'black' ? 'white' : 'black') ? 'white' : 'black';
                                const color = (i + j) % 2 === 0 ? 'white' : 'black';
                                const rowNotation = j == 0 ? (orientation === 'black' ? i + 1 : 7 - i + 1) : "";
                                const colNotation = i == 7 ? String.fromCharCode(97 + (orientation === 'black' ? 7 - j : j)) : "";
                                return (
                                    <Square key={`${i}-${j}`} id={`${i}-${j}`} color={color}
                                        notation={[colNotation, rowNotation.toString()]}
                                    >
                                        {piece && <Chesspiece id={`${i}-${j}`} type={piece} />}
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
