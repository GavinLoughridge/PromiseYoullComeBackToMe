/*
  space ship movement functions
*/
let position;
let path = [];
let nextStep;
let won;

function moveTo() {
  console.log('moving to', position);
  path.push({
    "animation": (x) => {
      moveAnimation(x);
    },
    "destinationGrid": [position[0], position[1]],
    "destinationPixels": [pixelCoordinates("x", position[0]), pixelCoordinates("y", position[1])]
  });
  console.log('pushing', {
    "animation": (x) => {
      moveAnimation(x);
    },
    "destinationGrid": [position[0], position[1]],
    "destinationPixels": [pixelCoordinates("x", position[0]), pixelCoordinates("y", position[1])]
  });
  console.log('path is', path);
  checkPosition(position);
}

function enterWormhole() {
  let wormhole = wormholes[level][`x${position[0]}y${position[1]}`];
  path.push(
    {
      "animation": () =>
      warpOutAnimation()
    }
  );

  if (Math.random() > .5) {
    position = wormhole["pass"];
    path.push(
      {
        "animation": (x) => {
          warpInAnimation(x);
        },
        "destinationGrid": [position[0], position[1]],
        "destinationPixels": [pixelCoordinates("x", position[0]), pixelCoordinates("y", position[1])]
      }
    );
  } else {
    position = wormhole["fail"];
    executionState["error"] = true;
    executionState["context"] = 'promise';
    path.push(
      {
        "animation": (x) => {
          warpInAnimation(x);
        },
        "destinationGrid": [position[0], position[1]],
        "destinationPixels": [pixelCoordinates("x", position[0]), pixelCoordinates("y", position[1])]
      }
    );
  }
}

function checkPosition() {
  if ($(`#x${position[0]}y${position[1]}`).hasClass('wormholeOrigin')) {
    enterWormhole();
  } else if ($(`#x${position[0]}y${position[1]}`).hasClass('goal')) {
    won = true;
    commandList = [];
    console.log('won');
    console.log('path is', path);
  } else {
    won = false
    commandList = [];
    console.log('lost');
    console.log('path is', path);
  }
}
