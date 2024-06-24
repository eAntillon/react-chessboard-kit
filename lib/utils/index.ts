import { Chess, Square } from "chess.js";


export const getRankName = (rank: number) => {
    return String.fromCharCode(97 + (rank));
}

export const fenToBoard = (fen: string) => {
    return fen.split(" ")[0].split('/').map(row => {
        const newRow = [];
        for (let i = 0; i < row.length; i++) {
            const char = row[i];
            if (!isNaN(Number(char))) {
                for (let j = 0; j < Number(char); j++) {
                    newRow.push("");
                }
            } else {
                newRow.push(char);
            }
        }
        return newRow;
    });
}

export const boardToFen = (board: string[][]) => {
    return board.map(row => {
        let newRow = "";
        let emptyCount = 0;
        for (let i = 0; i < row.length; i++) {
            const char = row[i];
            if (char === "") {
                emptyCount++;
            } else {
                if (emptyCount > 0) {
                    newRow += emptyCount;
                    emptyCount = 0;
                }
                newRow += char;
            }
        }
        if (emptyCount > 0) {
            newRow += emptyCount;
        }
        return newRow;
    }).join("/");
}

export const getValidMoves = (board: string, square: string) => {
    const chess = new Chess();
    chess.load(board, {
        skipValidation: true
    });
    const validMoves = chess.moves({ square: square as Square, verbose: true }).map(move => move.to);
    const validMovesObj: { [key: string]: boolean } = {};
    validMoves.forEach(move => {
        validMovesObj[move] = true;
    })
    return validMovesObj;
}


export const reverseBoard = (board: string[][]) => {
    return board?.slice()
        .reverse()
        .map((row) => row.slice().reverse());
}

export const addAnimation = async ({ source, target }: { source: string, target: string }) => {
    const sourceSquare = document.getElementById(source);
    const targetSquare = document.getElementById(target);

    if (sourceSquare && targetSquare) {
        console.log(sourceSquare.offsetLeft, sourceSquare.offsetHeight);
        console.log(targetSquare.offsetLeft, targetSquare.offsetHeight)
        const piece = sourceSquare.querySelector(".chesspiece") as HTMLElement;
        if (piece) {
            const keyframes = `
                0% {
                    transform: translate(0, 0);
                }
                100% {
                    transform: translate(${targetSquare.offsetLeft - sourceSquare.offsetLeft}px, ${targetSquare.offsetTop - sourceSquare.offsetTop}px);
                }
            `
            const animation = document.createElement("style");
            animation.type = "text/css";
            animation.innerHTML = `@keyframes move {${keyframes}}`;
            document.head.appendChild(animation);
            piece.classList.add("moving");
            piece.style.animation = "move 0.2s forwards";
          
            return new Promise<void>((resolve) => {
                setTimeout(() => {
                    resolve();
                }, 200);
            })

        }
    }
}

export const resetAnimation = ({ source, target }: { source: string, target: string }) => {
    const sourceSquare = document.getElementById(source);
    const targetSquare = document.getElementById(target);
    if (sourceSquare && targetSquare) {
        const piece = sourceSquare.querySelector(".chesspiece") as HTMLElement;
        if (piece) {
            piece.classList.remove("moving");
            piece.style.animation = "";
        }
    }
}

export const inCheck = (board: string) => {
    const chess = new Chess();
    chess.load(board, {
        skipValidation: true
    });
    if (chess.inCheck()) {
        return chess.turn() === "w" ? "K" : "k";
    }
    return null;
}