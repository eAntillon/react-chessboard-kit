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