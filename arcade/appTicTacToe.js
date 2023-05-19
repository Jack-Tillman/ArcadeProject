'use strict';
// state
const gameState = {};

const WINNING_BOARDS = [
    //horizontal row wins *NOTE: abide by 0 index because this is an array
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //vertical column wins
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //diagonal wins
    [0, 4, 8],
    [2, 4, 6]
]

let playerOneName = null;
let playerTwoName = null;

const cells = document.getElementsByClassName("cell");
const gameoverMessageElement = document.getElementById("gameoverMessage");
const gameoverMessageTextElement = document.getElementById("gameover-message-text");
const resetBtn = document.getElementById('reset-button');
const cellArray = [...cells];
buildInitialState();

function buildInitialState() {
    gameState.versusComputer = [''],
    gameState.players = ['',''],
    gameState.turnOrder = ['',''],
    nameReset();
    versusComputer();
    getUsers();
    getFirstTurn();
    turnDisplay();

    for (const cell of cells) {
        //remove any value attributes, text nodes, and listeners from previous game
        cell.removeAttribute("value");
        cell.classList.remove("X");
        cell.classList.remove("O");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {once: true});
        while (cell.firstChild) {
            cell.removeChild(cell.firstChild);
        }
    }
    resetBtn.addEventListener("click", buildInitialState);
    gameoverMessageElement.classList.remove('show')
    gameoverMessageTextElement.textContent = '';
}

// helper functions 
function nameReset() {
    playerOneName = null;
    playerTwoName = null;
};

function versusComputer() { 
    if(confirm( "Would you like to play against a computer? If not, you will play against another person") == true ){
        gameState.versusComputer = true;
        playerTwoName = "Computer";
    } else {
        gameState.versusComputer = false;
    }
};

function getUsers() {
    if (gameState.versusComputer) {
        while (playerOneName === null || !isNaN(playerOneName)) {
            playerOneName = prompt("What is the name of player one?", '');

            if(playerOneName === null || !isNaN(playerOneName)) {
                alert("Invalid name, try using another name!")
            } else {
                gameState.players[0] = playerOneName;
                gameState.players[1] = "Computer";
            }
        }
    } else {
        while (playerOneName === null || !isNaN(playerOneName)) {
            playerOneName = prompt("What is the name of player one?", '');

            if(playerOneName === null || !isNaN(playerOneName)) {
                alert("Invalid name, try using another name!")
            } else {
                gameState.players[0] = playerOneName;
            }
        
        while (playerTwoName === null || !isNaN(playerTwoName)) {
            playerTwoName = prompt("What is the name of player two?", '');

            if(playerTwoName === null || !isNaN(playerTwoName)) {
                alert("Invalid name, try using another name!")
            } else {
                gameState.players[1] = playerTwoName;
            }
        }
        }
    }
};

//randomize the order of who takes first turn
function getFirstTurn() {
    if (gameState.versusComputer === true) {
        gameState.turnOrder = ['X', 'O'];
        alert(`${gameState.players[0]} will play X, ${gameState.players[1]} will play O.`);
    }else {
    const randomOrder = Math.floor(Math.random() * 100);
    if (randomOrder > 50){
        gameState.turnOrder = ['X', 'O'];
        alert(`${gameState.players[0]} will play X, ${gameState.players[1]} will play O.`);
    } else {
        gameState.turnOrder = ['O', 'X'];
        alert(`${gameState.players[0]} will play O, ${gameState.players[1]} will play X.`);
    }
    }
    return gameState.turnOrder;
};

function renderState(cellArray) {
    gameState.board = cellArray;
    return gameState.board;
}

//adds class of current player to clicked cell
function updateBoard(clickedCell, currentClass) {
    clickedCell.classList.add(currentClass);
    return cellArray;
 }

function swapTurn(array, index1, index2) {
    let turnOrder = gameState.turnOrder;
    let players = gameState.players;
    //destructuring to extract both players and turnOrder array from gameState and swap their position
    [turnOrder[0], turnOrder[1]] = [turnOrder[1], turnOrder[0]];
    [players[0], players[1]] = [players[1], players[0]];
    //update the rendered display so players see whose turn it is 
    return gameState;
};

function turnDisplay() {
    const currentTurnContent = `It is ${gameState.players[0]}'s turn!`;
    const currentTurnDisplay = document.getElementById('currentTurnDisplay');
    currentTurnDisplay.textContent = currentTurnContent;
    const playerOneDisplay = document.getElementById('player-one-display');
    playerOneDisplay.textContent = `Player 1: ${playerOneName}`;
    const playerTwoDisplay = document.getElementById('player-two-display');
    playerTwoDisplay.textContent = `Player 2: ${playerTwoName}`;
}

