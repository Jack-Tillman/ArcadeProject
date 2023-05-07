/*
Broad pseudocode:
What is the starting state? 
- The starting state is a 3 x 3 grid of clickable, empty cells. 
What is needed for that? 
- Create an object, gameState, to represent the game board itself. 
    - gameState will hold the game board itself, the users playing, and maybe more properties
What is the next state before the game can begin? 
- User is prompted to enter their name 
    - I can use the confirm() method to display a popup that enables user to confirm or deny playing against a computer ; if confirmed, then player2 is named computer and act appropriately 
    - That name is stored in the gameState object 
    - For each user, their name will be displayed along with a "It's [user's] turn" title above game 
- After entering their name, they will be assigned either X or O 
    - In gameState, the user that is in the 0 index will go, potentially randomize which player is put there 
    - function that adds X and O as a value for the players key to the gameState object, but randomly assigns X or O in the 0 index 
- The user will be told which piece they play as. They will be able to see which player's move it is above the game board as well. 

TURNS 
- At the start of the turn, the current player is switched, and their name is displayed on screen so they know whose turn it is  
- When a user clicks a cell, the representation of that cell is filled in within the gameState object as well 
    - before the mark is made, it must be validated. If gameState cell is null, then the move is valid. If not, it is invalid and player isn't able to make that move. Utilize click disabling for this
        -valid moves will replace 'null' with the mark of the current player
        - IF the move will result in either a Win or a draw, the player is notified of that, and the game is ended. 
        - The board itself will be updated to render the mark
- After the move is made, the turn is over and the board should be updated to reflect the changes made during the turn

WIN
If a move results in a win, players are notified of that. 
    - The game will end. Players cannot click on spaces anymore, and will be prompted to play again by a reset button 
    - The reset button can be displayed at all times 
TIE
If a move results in a tie, players are notified 
    - Similar result as a win, except the text will change from "Player X won!" to "It's a draw!"





User Interface components
- Title of game 
- 3 x 3 grid 
    * each cell is clickable 
    * each cell has an indication of which player filled it in (when applicable) 
- Message indicating which player's turn it is 
    * this message box will also display who wins the game 
    * or if no winners, then it will display a tie 
- Restart button
    * This restarts the game by setting the game state back to initial 

Game flow components
- Must keep track of clicks that happen on each cell
    * player is blocked from trying to fill in an already filled cell and nothing happens
- Game state is updated 
- Game state is validated 
    * Check if there is a winner or if there is a draw 
- If above results in neither winner or tie, then change the active player
    * else, stop the game 
- Update the UI to reflect changes to game state
- Repeat until a winner or a tie is reached




**TO DO
- 'null' and 'undefined' check for getUsers() 
- incorporate swapTurn array syntax into swapTurn
- for the first turn, show whose move it is 

*/

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
}

// helper functions 
function versusComputer() { 
    if(confirm( "Would you like to play against a computer? If not, you will play against another person") == true ){
        gameState.versusComputer = true;
    } else {
        gameState.versusComputer = false;
    }
    return gameState;
};

