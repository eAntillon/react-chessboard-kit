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

export interface Move {
  source: string;
  target: string;
  promotion?: string;
}

export interface PromotionState extends SelectedSquare {
  nextMove: Move;
  color?: "white" | "black";
}

