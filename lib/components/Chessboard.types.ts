export interface ChessboardProps {
  boardPosition: string;
  highlightMoves?: boolean;
  onMove?: (move: { from: string; to: string; promotion?: string }) => void;
  orientation?: "white" | "black";
  showNotation?: boolean;
  theme?: string;
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

export interface PromotionState {
  square: string;
  nextMove: Move;
  color?: "white" | "black";
}

export interface BoardState {
  validMoves: { [key: string]: boolean };
  selected: SelectedSquare | null;
  promotionState: PromotionState;
}
