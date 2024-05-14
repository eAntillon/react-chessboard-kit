import '../css/index.css';
import { DndContext, DragEndEvent } from '@dnd-kit/core';
import { initialBoardSetup } from '../constants';
import Chesspiece from './Chesspiece';
import React from 'react';
import Square from './Square';
export function Chessboard() {
    const [board, setBoard] = React.useState(initialBoardSetup);

    const handleDrop = (event: DragEndEvent) => {
        const { over, active } = event;
        if (!over || !active) return;
        const isSameCell = over.id === active.id;
        if (isSameCell) return;
        const [sourceRow, sourceCol] = String(active.id).split('-').map(Number);
        const [targetRow, targetCol] = String(over.id).split('-').map(Number);
        console.log({ active, over, sourceRow, sourceCol, targetRow, targetCol })
        const newBoard = board.map(row => row.slice());
        newBoard[targetRow][targetCol] = newBoard[sourceRow][sourceCol];
        newBoard[sourceRow][sourceCol] = "";
        setBoard(newBoard);
    }

    return (
        <DndContext onDragEnd={handleDrop}>
            <div className="board">
                {
                    board.map((row, i) => (
                        row.map((piece, j) => {
                            const color = (i + j) % 2 === 0 ? 'white' : 'black';
                            return (
                                <Square key={`${i}-${j}`} id={`${i}-${j}`} color={color}>
                                    {piece && <Chesspiece id={`${i}-${j}`} type={piece} />}
                                </Square>
                            );
                        })
                    ))
                }
            </div>
        </DndContext>
    )


}
