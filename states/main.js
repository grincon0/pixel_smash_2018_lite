var game = new Phaser.Game(

  1000,
  700,
  Phaser.AUTO,
  document.getElementById("game")
);

function Main() { }

Main.prototype = {
  preload: function () {
    game.load.script('state0', './state0.js');
    game.load.script('state1', './state1.js');
    game.load.script('game', './game.js');
    game.load.script('onlineChars', './onlineSelect.js');
    game.load.script('online', './online.js');
    game.load.script('cpuFight', './cpuFight.js');
    game.load.script('training', './training.js');
    game.load.script('soundTest', './soundTest.js');
  },
  create: function () {
    game.state.add('state0', state0);
    game.state.add('state1', state1);
    game.state.add('game', game);
    game.state.add('online', online);
    game.state.add('cpuFight', cpuFight);
    game.state.add('training', cpuFight);
    game.start.add('soundTest', soundTest);
  }
};

game.state.add('state0', demo.state0);
game.state.add('online', demo.online);
game.state.add('game', demo.game);
game.state.add('onlineChars', demo.onlineChars);
game.state.add('state1', demo.state1);
game.state.add('cpuFight', demo.cpuFight);
game.state.add('training', demo.training);
game.state.add('soundTest', demo.soundTest);
game.state.start('state0');
