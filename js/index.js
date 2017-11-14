let stage;
let renderer;
let ship;
let canvasSize = 290;
let overlaySize = 50;
let level = 0;
let path = [];
let nextStep;
let won;
let commandList;
let executionState = {
  "context": 'none',
  "error": false,
  "errorsCatchable": false,
};

/*
  drag and drop functionality
*/
function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  if ($(event.target).hasClass('codeblock')) {
    event.dataTransfer.setData("element", event.target.id);
  }
}

function drop(event) {
  event.preventDefault();
  const dataId = event.dataTransfer.getData("element");
  const target = event.target;

  // return if no data is being draged
  if (!dataId) {
    return;
  }

  // 'promise' blocks only allowed in solution container and only if the solution container is empty
  if (dataId === 'promiseBlock' && target.id === 'solutionContainer' && !$(target).children().length) {
    $(target).append($(`#${dataId}`).clone());
  }

  // 'then' blocks only allowed in solution container and only if there is a promise there
  if (dataId === 'thenBlock' && target.id === 'solutionContainer' && $(target).children('#promiseBlock').length) {
    $(target).append($(`#${dataId}`).clone());
  }

  // 'catch' blocks only allowed in solution container and only if there is a promise there
  if (dataId === 'catchBlock' && target.id === 'solutionContainer' && $(target).children('#promiseBlock').length) {
    $(target).append($(`#${dataId}`).clone());
  }

  // 'function' blocks only allowed in 'then' or 'catch' drop spaces, only one in 'catch' and up to two in 'then'
  if (dataId === 'functionBlock' && $(target).hasClass('methodDropspace') && !$(target).children().length) {
    if ($(target).parent('#thenBlock').length) {
      if (!$(target).siblings().length) {
        $(target).after($(target).clone());
      } else {
        $(target).before(',');
      }
    }
    $(target).append($(`#${dataId}`).clone());
  }

  // 'move' blocks only allowed in 'function' drop spaces
  if ((dataId === 'moveUpBlock' ||
      dataId === 'moveDownBlock' ||
      dataId === 'moveLeftBlock' ||
      dataId === 'moveRightBlock')
      && $(target).hasClass('functionDropspace')) {
    $(target).after($(target).clone());
    $(target).after($(target).clone().append($(`#${dataId}`).clone()));
  }
}

codeblocks.addEventListener('dragstart', drag);
solutionContainer.addEventListener('drop', drop);
solutionContainer.addEventListener('dragover', allowDrop);


/*
  space ship movement functions
*/

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

/*
  check current position for events
*/

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

/*
  solution tests
*/

const commandTable = {
  "launch": () => {
    if (executionState["context"] === 'none') {
      executionState["context"] = 'promise';
    }
  },
  ".then(": () => {
    if (executionState["context"] === 'promise') {
      executionState["context"] = 'method';
    }
  },
  ".catch(": () => {
    console.log('in catch with', executionState["context"]);
    console.log('in catch seeking', 'promise');
    if (executionState["context"] === 'promise') {
      executionState["errorsCatchable"] = true;
      executionState["context"] = 'method';
    }
  },
  ")": () => {
    executionState["context"] = 'promise';
    executionState["errorsCatchable"] = false;
  },
  "function() {": () => {
    if (executionState["context"] === 'method' && (executionState["errorsCatchable"] === executionState["error"])) {
      executionState["error"] = false;
      executionState["context"] = 'function';
    }
  },
  ",": () => {
    if (executionState["context"] === 'method') {
      executionState["errorsCatchable"] = true;
      console.log('might have caught error');
    }
  },
  "}": () => {
    if (executionState["context"] === 'function') {
      executionState["context"] = 'method';
    }
  },
  "moveUp();": () => {
    if (executionState["context"] === 'function') {
      position[1] += 1;
      moveTo();
    }
  },
  "moveDown();": () => {
    if (executionState["context"] === 'function') {
      position[1] -= 1
      moveTo();
    }
  },
  "moveLeft();": () => {
    if (executionState["context"] === 'function') {
      position[0] -= 1;
      moveTo();
    }
  },
  "moveRight();": () => {
    if (executionState["context"] === 'function') {
      position[0] += 1;
      moveTo();
    }
  },
}

