// module for game board
function gameBoardModule() {
  // store the board as an array
  //  initialize the rows and columns variables for the board
  //  initialize board array as empty
  const _rows = 3;
  const _columns = 3;
  const _board = [];

  //  >push Cell object to array making 2d array
  for (let i = 0; i < _rows; i++) {
    _board[i] = [];
    for (let n = 0; n < _columns; n++) {
      _board[i].push(Cell());
    }
  }
  // create method to get the board array
  const getBoard = () => _board;
  // create method to add user move to gameboard (x or o)
  //  checks to make sure move is valid
  const placeMarker = (playerRow, playerColumn, player) => {
    let isMoveValid = false;
    _board[playerRow][playerColumn].getValue() === 0 ? isMoveValid = true : isMoveValid = false;
    if(isMoveValid) {
      _board[playerRow][playerColumn].addMarker(player);
    } else {
      return;
    }
  }
  // create method to print gameboard to console so we can see what is happening
  //  will be removed later
  const printBoard = () => {
    const _boardWithMarkerValues = _board.map((row) => row.map((cell) => cell.getValue()));
    console.log(_boardWithMarkerValues);
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
  let _marker = 0;
  // create method to make the move based on the player calling it
  const addMarker = (player) => _marker = player;
  // create method to get the move
  const getValue = () => _marker;
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
  const _board = gameBoardModule();
  let isWinner = false;
  // create array of player objects
  //  each player has a value for their marker (x or o)
  const players = [
    {
      _name: playerOneName,
      _marker: 1
    },
    {
      _name: playerTwoName,
      _marker: 2
    }
  ];
  
  // set the active player to random player in the array
  let _activePlayer = players[Math.floor(Math.random() * 2)];
  console.log(_activePlayer);
  // create method to switch the active player
  const switchPlayerTurn = () => {
    _activePlayer = _activePlayer === players[0] ? players[1] : players[0];
  };

  // create method to get the active player
  const getActivePlayer = () => _activePlayer;

  // create method to print the new round text
  //  will show whose turn it is
  const printNewRound = () => {
    _board.printBoard();
    console.log(`${getActivePlayer()._name}'s turn.`);
  };

  // create method to play the round
  const playRound = (row, column) => {
    //  print what player made what move
    console.log(`Marking for ${getActivePlayer()._name} in Row: ${row}, Column: ${column}`);
    //  store the move in the board with method on the board object
    _board.placeMarker(row, column, getActivePlayer()._marker);
    
    //  check if there is a winner, if not switch whose turn it is with the switch player method
    switchPlayerTurn();
    printNewRound();
  }

  // start the game
  //  call the print round method
  printNewRound();

  // return the method to get the active player and the play round method
  return {
    getActivePlayer,
    playRound
  }
}

// store the controller object in a variable
const game = GameControllerModule();