export interface ChessboardProps {
    boardPosition: string;
    orientation?: 'white' | 'black';
    onMove?: (move: string) => void;
    highlightMoves?: boolean;
}