function executeCommands() {
  if (commandList.length > 0) {
    console.log('position is', position);
    const command = commandList.shift();
    console.log('evaluating command:', command);
    console.log('with state:', executionState);
    if (Object.keys(commandTable).indexOf(command) + 1) {
      commandTable[command]();
    }
    console.log('path is', path);
    executeCommands();
  }
}

function trySolution() {
  commandList = solutionContainer.innerText.split('\n');

  console.log(commandList);

  executeCommands();

  nextStep = path.shift();

  $(`#x${starts[level][0]}y${starts[level][1]}`).removeClass('ship');
  gameLoop();

  // solutionList.pop();
  // executeCommands(solutionList);
}

$('#submitButton').click(trySolution);

/*
  level designs
*/

const wormholes = [
  {
    "x0y1": {"origin": [0, 1], "pass": [1, 2], "fail": [2, 1]},
  },
  {
    "x0y1": {"origin": [0, 1], "pass": [0, 3], "fail": [3, 3]},
    "x0y4": {"origin": [0, 4], "pass": [0, 6], "fail": [3, 3]},
    "x1y6": {"origin": [1, 6], "pass": [3, 6], "fail": [3, 3]},
    "x3y4": {"origin": [3, 4], "pass": [3, 6], "fail": [6, 4]},
    "x4y6": {"origin": [4, 6], "pass": [6, 6], "fail": [6, 4]},
  }
]

const goals = [
  [2, 2],
  [6, 5]
]

const starts = [
  [0, 0],
  [0, 0]
]

const mapSizes = [3, 7]

let position;

/*
  build map
*/

function makeCurve(startGrid, centerGrid, endGrid, color) {
  let unit = canvasSize / mapSizes[level];

  let start = [
    pixelCoordinates("x", startGrid[0], overlaySize),
    pixelCoordinates("y", startGrid[1], overlaySize)
  ];

  let center = [
    pixelCoordinates("x", centerGrid[0], overlaySize),
    pixelCoordinates("y", centerGrid[1], overlaySize)
  ];

  let end = [
    pixelCoordinates("x", endGrid[0], overlaySize),
    pixelCoordinates("y", endGrid[1], overlaySize)
  ];

  let c = document.getElementById("mapOverlay");
  let ctx = c.getContext("2d");
  ctx.beginPath();
  ctx.moveTo(start[0], start[1]);
  ctx.quadraticCurveTo(center[0], center[1], end[0], end[1]);
  ctx.lineWidth=1;
  ctx.lineCap="round";

  var gradient = ctx.createLinearGradient(start[0], start[1], end[0], end[1]);
  gradient.addColorStop("0", "#00c7ff");
  gradient.addColorStop(".25", "#00c7ff");
  gradient.addColorStop("1", color);
  ctx.strokeStyle = gradient;

  ctx.stroke();

}

function connectWormhole(wormhole) {
  let unit = canvasSize / mapSizes[level];

  let middleX = (wormhole["origin"][0] + wormhole["pass"][0] + wormhole["fail"][0]) / 3;
  let middleY = (wormhole["origin"][1] + wormhole["pass"][1] + wormhole["fail"][1]) / 3;
  let middle = [middleX, middleY];

  makeCurve(wormhole["origin"], middle, wormhole["pass"], "#5eff00");
  makeCurve(wormhole["origin"], middle, wormhole["fail"], "#ff005a");
}

function pixelCoordinates(axis, value, scale) {
  if (!scale) {
    scale = canvasSize;
  }
  if (axis === "x") {
    return (value + .5) * (scale / mapSizes[level]);
  }
  if (axis === "y") {
    return scale - (value + .5) * (scale / mapSizes[level]);
  }
}

