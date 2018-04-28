'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var GameMap = function () {
  function GameMap() {
    _classCallCheck(this, GameMap);

    //width and height of the map
    this.width = 500;
    this.height = 500;
    this.divisions = 25;
    this.mise = [];
  }

  _createClass(GameMap, [{
    key: 'addMouse',
    value: function addMouse(mouse) {
      this.mise.push(mouse);
    }
    //Return true if snakes founds mouse

  }, {
    key: 'isMouse',
    value: function isMouse(x, y) {
      var found = false;
      for (var i = 0; i < this.mise.length; i++) {

        if (this.mise[i].x == x && this.mise[i].y == y) {
          found = true;
          //delete founded mouse
          this.mise.shift();
        }
      }
      return found;
    }
  }, {
    key: 'render',
    value: function render() {
      var size = this.width / this.divisions - 1;
      for (var x = 0; x < this.width; x += size + 1) {
        for (var y = 0; y < this.height; y += size + 1) {
          $('canvas').drawRect({
            fillStyle: '#050',
            x: x + size / 2, y: y + size / 2,
            width: size,
            height: size
          });
        }
      }
      for (var i = 0; i < this.mise.length; i++) {
        this.mise[i].render();
      }
    }
    //Ends the game and sabe to localStorage number of this player deaths

  }, {
    key: 'gameOver',
    value: function gameOver() {
      $('canvas').remove();
      $('.jumbotron').append($('<div>').addClass('gameover'));
      var snake = $.localStorage.get('players');
      var playerName = $('small').text();

      for (var i = 0; i < snake.length; i++) {
        if (playerName == snake[i].name) {
          snake[i].deaths++;
          $('.score').text('Your final score = ' + snake[i].score);
          $('.deaths').text('Number of Deaths = ' + snake[i].deaths);

          $.localStorage.set('players', snake);
        }
      }
    }
  }]);

  return GameMap;
}();
