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

function buildInitialState() {
    gameState.versusComputer = [''],
    gameState.players = ['',''],
    gameState.turnOrder = ['',''],
    versusComputer();
    getUsers();
    getFirstTurn();
    turnDisplay();

    for (const cell of cells) {
        cell.removeAttribute("value");
        cell.classList.remove("X");
        cell.classList.remove("O");
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {once: true});
        while (cell.firstChild) {
            cell.removeChild(cell.firstChild);
        }
    }
    resetBtn.addEventListener("click", resetButton);
}


function versusComputer() { 
    if(confirm( "Would you like to play against a computer? If not, you will play against another person") == true ){
        gameState.versusComputer = true;
    } else {
        gameState.versusComputer = false;
    }
    return gameState;
};

function getUsers() {
    let playerOneName = null;
    let playerTwoName = null;
    
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
    return gameState;
};

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


function updateBoard(clickedCell, currentClass) {
    clickedCell.classList.add(currentClass);
    return cellArray;
 }

function swapTurn(array, index1, index2) {
    let turnOrder = gameState.turnOrder;
    let players = gameState.players;

    [turnOrder[0], turnOrder[1]] = [turnOrder[1], turnOrder[0]];
    [players[0], players[1]] = [players[1], players[0]];
    return gameState;
};

function turnDisplay() {
    const currentTurnContent = `It is ${gameState.players[0]}'s turn!`;
    const currentTurnDisplay = document.getElementById('currentTurnDisplay');
    currentTurnDisplay.textContent = currentTurnContent;
}


const cells = document.getElementsByClassName("cell");
const resetBtn = document.getElementById('reset-button');
const cellArray = [...cells];
buildInitialState();

function resetButton() {
    let resetConfirmation = confirm("Are you sure you want to restart the game?", '');
    if (resetConfirmation) {
        buildInitialState();
    }
};


//current attempt at computer play is that I check to see if the next player will be Computer; if so, pass computerMove
function handleClick(e) {
  const currentClass = gameState.turnOrder[0];
//   const currentPlayer = gameState.players[0];
  const isMarked = e.target.getAttribute("value");
  const clickedCell = e.target;
//   const clickedCell = computerCheck() ? computerMove() : e.target;
//   if (currentPlayer === "Computer"){
//     updateBoard(computerMove(), currentClass);
//   } else {
//       updateBoard(clickedCell, currentClass);
//   }

  updateBoard(clickedCell,currentClass);
  renderState(cellArray);
  
  if (checkWin(currentClass)) {
    //if the next move will result in a player winning, pass false into endGame to avoid draw condition
    endGame(false);
  } else if (isDraw()) {
    //if next move results in a draw, pass true through endGame() to attain draw condition
    endGame(true);
  } else {
    //if the next move will neither draw nor cause a win, then the mark can be made, and turn is swapped
    if (!isMarked) {
      markCell(clickedCell, currentClass);
      swapTurn(gameState.turnOrder, 0, 1);
      turnDisplay();
    //   computerMove();
    //   swapTurn(gameState.turnOrder, 0, 1);
    //   turnDisplay();
    //   turnDisplay();
    //   swapTurn(gameState.turnOrder, 0, 1);
    } else {
      alert("You can't do that!");
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

function computerCheck() {
    return gameState.players[0] === "Computer" ? true : false;
}

function checkWin(currentClass) {
    // Loop over all winning board combos 
    for (let i = 0; i < WINNING_BOARDS.length; i++) {
        //boardCheck = every winning board
        const boardCheck = WINNING_BOARDS[i];
        // Loop over every index in the current winning board
        let allIndexesMatch = true;
        for (let j = 0; j < boardCheck.length; j++) {
            let index = boardCheck[j];
            // Check if the cell at the current index has the current class
            if (!cells[index].classList.contains(currentClass)) {
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
        alert("Draw!");
        //**update winningMessage page to indicate it's a draw
        
    } else {
        alert(`${gameState.players[0]} won!`);//update winningMessage page to reflect who won 
    }
    //**add class of 'show' to winningMessage
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

function computerMove(currentClass) {
    let potentialCells= [];
    for (let i = 0; i < cells.length; i++) {
        let currentCell = cells[i];
        if (currentCell.classList.contains("X") || currentCell.classList.contains("O")) {
            continue;
        }else {
            potentialCells.unshift(currentCell);
        }
    }
    console.log(potentialCells);
    
    const randomCellIndex = Math.floor(Math.random() * potentialCells.length);
    const randomlyChosenCell = potentialCells[randomCellIndex];
    const computerValue = document.createTextNode(gameState.turnOrder[0]);
    randomlyChosenCell.classList.add(gameState.turnOrder[0]);
    randomlyChosenCell.setAttribute("value", currentClass);
    randomlyChosenCell.appendChild(computerValue);
}
// function computerMark(currentClass) {
//     currentClass = gameState.turnOrder[0];
//     let potentialCells= [];
//     for (let i = 0; i < cells.length; i++) {
//         let currentCell = cells[i];
//         if (currentCell.classList.contains("X") || currentCell.classList.contains("O")) {
//             continue;
//         }else {
//             potentialCells.unshift(currentCell);
//         }
//     }
//     console.log(potentialCells);
//     const randomCellIndex = Math.floor(Math.random() * potentialCells.length);
//    clickedCell = potentialCells[randomCellIndex].classList.add(currentClass);
//     return clickedCell;
// }