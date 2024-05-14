export function mapPiece(piece: string) {
    switch (piece) {
        case 'r':
            return 'rook';
        case 'n':
            return 'knight';
        case 'b':
            return 'bishop';
        case 'q':
            return 'queen';
        case 'k':
            return 'king';
        case 'p':
            return 'pawn';
        case 'R':
            return 'rook';
        case 'N':
            return 'knight';
        case 'B':
            return 'bishop';
        case 'Q':
            return 'queen';
        case 'K':
            return 'king';
        case 'P':
            return 'pawn';
        default:
            return '';
    }
}