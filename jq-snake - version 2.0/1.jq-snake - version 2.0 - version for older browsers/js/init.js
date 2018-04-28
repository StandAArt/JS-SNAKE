'use strict';

//Create new player with deafaul settings
var player = {
  name: 'Unknown',
  score: 0,
  deaths: 0,
  body: [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }],
  direction: 'right',
  speed: 400
};

//Initialize our players. Add/update loaclStorage playes
function init() {
  player.name = $.localStorage.get('playername');
  if (true) {
    player.name = prompt('Your Name?');
    savePlayer(player);
  }
  $('h1').append([$('<br>'), $(' <h3>').addClass('creator').text('by Krivenko Eugene'), $(' <small>').text(player.name), $('<br>'), $('<button>').addClass('btn').addClass('btn-primary').text('exit/restart'), $('<br>'), $('<div>').addClass('score'), $('<div>').addClass('deaths')]);
}

function getPlayersList() {
  if ($.localStorage.isSet('players')) {
    return $.localStorage.get('players');
  } else {
    return [];
  }
}

function savePlayer(player) {
  //If a player is saved - updates its settings, else save the new player
  var players = getPlayersList();
  var score = player.score;
  var body = player.body;
  var direction = player.direction;
  var speed = player.speed;
  var deaths = player.deaths;

  if (players.length != 0) {
    for (var i = 0; i < players.length; i++) {

      if (players[i].name == player.name) {
        score = players[i].score;
        body = players[i].body;
        direction = players[i].direction;
        speed = players[i].speed;
        deaths = players[i].deaths;
        players.splice(i, 1);
      }
    }
  }

  player.score = score;
  player.body = body;
  player.direction = direction;
  player.speed = speed;
  player.deaths = deaths;
  players.push(player);
  $.localStorage.set('players', players);
}

function restart() {
  location.reload();
}

document.onload = init();
document.querySelector('.btn').onclick = restart;
