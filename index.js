function Gameboard() {
    let rows = 3
    let columns = 3
    let board = []

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    }

    getBoard = () => board;

    placeToken = (row, column, player) => {
        if (board[row][column].getValue() != 0) return;

        else board[row][column].addToken(player);
    };

    printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    };

    return {getBoard, placeToken, printBoard};
}

function Cell() {
    //value 0: empty, value 1: player 1, value 2: player 2
    let value = 0;

    addToken = (player) => {
        value = player;
    };

    getValue = () => value;

    return {addToken, getValue};
}


function GameControler(playerOneName = "Player One", playerTwoName = "Player Two") {
    board = Gameboard();

    const players = [
        {name: playerOneName, token: 1},
        {name: playerTwoName, token: 2}
    ]

    let activePlayer = players[0]
    
    switchActivePlayer = () => {
        if (activePlayer = players[0]) {
            activePlayer = players[1];
        }
        else {
            activePlayer = players[0];
        }
    };

    getActivePlayer = () => activePlayer;

    printNewRound = () => {
        board.printBoard();

        console.log(`It's ${activePlayer.name}'s turn`);
        userTokenPlacement();
    };

    playRound = (row, column) => {
        console.log(`Placing ${activePlayer.token} into (${row}, ${column})`);
        board.placeToken(row, column, activePlayer.token);

        switchActivePlayer();
        printNewRound();
    };
    
    userTokenPlacement = () => {
        let userRow = prompt(`${activePlayer.name}, what row do you want to place your token?`);
        let userColumn = prompt(`${activePlayer.name}, what column do you want to place your token?`);

        playRound(userRow, userColumn);
    };

    //TODO: Add win conditions

    userTokenPlacement();

    return {getActivePlayer};
}

let game = new GameControler();