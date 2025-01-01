function Gameboard() {
    let rows = 3
    let columns = 3
    let board = []

    for (let i = 0; i < rows; i++) {
        board[i] = []
        for (let i = 0; i < columns; i++) {
            board[i].push(Cell());
        }
    }

    getBoard = () => board;

    placeToken = (row, column, player) => {
        if (board[row][column].getValue != 0) return;

        else board[row][column].addToken(player);
    }

    printBoard

    return {getBoard, placeToken, printBoard}
}

function Cell() {
    //value 0: empty, value 1: player 1, value 2: player 2
    let value = 0;

    addToken = (player) => {
        value = player;
    }

    getValue = () => value;

    return {
        addToken,
        getValue
    }
}