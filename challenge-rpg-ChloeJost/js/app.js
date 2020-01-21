var app = {
  boardSize: {
    x: 6,
    y: 4
  },
  player: {
    x: 0,
    y: 0,
    direction: 'right'
  },
  targetCell: {
    x: 5,
    y: 3
  },
  init: function () {
    console.log('init !');
    console.log(app.player.direction);
    console.log(app.targetCell);
    app.drawBoard();
    app.listenKeyboardEvents();
  },
  listenKeyboardEvents: function() {
    document.addEventListener('keyup', app.handleKeyUp);
  },
  handleKeyUp: function(event) {
    switch (event.code) {
      case 'ArrowUp':
        app.moveForward();
        break;
      case 'ArrowLeft':
        app.turnLeft();
        break;
      case 'ArrowRight':
        app.turnRight();
        break;
    }
  },

  turnLeft: function(redraw = true) {
    switch (app.player.direction) {
      case 'right':
        app.player.direction = 'up';
        break;
      case 'up':
        app.player.direction = 'left';
        break;
      case 'left':
        app.player.direction = 'down';
        break;
      default:
        console.error('Unknown player direction');
      case 'down':
        app.player.direction = 'right';
        break;
    }

    if (redraw) {
      app.redrawBoard();
    }
  },
  turnRight: function() {

    for (var turns = 0; turns < 3; turns++) {
      app.turnLeft(false);
    }

    app.redrawBoard();
  },
  moveForward: function() {

    switch (app.player.direction) {
      case 'right':
        if (app.player.x + 1 < app.boardSize.x) {
          app.player.x++;
        }
        break;
      case 'left':
        if (app.player.x - 1 > -1) {
          app.player.x--;
        }
        break;
      case 'down':
        if (app.player.y + 1 < app.boardSize.y) {
          app.player.y++;
        }
        break;
      case 'up':
        if (app.player.y - 1 > -1) {
          app.player.y--;
        }
        break;
      default:
        console.error('Unknown player direction');
        break;
    }

    app.redrawBoard();
  },
  clearBoard: function() {
    app.board.textContent = "";
  },
  redrawBoard: function() {

    console.log('plateau redessiné');
    app.clearBoard();
    app.drawBoard();
  },
  drawBoard: function () {
    app.board = document.querySelector('#board');
    for (var rowIndex = 0; rowIndex < app.boardSize.y; rowIndex++) {
      var row = document.createElement('div');
      row.classList.add('row');
      for (var cellIndex = 0; cellIndex < app.boardSize.x; cellIndex++) {
        var cell = document.createElement('div');
        if (cellIndex === app.player.x && rowIndex === app.player.y) {
          var player = document.createElement('div');
          player.classList.add('player', 'player-' + app.player.direction);
          cell.appendChild(player);
        } 
        if (cellIndex === app.targetCell.x && rowIndex === app.targetCell.y) {
          cell.classList.add('targetCell');
        }

        cell.classList.add('cell');

        row.appendChild(cell);
      }
      app.board.appendChild(row);
    }
  }
};

document.addEventListener('DOMContentLoaded', app.init);