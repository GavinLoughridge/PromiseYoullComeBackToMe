let level = 0;
let gamestate = 'instructions';

function levelWon() {
  let textboxPromise = new Promise((resolve, reject) => {
    console.log('in text promise');
    appendToTextbox("##CONGRATULATIONS YOU WON!", resolve);
  });

  textboxPromise.then(function() {
    console.log('in first then');

    heightPromise = new Promise((resolve, reject) => {
      console.log('in height promise');
      changeTextboxHeight(660, resolve);
    });

    return heightPromise;
  }).then(function() {
    console.log('in second then');
    $('#textbox').empty();
    if (instructions[level + 1]) {
      level += 1;
      gamestate = 'instructions';
      giveInstructions(instructions[level])
    }
  });
}

function levelEnd() {
  if (won) {
    console.log('YOU HAVE WON THE LEVEL');
    gamestate = 'won';
    levelWon();
  } else {
    console.log('YOU HAVE LOST THE LEVEL');
    gamestate = 'lost';
    let lostText = "##OH NO! YOU DID NOT MAKE IT AND HAVE DIED A HORRIBLE DEATH ALONE IN SPACE!##PLEASE THE 'S' KEY TO TRY AGAIN";
    giveInstructions(lostText);
  }
}

let instructions = [
  "Welcome to my game. In it you have to use the blocks to the left to submit a solution which gets you through the wormholes and stuff.##I hope it works?##PRESS THE 'S' KEY TO BEGIN",
  "This is another level. Its way harder. Try not to die!##PRESS THE 'S' KEY TO BEGIN"
]

startLevel(level);
//updateViewport();
