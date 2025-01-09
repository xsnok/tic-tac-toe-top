function allElementsSame(array) {
    return array.every(value => value === array[0]);
};

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

    getBoardWithCellValues = () => {
        return board.map((row) => row.map((cell) => cell.getValue()));
    };

    printBoard = () => {
        console.log(getBoardWithCellValues());
    };

    return {getBoard, placeToken, getBoardWithCellValues, printBoard};
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


function GameController(playerOneName = "Player One", playerTwoName = "Player Two") {
    board = Gameboard();

    const players = [
        {name: playerOneName, token: 1},
        {name: playerTwoName, token: 2}
    ]

    let activePlayer = players[0]
    
    switchActivePlayer = () => {
        if (activePlayer === players[0]) {
            activePlayer = players[1];
        }
        else {
            activePlayer = players[0];
        }
        console.log(`It's ${activePlayer.name}'s turn`);
    };

    getActivePlayer = () => activePlayer;

    printNewRound = () => {
        board.printBoard();
    };
    
    userTokenPlacement = () => {
        let userRow = prompt(`${activePlayer.name}, what row do you want to place your token?`);
        let userColumn = prompt(`${activePlayer.name}, what column do you want to place your token?`);

        playRound(userRow, userColumn);
    };

    //Function returns token of winner
    checkWinConditions = (board) => {
        const boardWithCellValues = board.getBoardWithCellValues();
        //Checks for 3 in a column
        outerLoop: for (let i = 0; i < 3; i++) {

            let temp = boardWithCellValues[0][i];
            if (temp === 0) break;

            for (let j = 1; j < 3; j++) {
                if (boardWithCellValues[j][i] !== temp) break outerLoop;
            }
            return temp;
        }

        //Check for 3 in a row
        for (let i = 0; i < 3; i++) {
            if (allElementsSame(boardWithCellValues[i]) && boardWithCellValues[i][0] !== 0) {
                return boardWithCellValues[i][0];
            }
        }
        
        //Check for diagonal
        if (boardWithCellValues[0][0] === boardWithCellValues[1][1] && boardWithCellValues[1][1] === boardWithCellValues[2][2] && boardWithCellValues[0][0] !== 0) {
            return boardWithCellValues[0][0];
        }

        if (boardWithCellValues[0][2] === boardWithCellValues[1][1] && boardWithCellValues[1][1] === boardWithCellValues[2][0] && boardWithCellValues[0][0] !== 0) {
            return boardWithCellValues[0][2];
        }
        return 0;
    };

    playRound = (row, column) => {
        while (true) {
            const boardWithCellValues = board.getBoardWithCellValues();
            if (boardWithCellValues[row][column] === 0) {
                break;
            }
            else {
                return;
            }
        }
        console.log(`Placing ${activePlayer.token} into (${row}, ${column})`);
        board.placeToken(row, column, activePlayer.token);

        printNewRound();
        if (checkWinConditions(board) !== 0) {
            console.log(`Player ${checkWinConditions(board)} has won!`)
            return;
        }
        switchActivePlayer();
    };

    return {getActivePlayer, playRound};
}


function ScreenController() {
    board = Gameboard();
    game = GameController();

    updateBoard = () => {
        const boardWithCellValues = board.getBoardWithCellValues();
        let k = 1;
        console.log(boardWithCellValues)

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                let box = document.querySelector(`#board-box-${k}`);
                box.textContent = boardWithCellValues[i][j];

                if (boardWithCellValues[i][j] === 0) {
                    box.textContent = "";
                }
                else if (boardWithCellValues[i][j] === 1) {
                    box.textContent = "X";
                }
                else {
                    box.textContent = "O";
                }

                k++;
            }
        }
    };

    updateTurnHeadline = () => {
        const headline = document.querySelector(".player-turn-headline");
        const currentPlayer = game.getActivePlayer();
        headline.textContent = `It's Player ${currentPlayer.token}'s turn`;
    };

    updateScreen = () => {
        updateBoard();
        updateTurnHeadline();
    };

    clickHandlerBoard = () => {
        const boxes = document.querySelectorAll(".board-box");

        boxes.forEach(box => {
            box.addEventListener("click", () => {
                playRound(box.parentElement.dataset.row, box.dataset.column)
                updateScreen();
            });
        });
    };

    createWinScreen = (playerNum) => {
        const cardContainer = document.querySelector(".card-container");
        const playerHeadline = document.querySelector(".player-turn-headline");
        const playAgainButton = document.createElement("button")

        playerHeadline.textContent = `Player ${playerNum} won!`;
        playAgainButton.textContent = "Play again?"
        playAgainButton.addEventListener("click", function(){
            //TODO: new game function
        });

        cardContainer.appendChild(playAgainButton);
    }

    updateScreen();
    clickHandlerBoard();

    return {}
}

//TODO: Create win screen
//TODO: Create play again button

let screen = new ScreenController();