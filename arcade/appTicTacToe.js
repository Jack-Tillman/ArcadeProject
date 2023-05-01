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