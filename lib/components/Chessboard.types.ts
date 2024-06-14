export interface ChessboardProps {
  boardPosition: string;
  highlightMoves?: boolean;
  onMove?: (move: { from: string; to: string; promotion?: string }) => void;
  orientation?: "white" | "black";
  showNotation?: boolean;
}

export interface SelectedSquare {
  square: string;
  piece: string;
}