function getUsers() {
    if (gameState.versusComputer === true) {
        const playerOneName = prompt("What is the name of player one?", '');
        gameState.players[0] = playerOneName;
        gameState.players[1] = "Computer";
    } else {
        const playerOneName = prompt("What is the name of player one?", '');
        gameState.players[0] = playerOneName;
        const playerTwoName = prompt("What is the name of player two?", '');
        gameState.players[1] = playerTwoName;
    }
    return gameState;
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

// render
function renderState(cellArray) {
    gameState.board = cellArray;
    return gameState.board;
}

//adds class of current player to clicked cell
function updateBoard(clickedCell, currentClass) {
    clickedCell.classList.add(currentClass);
    return cellArray;
 }

// function computerMove() {
//     if (gameState.players[0] === "Computer"){
//     }
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
//     potentialCells[randomCellIndex].classList.add(gameState.turnOrder[0]);
//     potentialCells.classList.add(gameState.turnorder[0]);
//     potentialCells.style.backgroundColor = backgroundColor;
//     potentialCells.setAttribute("value", gameState.turnorder[0]);
//     const computerValue = document.createTextNode(gameState.turnOrder[0]);
//     potentialCells.appendChild(computerValue);
// }

function turnDisplay() {
const currentTurnContent = `It is ${gameState.players[0]}'s turn!`;
const currentTurnDisplay = document.getElementById('currentTurnDisplay');
currentTurnDisplay.textContent = currentTurnContent;
}

function swapTurn(array, index1, index2) {
    let turnOrder = gameState.turnOrder;
    let players = gameState.players;
    //destructuring to extract both players and turnOrder array from gameState and swap their position
    [turnOrder[0], turnOrder[1]] = [turnOrder[1], turnOrder[0]];
    [players[0], players[1]] = [players[1], players[0]];
    //update the rendered display so players see whose turn it is 
    //move to renderState perhaps
    return gameState;
};


//functions to run
buildInitialState();
//target all elements with "cell" class
const cells = document.getElementsByClassName("cell");
//use spread syntax to create array of cell classList to use for board checking
const cellArray = [...cells];
onBoardClick();

// listeners
  // update state, maybe with another dozen or so helper functions...
/*when user clicks a cell, 
- get current state of board and check if the cell is null or not 
    - additionally, this function can check if the potential mark will result in a win or a tie 
        - if the game is a win or tie, the winner is declared (if win) or tie declared, 
        and user is prompted to reset game
- if it is null, then the mark is made. The board state is updated in gameState as well as on screen 
- if it is not null, then no mark is made. One way to go about this is to utilize pointer and disable clicks
on cells that have the property of filled in 
- after a move is made, and no win or tie declared, then the turns are swapped 
*/

function onBoardClick() {
    for (const cell of cells) {
        //remove any listeners from previous game
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {once: true});
}
}    


function handleClick(e) {
  const currentClass = gameState.turnOrder[0];
  const nextPlayer = gameState.players[1];
  const isMarked = e.target.getAttribute("value");
  const clickedCell = computerCheck() ? computerMove() : e.target;
  if (nextPlayer === "Computer"){
    updateBoard(clickedCell, currentClass);
  } else {
      updateBoard(clickedCell, currentClass);
  }
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

function computerCheck() {
    return gameState.players[0] === "Computer" ? true : false;
}




// Loop through all arrays in WINNING_BOARDS, checking whether each cell has currentClass (X or O)
// if every cell in at least one of the winning arrays has currentClass, then return true
function checkWin(currentClass) {
    // Loop over all winning board combos 
    for (let i = 0; i < WINNING_BOARDS.length; i++) {
        //store each winning combo in boardCheck
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
    for (let i = 0; i < cellArray.length; i++) {
        let cells = cellArray[i];
        if (!cells.classList.contains('X') && !cells.classList.contains('O')) {
            cellsAllMarked = false;
            break;
        }
    }
    return cellsAllMarked;
}


    // return cellArray.every(cells => {
    //     return cells.classList.contains('X') || cells.classList.contains('O');
    // })


// function indexCheck() {
//     if (cells[index].classList.contains(allMarked)){
//         return true;
//     } else {
//         return false;
//     }
// }
// // returns boolean value; true = board is filled in, false = board not fully filled in 
// function boardCheck(indexCheck) { 
// return boardCheck.every(index => { 
//     return cells[index].classList.contains(allMarked);
// })
// }



/*05/05 5:50 pm update:
tired
Done: on click, the cell is given an attribute for which player's turn it is based on the 
value in the 0 index of turnOrder
to do: 
use the attribute of each cell to update the game board, AFTER the attribute is added 
board evaluator function for win / tie 
random function for computer player 
check top to-do for refinements 
reset button 
*/
