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
- incorporate swapTurn array syntax into handleTurn
- for the first turn, show whose move it is 

*/

'use strict';

// state
let gameState = {};

function buildInitialState() {
    gameState.isComputer = [''],
    gameState.players = ['',''],
    gameState.turnOrder = ['',''],
    gameState.board = [
        [null, null, null],
        [null, null, null],
        [null, null, null],
        ];
    isComputer();
    getUsers();
    getFirstTurn();
}

// render
function renderState() {
}


// helper functions 
function isComputer() { 
    if(confirm("Would you like to play against a computer? If not, you will play against another person") == true){
        gameState.isComputer = true;
    } else {
        gameState.isComputer = false;
    }
}

function getUsers() {
    const playerOneName = prompt("What is the name of player one?", '');
    gameState.players[0] = playerOneName;
    const playerTwoName = prompt("What is the name of player two?", '');
    gameState.players[1] = playerTwoName;
    console.log(playerOneName, playerTwoName, isComputer);
    console.log(gameState);
    return gameState;
};

//randomize the order of who takes first turn
function getFirstTurn() {
    const randomOrder = Math.floor(Math.random() * 100);
    console.log(randomOrder);
    if (randomOrder > 50){
        gameState.turnOrder = ['X', 'O'];
        alert(`${gameState.players[0]} will play X, ${gameState.players[1]} will play O.`);
        console.log(gameState.players);
    } else {
        gameState.turnOrder = ['O', 'X'];
        alert(`${gameState.players[0]} will play O, ${gameState.players[1]} will play X.`);
    }
};


// both handleTurn and swapTurn do same thing ( i know handleturn works, try swapTurn) -- consider adding these as method of another function maybe
// switch place of X and O each turn 
function handleTurn() {
    const currentTurn = document.getElementById('currentTurn');
    //temporary variables to hold the initial player names and index
    const tempOne = gameState.players[0];
    const tempTwo = gameState.players[1];
    const turnContent = document.createTextNode(`It is ${gameState.players[1]}'s turn!`);
    currentTurn.appendChild(turnContent);
    if (gameState.turnOrder[0] == 'O') {
        gameState.turnOrder[0] = 'X';
        gameState.turnOrder[1] = 'O';
    } else {
    gameState.turnOrder[0] = 'O';
    gameState.turnOrder[1] = 'X';
    }
    gameState.players[0] = tempTwo;
    gameState.players[1] = tempOne;

  if (currentTurn.hasChildNodes()) {
   currentTurn.textContent = (`It is ${gameState.players[0]}'s turn!`);
    }
    return gameState;
};

// function addMark() {
//     const newMark = document.createElement("span");
//     const markContent = document.createTextNode("Marked");
//     newMark.appendChild(markContent);
//     const
// }
// cells.addEventListener('click', makeMark());
//     cells.backgroundColor = "red"

// }



// const board = document.getElementById('board');
// board.addEventListener('click', onBoardClick); 

//to update whose turn it is, 
// const currentTurn = document.getElementById('currentTurn');
// currentTurn.addEventListener




//functions to run
buildInitialState();

onBoardClick();
// const swapTurn = (array, index1, index2) => {
//     [gameState.turnOrder[0], gameState.turnOrder[1]] = [gameState.turnOrder[1], gameState.turnOrder[0]];
// };
// swapTurn(gameState.turnOrder, 0, 1);

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
    const cells = document.getElementsByClassName("cell");
  // big for loop, refactor and refine later
  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", onClick);
    cells[i].addEventListener('click', updateBoard)
  }
}    
function onClick(event) {
  const newX = document.createTextNode("X");
  const newO = document.createTextNode("O");
  const isMarked = event.target.getAttribute("value");

  if (gameState.turnOrder[0] == "X") {
    if (isMarked == null || isMarked == undefined) {
      event.target.classList.add("marked", "X");
      event.target.style.backgroundColor = "salmon";
      event.target.setAttribute("value", "X");
      handleTurn();
      event.target.appendChild(newX);
      console.log(
        `The value of this cell is: ${event.target.getAttribute("value")}!`
      );
    } else {
      alert("You can't do that!");
    }
  } else if (isMarked == null || isMarked == undefined) {
    event.target.classList.add("marked", "O");
    event.target.style.backgroundColor = "green";
    handleTurn();
    event.target.setAttribute("value", "O");
    event.target.appendChild(newO);
    console.log(
      `The value of this cell is: ${event.target.getAttribute("value")}!`
    );
  } else {
    alert("You can't do that!");
  }
}
function updateBoard(event) {
    for (let i = 0; i < gameState.board.length; i++) {
        for (let j = 0; j < gameState.board[i].length; j++ ){
            if (gameState.board[i][j] = null) {
                gameState.board[i][j].unshift("changed");
            }
        }
    }
//   for (let j = 0; j < gameState.board.length; j++) {
//       let boardCell = gameState.board[j];
//       boardCell[j] = event.target.getAttribute("value");
//       console.log(boardCell[j]);
//   }
  
}
 //end of big ol' for loop, remember to refine this later!
  

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





























/*-_-_-_-_-_-constants-_-_-_-_-_-*/

// let board = [
//     null, null, null,
//     null, null, null,
//     null, null, null
//   ];

// let turn = "X";

// /*-_-_-_-_-_-States-_-_-_-_-_-*/




// /*-_-_-_-_-_-element references-_-_-_-_-_-*/
// //array of all #board div elements, used by renderState()
// const cells = Array.from(document.querySelectorAll('#board div'));
// //access h2 element to be changed in renderState()
// const messages = document.querySelector('h2');

// /*-_-_-_-_-_-event listeners-_-_-_-_-_-*/
// document.getElementById('board').addEventListener('click', handleTurn);



// /*-_-_-_-_-_-functions-_-_-_-_-_-*/

// function init() {
//     board = [
//     null, null, null,
//     null, null, null,
//     null, null, null
//   ];
//   renderState();
// }

// init();

// //function will iterate over the board array and insert a mark into marked 'div' 
// function renderState() {
// board.forEach((mark, index) => {
//     cells[index].textContent = mark;
// });
// messages.textContent = `It's ${turn}'s turn!`;
// };

// function handleTurn(event) {
//     let idx = cells.findIndex(function(cell) {
//         return cell === event.target;
//     });
//     board[idx] = turn;

//     if (turn === 'X') {
//         turn = 'O'
//     } else {
//         turn = 'X'
//     };
//     renderState();
//     }
