// module for game board
function gameBoardModule() {
  // store the board as an array
  //  initialize the rows and columns variables for the board
  //  initialize board array as empty
  const _rows = 3;
  const _columns = 3;
  const board = [];

  //  >push Cell object to array making 2d array
  for (let i = 0; i < _rows; i++) {
    board[i] = [];
    for (let n = 0; n < _columns; n++) {
      board[i].push(Cell());
    }
  }
  // create method to get the board array
  const getBoard = () => board;
  // create method to add user move to gameboard (x or o)
  //  checks to make sure move is valid
  const placeMarker = (playerRow, playerColumn, player) => {
    let isMoveValid = false;
    board[playerRow][playerColumn].getValue() === 0 ? isMoveValid = true : isMoveValid = false;
    if(isMoveValid) {
      board[playerRow][playerColumn].addMarker(player);
    } else {
      return;
    }
  }
  // create method to print gameboard to console so we can see what is happening
  //  will be removed later
  const printBoard = () => {
    const boardWithMarkerValues = board.map((row) => row.map((cell) => cell.getValue()));
    console.log(boardWithMarkerValues);
  }
  // return the 3 methods
  return {
    getBoard,
    placeMarker,
    printBoard
  }
}

// factory for Cell update methods
// represents one cell on the game board
//  can have one of three:
//    0: no x or o
//    1: x player
//    2: o player
function Cell() { 
  // initialize variable for marker value
  let _value = 0;
  // create method to make the move based on the player calling it
  const addMarker = (player) => _value = player;
  // create method to get the move
  const getValue = () => _value;
  // return the 2 methods
  return {
    addMarker,
    getValue
  };
}

// module for game controller
// Takes two players as parameters
//  controls flow and state of game turns
function GameControllerModule(playerOneName = "Player One", playerTwoName = "Player Two") {
  // initialize board to gameboard module
  // create array of player objects
  //  each player has a value for their marker (x or o)
  // set the active player to random player in the array

  // create method to switch the active player

  // create method to get the active player

  // create method to print the new round text
  //  will show whose turn it is

  // create method to play the round
  //  print what player made what move
  //  store the move in the board with method on the board object
  //  switch whose turn it is with the switch player method
  //  print whose turn it is with the print round method

  // start the game
  //  call the print round method

  // return the method to get the active player and the play round method
}

// store the controller object in a variable