var app = {
  gridSize: 8,
  pixelSize: 20,
  styles: [
    'plain',
    'empty',
    'light',
    'highlight',
    'bright'
  ],
  init: function() {
    console.log('app init');
    app.board = document.querySelector('#invader');
    app.configForm = document.querySelector('.configuration');

    app.board.addEventListener('click', app.handlePixelClick);
    app.configForm.addEventListener('submit', app.handleFormSubmit);

    app.generateBoard();

    app.generateForm();
    
    app.generatePalette();
  },
  generatePalette: function() {
 
    app.palette = document.createElement('div');
    app.palette.className = "palette";

    app.styles.forEach(app.addStyleButton);

    document.body.appendChild(app.palette);
  },

  addStyleButton: function(style) {
    var styleButton = document.createElement('button');

    styleButton.className = "palette__color--" + style + " palette__color";
    styleButton.dataset.style = style;
    styleButton.addEventListener('click', app.handleStyleClick);

    app.palette.appendChild(styleButton);
  },
  generateForm: function() {
    var gridSizeInput = document.createElement('input');
    gridSizeInput.type = "number";
    gridSizeInput.placeholder = "Taille de la grille";
    gridSizeInput.value = "8";
    gridSizeInput.name = "gridSize";

    var pixelSizeInput = document.createElement('input');
    pixelSizeInput.type = "number";
    pixelSizeInput.placeholder = "Taille des pixels";
    pixelSizeInput.value = "20";
    pixelSizeInput.name = "pixelSize";

    var goButton = document.createElement('button');
    goButton.type = 'submit';
    goButton.textContent = 'Valider';

    app.configForm.appendChild(gridSizeInput);
    app.configForm.appendChild(pixelSizeInput);
    app.configForm.appendChild(goButton);
  },
  generateBoard: function() {
    for (var row = 0; row < app.gridSize; row++) {
      var rowElement = document.createElement('div');
      rowElement.className = "grid__row";
      app.board.appendChild(rowElement);
      for (var pixel = 0; pixel < app.gridSize; pixel++) {
        var pixelElement = document.createElement('div');
        pixelElement.className = "grid__pixel";
        pixelElement.style.width = app.pixelSize + "px";
        pixelElement.style.height = app.pixelSize + "px";
        rowElement.appendChild(pixelElement);
      }
    }
  },
  handleFormSubmit: function(event) {
    console.log('envoi du formulaire');

    event.preventDefault();
    console.log(event);
    
    var form = event.target;
    var gridSizeInput = form.children[0];
    var pixelSizeInput = form.children[1];

    var newGridSize = gridSizeInput.value;
    var newPixelSize = pixelSizeInput.value;

    app.board.textContent = "";

    app.gridSize = parseInt(newGridSize, 10);
    app.pixelSize = parseInt(newPixelSize, 10);

    app.generateBoard();
  },
  handlePixelClick: function(event) {
    console.log('click');

    var pixel = event.target;

    for (var i = 0; i < app.styles.length; i++) {

      pixel.classList.remove("grid__pixel--" + app.styles[i]);
    }
    
    if (app.currentStyle) {
      pixel.classList.add("grid__pixel--" + app.currentStyle);
    }
  },
  handleStyleClick: function(event) {
    console.log('clic sur une couleur');
    console.log(event);

    var clickedButton = event.target;
    app.currentStyle = clickedButton.dataset.style;
  }

};

document.addEventListener('DOMContentLoaded', app.init);