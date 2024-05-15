import { atom } from 'jotai'

export interface BoardState {
    selectedPiece: string | null
    turn: 'w' | 'b'
    higlihtMoves?: boolean
}

export const boardAtom = atom<BoardState>(
    {
        selectedPiece: null,
        turn: "w",
        higlihtMoves: false
    }
)
