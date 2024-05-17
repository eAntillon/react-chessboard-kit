import { atom } from 'jotai'

export interface BoardState {
    board : string[][]
    selectedPiece: string | null
    turn: 'w' | 'b'
    higlihtMoves?: boolean
    orientation: "white" | "black"
}

export const boardAtom = atom<BoardState>(
    {
        board: [] as string[][],
        selectedPiece: null,
        turn: "w",
        higlihtMoves: false,
        orientation: "white"
    }
)
