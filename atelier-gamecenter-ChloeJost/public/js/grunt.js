var app = {
    //board: div#board,
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
  
      // 1. dessiner le plateau
      app.drawBoard();
  
      // 2. écouter le clavier
      app.listenKeyboardEvents();
    },
    listenKeyboardEvents: function() {
      // l'événement keyup est déclenché quand on relache une touche du clavier
      // le meilleur moyen de s'assurer de "capturer" un événement clavier, c'est d'écouter un élément de "haut niveau" dans la hierarchie, body ou document
      // dans le callback, si on déclare un paramètre event, on peut récupérer toutes les infos nécessaires à l'identification de la touche appuyée
      // ici, on va se baser sur event.code (parce que c'est standard)
      // pour les touches haut, gauche et droite du clavier, event.code vaut respectivement "ArrowUp", "ArrowLeft" et "ArrowRight"
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
    // ce paramètre va me permettre de contrôler le redessin du plateau
    // par défaut, il vaut true (donc on redessine le plateau)
    // ça me permet de ne pas retoucher le code qui utilise déjà app.turnLeft()
    turnLeft: function(redraw = true) {
      // switch est dans 99% des cas l'équivalent exact d'une poignée de if else if
      // pour choisir if ou switch => même technique que pour choisir bleu ou rouge : chacun ses goûts
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
        // seule petite différence avec un switch : si on ne met pas de break dans un case (ou dans le default)
        // les instructions suivantes sont alors exécutées elles aussi, jusqu'à rencontrer un break
        // ici, si la direction du joueur n'est pas reconnue, un message d'erreur s'affiche ET sa direction est remise sur "right"
        default:
          console.error('Unknown player direction');
        // dans le cas où la direction est "down", elle est uniquement remise sur "right"
        case 'down':
          app.player.direction = 'right';
          // et ce break fait sortir de la condition les cas "down" et default
          break;
      }
  
      // si le paramètre redraw vaut true, c'est qu'on a besoin de redessiner le plateau
      if (redraw) {
        app.redrawBoard();
      }
    },
    turnRight: function() {
      // solution pragmatique : tourner à gauche, c'est tourner 3x à droite
      // cette solution nous économise beaucoup de lignes de code <3 MAIS
      // - attention aux performances : si tourner à gauche implique de lourds traitements, beaucoup de calculs etc. exécuter 3x la fonction prendra 3x plus de temps et de ressources
      // - attention à la cohérence : ne pas abuser de ce principe dans des cas moins évidents
      for (var turns = 0; turns < 3; turns++) {
        // je demande 3 rotations à gauche, mais en précisant "pas besoin de redessiner le plateau"
        app.turnLeft(false);
      }
  
      app.redrawBoard();
    },
    moveForward: function() {
      // faire avancer le joueur d'une unité sur x ou y, en fonction de sa direction
      // ET en tenant compte des bords
  
      // 1er facteur : la direction
      switch (app.player.direction) {
        case 'right':
          // 2e facteur : les bords du plateau
          // pour l'instant, on se projette, on voit ce que donnerait la coordonnée si on avançait
          // on la compare à la valeur à ne pas atteindre (si le plateau fait 6 de long, il faut rester sur la case 5 maximum)
          if (app.player.x + 1 < app.boardSize.x) {
            app.player.x++;
          }
          break;
        case 'left':
          // côté "borne inférieure", la case 0 existe, le précipice se trouve en -1
          // par contre, cette syntaxe n'est pas très chouette
          // heureusement, on peut aussi utiliser app.player.x - 1 >= 0
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
      // 1. nettoyer le plateau
      app.board.textContent = "";
      // ou app.board.innerHTML = "";
    },
    redrawBoard: function() {
  
      console.log('plateau redessiné');
      app.clearBoard();
      app.drawBoard();
    },
    drawBoard: function () {
      // 1. récupérer l'élément plateau
      app.board = document.querySelector('#board');
  
      // 2. le plateau contient 4 lignes
      for (var rowIndex = 0; rowIndex < app.boardSize.y; rowIndex++) {
        // on crée la div, on lui donne sa classe
        var row = document.createElement('div');
        row.classList.add('row');
  
        // 3. chaque ligne contient 6 cellules
        for (var cellIndex = 0; cellIndex < app.boardSize.x; cellIndex++) {
  
          var cell = document.createElement('div');
  
  
          // chaque cellule se retrouve implicitement avec des coordonnées x et y
          // x sera cellIndex
          // y sera rowIndex
          if (cellIndex === app.player.x && rowIndex === app.player.y) {
            // c'est ici que je dois caler mon joueur
            var player = document.createElement('div');
            player.classList.add('player', 'player-' + app.player.direction);
  
            cell.appendChild(player);
          } 
          if (cellIndex === app.targetCell.x && rowIndex === app.targetCell.y) {
            // j'ajoute la class targetCell à l'élément
            cell.classList.add('targetCell');
          }
  
          cell.classList.add('cell');
  
          row.appendChild(cell);
        }
  
        // et une fois que tout est bon, on l'ajoute au plateau
        app.board.appendChild(row);
      }
    }
  };
  
  document.addEventListener('DOMContentLoaded', app.init);