function buildLevel(level) {
  populateMap(mapSizes[level]);

  position = starts[level].slice();

  $(`#x${goals[level][0]}y${goals[level][1]}`).addClass('goal');
  $(`#x${starts[level][0]}y${starts[level][1]}`).addClass('start');
  $(`#x${starts[level][0]}y${starts[level][1]}`).addClass('ship');

  let wormholeKeys = Object.keys(wormholes[level]);

  for (let i = 0; i < wormholeKeys.length; i++) {
    $(`#x${wormholes[level][wormholeKeys[i]]["origin"][0]}y${wormholes[level][wormholeKeys[i]]["origin"][1]}`).addClass('wormholeOrigin');

    $(`#x${wormholes[level][wormholeKeys[i]]["pass"][0]}y${wormholes[level][wormholeKeys[i]]["pass"][1]}`).addClass('wormholePass');

    $(`#x${wormholes[level][wormholeKeys[i]]["fail"][0]}y${wormholes[level][wormholeKeys[i]]["fail"][1]}`).addClass('wormholeFail');

    connectWormhole(wormholes[level][wormholeKeys[i]]);
    connectWormhole(wormholes[level][wormholeKeys[i]]);
  }

  var pixiContainer = document.getElementById('pixiOverlay');
  renderer = PIXI.autoDetectRenderer(canvasSize, canvasSize, {transparent: true});

  // var app = new PIXI.Application(canvasSize, canvasSize, {transparent: true});
  var mapContainer = document.getElementById('mapContainer');
  // mapContainer.append(app.view);
  mapContainer.append(renderer.view);
  stage = new PIXI.Container();
  renderer.render(stage);

  renderer.view.style.position = "absolute";

  ship = PIXI.Sprite.fromImage('css/assets/favicon.ico');

  ship.width = canvasSize / mapSizes[level];
  ship.height = canvasSize / mapSizes[level];

  ship.anchor.set(0.5);

  ship.x = pixelCoordinates("x", starts[level][0]);
  ship.y = pixelCoordinates("y", starts[level][1]);

  stage.addChild(ship);

  renderer.render(stage);
}

function moveAnimation(coordinates) {
  if (ship.x > coordinates[0]) {
    if (ship.x - coordinates[0] < 1) {
      ship.x = coordinates[0];
      nextStep = path.shift();
    } else {
      ship.x -= 1;
    }
  } else if (ship.x < coordinates[0]) {
    if (coordinates[0] - ship.x < 1) {
      ship.x = coordinates[0];
      nextStep = path.shift();
    } else {
      ship.x += 1;
    }
  } else if (ship.y > coordinates[1]) {
    if (ship.y - coordinates[1] < 1) {
      ship.y = coordinates[1];
      nextStep = path.shift();
    } else {
      ship.y -= 1;
    }
  } else if (ship.y < coordinates[1]) {
    if (coordinates[1] - ship.y < 1) {
      ship.y = coordinates[1];
      nextStep = path.shift();
    } else {
      ship.y += 1;
    }
  }
}

function warpOutAnimation() {
  ship.rotation += .05;
  ship.width -= (canvasSize / mapSizes[level]) / 80;
  ship.height -= (canvasSize / mapSizes[level]) / 80;
  if (ship.width < (canvasSize / mapSizes[level]) / 80) {
    nextStep = path.shift();
  }
}

function warpInAnimation(coordinates) {
  ship.x = coordinates[0];
  ship.y = coordinates[1];
  if (canvasSize / mapSizes[level] - ship.width < (canvasSize / mapSizes[level]) / 80) {
    ship.width = canvasSize / mapSizes[level];
    ship.height = canvasSize / mapSizes[level];
  } else {
    ship.width += (canvasSize / mapSizes[level]) / 80;
    ship.height += (canvasSize / mapSizes[level]) / 80;
  }
  if (ship.rotation < .05) {
    ship.rotation = 0;
  } else {
    ship.rotation -= .05;
  }
  if (ship.width === canvasSize / mapSizes[level] &&
       ship.rotation === 0) {
    nextStep = path.shift();
  }
}

function gameLoop() {

  //Loop this function at 60 frames per second


  //Update the current game state:
  if(nextStep) {
    requestAnimationFrame(gameLoop);
    nextStep["animation"](nextStep["destinationPixels"]);
    renderer.render(stage);
  }
}

function makeTile(scale, index) {
  const x = index % scale;
  const y = scale - 1 - Math.floor(index / scale);

  const tile = document.createElement('div');
  tile.className = 'tile';
  tile.id = `x${x}y${y}`;
  tile.style.width = `calc((100% / ${scale})`;
  tile.style.paddingBottom = `calc((100% / ${scale}) - 2px)`;
  return tile;
}

function populateMap(mapSize) {
  for (let i = 0; i < (mapSize * mapSize); i += 1) {
    map.appendChild(makeTile(mapSize, i));
  }
}

buildLevel(level);
