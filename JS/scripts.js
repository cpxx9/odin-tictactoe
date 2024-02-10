// module for game board
function gameBoardModule() {
  const _rows = 3;
  const _columns = 3;
  const _board = [];

  for (let i = 0; i < _rows; i++) {
    _board[i] = [];
    for (let n = 0; n < _columns; n++) {
      _board[i].push(Cell());
    }
  }

  const getBoard = () => _board;
  
  const placeMarker = (playerRow, playerColumn, player) => {
    let isMoveValid = false;
    _board[playerRow][playerColumn].getValue() === 0 ? isMoveValid = true : isMoveValid = false;
    if(isMoveValid) {
      _board[playerRow][playerColumn].addMarker(player);
    } else {
      return;
    }
  }
  
  //  will be removed later
  const printBoard = () => {
    const _boardWithMarkerValues = _board.map((row) => row.map((cell) => cell.getValue()));
    console.log(_boardWithMarkerValues);
  }
  
  return {
    getBoard,
    placeMarker,
    printBoard
  }
}

//    0: no x or o
//    1: x player
//    2: o player
function Cell() { 
  let _marker = 0;
  
  const addMarker = (player) => _marker = player;
  
  const getValue = () => _marker;
  
  return {
    addMarker,
    getValue
  };
}

// module for game controller
const game = (function GameControllerModule(playerOneName = "Player One", playerTwoName = "Player Two") {
  const _board = gameBoardModule();
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
  let _activePlayer = players[Math.floor(Math.random() * 2)];
  
  const switchPlayerTurn = () => {
    _activePlayer = _activePlayer === players[0] ? players[1] : players[0];
  };

  const getActivePlayer = () => _activePlayer;

  const printNewRound = () => {
    _board.printBoard();
    console.log(`${getActivePlayer()._name}'s turn.`);
  };
  
  const endGame = (winnerMarker) => {
    //determine the winner
    let winner;
    players.forEach((player) => {
      if (player._marker === winnerMarker) {
        winner = player._name;
      }
    });
    console.log(`Game over! ${winner} wins!`);
    return true;
  };

  const checkWinner = () => {
    const _boardWithMarkerValues = _board.getBoard().map((row) => row.map((cell) => cell.getValue()));
    // horizontal checks
    for (let i = 0; i < _boardWithMarkerValues.length; i++) {
      if (_boardWithMarkerValues[i][0] === _boardWithMarkerValues[i][1] && _boardWithMarkerValues[i][1] === _boardWithMarkerValues[i][2] && _boardWithMarkerValues[i][i] != 0) {
        return endGame(_boardWithMarkerValues[i][1]);
      }
    }

  };

  const playRound = (row, column) => {
    console.log(`Marking for ${getActivePlayer()._name} in Row: ${row}, Column: ${column}`);
    _board.placeMarker(row, column, getActivePlayer()._marker);
    
    if(checkWinner()) {
      return;
    }

    switchPlayerTurn();
    printNewRound();
    
  }

  printNewRound();

  return {
    getActivePlayer,
    playRound
  }
})();