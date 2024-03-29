/* 

************************************
State 1 = CHARACTER SELECTION SCREEN 
************************************

*/
demo = window.demo || (window.demo = {});
let isScottClicked = false;
characterSelection = '';
window.selectedChar = '';

/*let fighter;
let glSFX;

let ghostDemo;*/

function characterMenu() {
  characterMenu = game.add.image(0, 0, 'background');
  characterMenu.width = 1200;
  characterMenu.height = 1000;
}

function selectCharacterText() {
  var text = null;
  var textReflect = null;
  text = game.add.text(500, 100, "SELECT CHARACTER");
  //  Centers the text
  text.anchor.set(0.5);
  text.align = 'center';
  //  Our font + size
  text.font = 'PipeDream';
  text.fontWeight = 'bold';
  text.fontSize = 80;
  text.fill = '#ffffff';
  textReflect = game.add.text(500, 100 + 100, "SELECT CHARACTER");
  //  Centers the text
  textReflect.anchor.set(0.5);
  textReflect.align = 'center';
  textReflect.scale.y = -1;
  //  Our font + size
  textReflect.font = 'PipeDream';
  textReflect.fontWeight = 'bold';
  textReflect.fontSize = 80;

  var grd = textReflect.context.createLinearGradient(1, 1, 1, text.canvas.height);
  //  Add in 2 color stops
  grd.addColorStop(0, 'rgba(255,255,255,0)');
  grd.addColorStop(1, 'rgba(255,255,255,0.08)');
  textReflect.fill = grd;
}

function scottPilgrim() {
  let scott;
  scott = game.add.button(400, 420, 'tester', null, this, 2, 1, 0);
  scott.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7], 12, true);
  scott.x = 100;
  scott.animations.play('idle');

  scott.onInputOver.add(over, this);
  scott.onInputOut.add(out, this);
  scott.onInputUp.add(chooseScott, this);
};

function ghosty() {
  ghostDemo = game.add.button(400, 440, 'ghosty');
  ghostDemo.animations.add('idle', [0, 1, 2, 3, 4, 5, 6, 7, 8], 12, false);
  ghostDemo.animations.add('demo', [0, 1, 2, 3, 4, 5, 6, 7, 14, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
    32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63, 64, 65,
    66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100, 101,
    102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 164, 165, 166, 167, 168, 169, 170, 171, 39, 38, 37, 36, 35, 34, 33, 32], 18, true);
  ghostDemo.animations.play('demo');
  ghostDemo.onInputOver.add(ghostOver, this);
  ghostDemo.onInputOut.add(out, this);
  ghostDemo.onInputUp.add(chooseGhost, this)
}

demo.state1 = function () { };
demo.state1.prototype = {
  preload: function () {
    game.load.image('background', 'assets/art/start-state-background.png');
    game.load.spritesheet('tester', 'assets/art/scott-final.png', 142, 184, 151);
    game.load.spritesheet('ghosty', 'assets/art/MarshUmbra.png', 160, 160, 190);
    game.load.audio('charMusic', 'assets/music/Ready.ogg');
    game.load.audio('goodluck', 'assets/sfx/GoodLuck.wav');
  },
  create: function () {
    characterMenu = game.add.image(0, 0, 'background');
    characterMenu.width = 1200;
    characterMenu.height = 1000;
    clearCharacterNameOnLocalStorage();

    goodluck = game.add.audio('goodluck');
    selectCharacterText();
    scottPilgrim();
    ghosty();

    playMusic();
  },
  update: function () { 

    /* if (!characterSelection) console.log('no char'); */

    if (!checkCharacterNameInSessionStorage() && characterSelection) {
      console.log(characterSelection);
      setCharacterNameOnSessionStorage(characterSelection);
    } 

    if (characterSelection && checkCharacterNameInSessionStorage()) {
      console.log('getting char name from session stoarage', checkCharacterNameInSessionStorage())
      handleStateTransition();
    }
  }
};

function up(character, bol) {
  console.log('button up', character);
}

//Scott has been selected;
function scottClicked() {
  isScottClicked = true;
  up('scott', isScottClicked);
}

function chooseScott() {
  fighter = 'scott';
 /*  setCharacterNameOnSessionStorage(fighter); */
  handleCharacterSelection(fighter);
  game.sound.stopAll();
  goodluck.play();
}

function chooseGhost() {
  fighter = 'mghosty';
  /* setCharacterNameOnSessionStorage(fighter); */
  handleCharacterSelection(fighter);
  game.sound.stopAll();
  goodluck.play();
  // console.log('start game');

}

//Ghost has been selected;
function ghostClicked() {
  isGhostClicked = true;
  console.log("Character is ghost");
  up('mghosty', isGhostClicked);
}

function handleCharacterSelection(fighter) {
  characterSelection = fighter;
}

const checkCharacterNameInSessionStorage = () => {
  const characterName = sessionStorage.getItem("characterName");
  if (!characterName) {
    return null;
  }

  return characterName;
}

const setCharacterNameOnSessionStorage = (nameString) => {
  console.log('setting charater naem to session storage', nameString);
/*   localStorage.setItem('characterName', nameString); */
   sessionStorage.setItem('characterName', nameString);
}

function clearCharacterNameOnLocalStorage () {
  /* localStorage.setItem("characterName", ''); */
  sessionStorage.removeItem('characterName');
}

function handleStateTransition() {
  if (checkCharacterNameInSessionStorage()) {
    game.state.start('cpuFight');
  } else {
    alert('NO CHARACTER NAME IN SESSINON STORAGE');
  }
}

function over() {

  console.log('button over');
}

function ghostOver() {

  console.log('button over');
}

function out() {
  console.log('button out');
}

function playMusic() {
  let charMusic = game.add.audio('charMusic');

  charMusic.play();
  charMusic.loopFull();
}
