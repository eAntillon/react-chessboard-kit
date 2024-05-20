

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