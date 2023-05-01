//THIS IS FOR TICTACTOE
/*
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
**
- At all times 
    - Player can see score, whose turn it is, and the current state of the board 
    - Player can start over 
- When it is the player's turn
    - They can click on a space that hasn't been filled yet and fill it
    - 
- When it isn't their turn
    - They cannot click on any space 

*/

//all caps format because these variables will be used quite often
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
//variable to hold an array of all the possible winning placements
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

//circleTurn will be assigned and reassigned throughout to determine whose turn it is
let circleTurn;

//variable holds the nodelist comprised of all the cells
const cellElements = document.querySelectorAll('[data-cell]');
//variable holds the game board 
const board = document.getElementById('board');
//variable holds winningMessageElement 
const winningMessageElement = document.getElementById('winningMessage');
//variable holds first element matching the data-winning-message-text attribute
const winningMessageTextElement = document.querySelector('[data-winning-message-text]')
//variable for restartButton
const restartButton = document.getElementById('restartButton');

startGame();

restartButton.addEventListener('click', startGame);


//loop through data-cell nodelist 
cellElements.forEach(cell => {
    //add event listener to each cell. when clicked, it calls handleClick() ; once:true means that handleClick can only be called once per click event per cell
    cell.addEventListener('click', handleClick, {once: true})
})

function handleClick(e){
    //whichever cell we clicked on will be the target
    const cell = e.target;
    //if circleTurn is true, currentClass set to CIRCLE; else, currentClass set to X 
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    //pass currentClass thru checkWin(); if the game is won, pass false through endGame(); if the game is a draw, pass true through endGame()
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        //only switch turns and enable hover effects if the game is not over
        switchTurn();
        setBoardHoverClass();
    }
}

//function to start the game
function startGame() {
    //arbitrary assignment *LIKELY CHANGE LATER
    circleTurn = false;
    //loop through data-cell nodelist and add event listener to each cell, same as above
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, {once: true})
    })
    //call setBoardHoverClass to enable functionality at beginning of game 
    setBoardHoverClass();
    //after game is over, start removing the non-initial classes and such added during the game
    winningMessageElement.classList.remove('show');

}

//add a class name that matches the currentClass to the cell that is clicked 
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}
//every turn, reassign circleTurn the inverse value to switch player turn
function switchTurn() {
    circleTurn = !circleTurn;
}
//re-add the hover effects 
function setBoardHoverClass() {
//remove both X and CIRCLE classes from board constant 
board.classList.remove(X_CLASS);
board.classList.remove(CIRCLE_CLASS);
//if it is the circle player's turn, add CIRCLE_CLASS to board
if (circleTurn) {
    board.classList.add(CIRCLE_CLASS);
//if it is the X player's turn, add X_CLASS to board
} else {
    board.classList.add(X_CLASS);
}
}
//check all winning boards and see if they are met by the current board
//Go 
function checkWin(currentClass) {
    //some() returns true if at least one of the potential winning boards is found in the current board
return WINNING_BOARDS.some(boardCheck => { 
    //for every board, check if every index / values within the cell elements have the same class
    return boardCheck.every(index => { 
        //if the currentClass is in all three of the elements inside the boardCheck, then it's a win!
        return cellElements[index].classList.contains(currentClass);
    })
})
}

function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = 'It\'s a draw!' 
    } else {
        //set the winningMessageTextElement to show either O's win! or X's win! dependant on whether it is circle or X's turn
        winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} wins!`
    }
    //add 'show' class to winningMessageElement so that it displays 
    winningMessageElement.classList.add('show');
}

function isDraw() {
    //check if every single cell has been filled
    //cellElements does not have an every method, so destructuring cellElements must occur instead
    return [...cellElements].every(cell => {
        //check if each cell has a class of X_CLASS or CIRCLE_CLASS
        return cell.classList.contains(X_CLASS) || 
            cell.classList.contains(CIRCLE_CLASS)
    })
}













// //Game State
// let state;

// //function to build the initial game state
// function buildInitialState(){
//     const gameState = {
//         players: ['x', 'o'],
//         board: [
//             [null, null, null],
//             [null, null, null],
//             [null, null, null]
//         ]
//     };

//  return gameState;   
// }

// //renders the game state
// function renderState() {

// }

// //listeners
// function onBoardClick() {
//     // update state, maybe with another dozen or so helper functions...
  
//     renderState() // show the user the new state
//   }

// const gameBoard = document.getElementById('board');
// gameBoard.addEventListener('click', onBoardClick);