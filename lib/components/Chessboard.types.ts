export interface ChessboardProps {
    boardPosition: string;
    orientation?: 'white' | 'black';
    onMove?: (move: string) => void;
    highlightMoves?: boolean;
}

export interface Square {
    piece: string;
    color: string;
    notation?: string[];
    canBeMove?: boolean;
    canBeCapture?: boolean;
}
export interface Board {
    [key: string]: Square;
}