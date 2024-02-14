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
  
  return {
    getBoard,
    placeMarker
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
function GameControllerModule(playerOneName = "Player One", playerTwoName = "Player Two") {
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

  const horizontalCheck = (currentBoard) => {
    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i][0] === currentBoard[i][1] && currentBoard[i][1] === currentBoard[i][2] && currentBoard[i][i] != 0) {
        return true;        
      }
    }
  }; 

  const verticleCheck = (currentBoard) => {
    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[0][i] === currentBoard[1][i] && currentBoard[1][i] === currentBoard[2][i] && currentBoard[i][i] != 0) {
        return true;
      }
    }
  };

  const crossCheck = (currentBoard) => {
    if (currentBoard[1][1] != 0 && ((currentBoard[0][0] === currentBoard[1][1] && currentBoard[1][1] === currentBoard[2][2]) || (currentBoard[0][2] === currentBoard[1][1] && currentBoard[1][1] === currentBoard[2][0]))) {
        return true;
    }
  };

  const tieCheck = (currentBoard) => {
    let emptyCells = 9;
    for (let i = 0; i < currentBoard.length; i++) {
      for (let n = 0; n < currentBoard[i].length; n++) {
        currentBoard[i][n] != 0 ? emptyCells-- : emptyCells = emptyCells;
      }
    }
    if (emptyCells === 0) {
      return true;
    }
  };

  const checkWinner = () => {
    const _currentBoardValues = _board.getBoard().map((row) => row.map((cell) => cell.getValue()));
    
    if (horizontalCheck(_currentBoardValues) || verticleCheck(_currentBoardValues) || crossCheck(_currentBoardValues)){
      return 'win';
    } else {
      if(tieCheck(_currentBoardValues)) {
        return 'tie';
      }
    }
  };

  const playRound = (row, column) => {
    _board.placeMarker(row, column, getActivePlayer()._marker);
    
    if(checkWinner() === 'win') {
      return 'win';
    } else if (checkWinner() === 'tie') {
      return 'tie'
    } else {
      switchPlayerTurn();
    }    
  }

  return {
    getActivePlayer,
    playRound,
    getBoard: _board.getBoard
  }
}

//module for DOM integration
(function screenController() {
  let game = GameControllerModule();
  const boardDOM = document.querySelector('.board');
  const turnDOM = document.querySelector('.turn');
  const resetDOM = document.querySelector('.reset');

  const updateScreen = () => {
    boardDOM.textContent = '';

    const board = game.getBoard();
    const currentPlayer = game.getActivePlayer();

    turnDOM.textContent = `${currentPlayer._name}'s turn...`;

    board.forEach((row, rowIndex) => {
      row.forEach((cell, columnIndex) => {
        const gameButton = document.createElement('button');
        gameButton.classList.add('cell');
        gameButton.dataset.row = rowIndex;
        gameButton.dataset.column = columnIndex;

        const cellMarker = cell.getValue();
        switch (cellMarker) {
          case 1:
            gameButton.textContent = 'X';
            break;
          case 2:
            gameButton.textContent = 'O';
            break;
          defualt:
            gameButton.textContent = '';
        }

        boardDOM.appendChild(gameButton);
      })
    });
  };

  const endGame = (outcome) => {
    if (outcome === 'tie' || outcome === 'win'){
      let buttons = boardDOM.querySelectorAll('.cell');
      buttons.forEach((button) => {
        button.disabled = true;
      });

      if (outcome === 'tie') {
        turnDOM.textContent = "It's a tie!";
      } else if (outcome === 'win') {
        const winner = game.getActivePlayer();
        turnDOM.textContent = `${winner._name} wins!`;
      }

      const restartButton = document.createElement('button');
      restartButton.classList.add('restart-btn');
      restartButton.classList.add('reset-btns');
      restartButton.textContent = "New players?";
      restartButton.addEventListener('click', restartClickHandler);

      const rematchButton = document.createElement('button');
      rematchButton.classList.add('rematch-btn');
      rematchButton.classList.add('reset-btns');
      rematchButton.textContent = "Rematch?";
      rematchButton.addEventListener('click', rematchClickHandler);

      resetDOM.appendChild(rematchButton);
      resetDOM.appendChild(restartButton);
    }
  };

  function buttonClickHandler(e) {
    const selectedRow = e.target.dataset.row;
    const selectedColumn = e.target.dataset.column;
    if(!selectedColumn || !selectedRow) return;
    
    const round = game.playRound(selectedRow, selectedColumn);

    updateScreen();

    endGame(round);
  }

  boardDOM.addEventListener('click', buttonClickHandler);  

  function rematchClickHandler() {
    console.log('test');
  }

  function restartClickHandler() {
    console.log('test');
    turnDOM.innerHTML = '';
    resetDOM.innerHTML = '';
    game = GameControllerModule();
    updateScreen();
  }

  updateScreen();
})();