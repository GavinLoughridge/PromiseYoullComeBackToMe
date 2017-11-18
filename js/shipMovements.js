/*
  space ship movement functions
*/
let position;
let path = [];
let nextStep;
let won;

function moveTo() {
  path.push({
    "animation": (x) => {
      moveAnimation(x);
    },
    "destinationGrid": [position[0], position[1]],
    "destinationPixels": [pixelCoordinates("x", position[0]), pixelCoordinates("y", position[1])]
  });
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

  if (Math.random() > .5 || !(wormhole.hasOwnProperty("fail"))) {
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
  } else if (!$(`#x${position[0]}y${position[1]}`).hasClass('safe')){
    won = false
    commandList = [];
  }
}
