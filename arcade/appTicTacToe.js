//THIS IS FOR TICTACTOE
/*
What is the starting state?
- The starting state is an empty board
How do I display the state of the game to the user?
- Must display whose turn it is, the moves that have been made already, which # of move players are on, 
What controls/interface do I make available to the user?
- At all times 
    - Player can see score, whose turn it is, and the current state of the board 
    - Player can start over 
- When it is the player's turn
    - They can click on a space that hasn't been filled yet and fill it
    - 
- When it isn't their turn
    - They cannot click on any space 
How does each interaction update the state?
- Each time a player places a mark, the mark is changed from null to the player's character 
    - The 
- Each 
*/
"use strict";

//Game State
let state;

//function to build the initial game state
function buildInitialState(){
    const gameState = {
        players: ['x', 'o'],
        board: [
            [null, null, null],
            [null, null, null],
            [null, null, null]
        ]
    };

 return gameState;   
}

//renders the game state
function renderState() {

}

//listeners
function onBoardClick() {
    // update state, maybe with another dozen or so helper functions...
  
    renderState() // show the user the new state
  }

const gameBoard = document.getElementById('board');
gameBoard.addEventListener('click', onBoardClick);