function handleClick(e) {
  const currentClass = gameState.turnOrder[0];
  const isMarked = e.target.getAttribute("value");
  const clickedCell = e.target;
  updateBoard(clickedCell,currentClass);
  renderState(cellArray);
  if (checkWin(currentClass)) {
    //if the next move will result in a player winning, pass false into endGame to avoid draw condition
    markCell(clickedCell, currentClass);
    endGame(false);
  } else if (isDraw()) {
    //if next move results in a draw, pass true through endGame() to attain draw condition
    markCell(clickedCell, currentClass);
    endGame(true);
  } else {
    //if the next move will neither draw nor cause a win, then the mark can be made, and turn is swapped
    if (isMarked) {
      alert("You can't do that!");
    } else {
      setTimeout(markCell(clickedCell, currentClass), 1000);
      swapTurn(gameState.turnOrder, 0, 1);
      turnDisplay();
      computerCheck();
    }
  }
};

//marks a cell based on which cell was clicked and the class of the player clicking 
function markCell(clickedCell, currentClass) {
  const newValue = document.createTextNode(currentClass);
  const classToAdd = `${currentClass}`;
    //add current class of player and set attribute to same value so gameState.board can be updated to mirror the game state
  clickedCell.classList.add(classToAdd);
  clickedCell.setAttribute("value", currentClass);
  clickedCell.appendChild(newValue);
};

// Loop through all arrays in WINNING_BOARDS, checking whether each cell has currentClass (X or O)
// if every cell in at least one of the winning arrays has currentClass, then return true
function checkWin(currentClass) {
    // Loop over all winning board combos 
    for (const boardCheck of WINNING_BOARDS) {
        // Loop over every index in the current winning board
        let allIndexesMatch = true;
        //loop over every index in the current potential 3 cell winning combo (nested array within the primary board array)
        for (const index of boardCheck) {
            // Check if the cell at the current index has the current class
            if (!cells[index].classList.contains(currentClass)) {
                //if cells don't all match, return false to be passed in handleClick() and break outta there
                allIndexesMatch = false;
                break;
            }
        }
        if (allIndexesMatch) {
            return true;
        }
    }
    // return false if none of the WINNING_BOARD combos have currentClass as a class for all 3 cells in the combo
    return false;
}

function endGame(draw) {
    if (draw) {
        gameoverMessageTextElement.textContent = `It's a draw!`;
    } else {
        gameoverMessageTextElement.textContent = `${gameState.players[0]} won!`;
    }
    gameoverMessageElement.classList.add('show')
    for (const cell of cells) {
        cell.removeEventListener("click", handleClick);
    }
}

function isDraw() {
    let cellsAllMarked = true;
    for (const cells of cellArray) {
        if (!cells.classList.contains('X') && !cells.classList.contains('O')) {
            cellsAllMarked = false;
            break;
        }
    }
    return cellsAllMarked;
}

function computerCheck() {
    if (gameState.players[0] === "Computer" && gameState.versusComputer === true) {
        setTimeout(() => {computerMove(gameState.turnOrder[0]);}, 1000);
    }
}

//simulate an automated click on a random cell based on an array of all cells that are not clicked yet 
function computerMove(currentClass) {
    let potentialCells = [];
    for (let currentCell of cells) {
        if (currentCell.classList.contains("X") || currentCell.classList.contains("O")) {
            continue;
        }else {
            potentialCells.unshift(currentCell);
        }
    }
    const randomCellIndex = Math.floor(Math.random() * potentialCells.length);
    const randomlyChosenCell = potentialCells[randomCellIndex];
    const computerValue = document.createTextNode(currentClass);
    updateBoard(randomlyChosenCell,currentClass);
    renderState(cellArray);
    
    if (checkWin(currentClass)) {
        //if the next move will result in a player winning, pass false into endGame to avoid draw condition
        computerMark(randomlyChosenCell, currentClass, computerValue);
        endGame(false);
    } else if (isDraw()) {
        //if next move results in a draw, pass true through endGame() to attain draw condition
        computerMark(randomlyChosenCell, currentClass, computerValue);
        endGame(true);
    } else {
        computerMark(randomlyChosenCell, currentClass, computerValue);
        swapTurn(gameState.turnOrder, 0, 1);
        turnDisplay();
    }
};

function computerMark(randomlyChosenCell, currentClass, computerValue) {
    const classToAdd = `${currentClass}`;
    randomlyChosenCell.classList.add(classToAdd);
    randomlyChosenCell.setAttribute("value", currentClass);
    randomlyChosenCell.appendChild(computerValue);
};