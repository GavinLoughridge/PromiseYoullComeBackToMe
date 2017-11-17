let stage;
let renderer;
let ship;
let loopCount = 0;
function moveAnimation(coordinates) {
  if (ship.x > coordinates[0]) {
    if (ship.x - coordinates[0] < 5) {
      ship.x = coordinates[0];
      nextStep = path.shift();
    } else {
      ship.x -= 5;
    }
  } else if (ship.x < coordinates[0]) {
    if (coordinates[0] - ship.x < 5) {
      ship.x = coordinates[0];
      nextStep = path.shift();
    } else {
      ship.x += 5;
    }
  } else if (ship.y > coordinates[1]) {
    if (ship.y - coordinates[1] < 5) {
      ship.y = coordinates[1];
      nextStep = path.shift();
    } else {
      ship.y -= 5;
    }
  } else if (ship.y < coordinates[1]) {
    if (coordinates[1] - ship.y < 5) {
      ship.y = coordinates[1];
      nextStep = path.shift();
    } else {
      ship.y += 5;
    }
  } else {
    ship.x = coordinates[0];
    ship.y = coordinates[1];
    nextStep = path.shift();
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
  if (nextStep) {
    requestAnimationFrame(gameLoop);
    nextStep["animation"](nextStep["destinationPixels"]);
    renderer.render(stage);
  } else {
    levelEnd();
  }
}

function createPixiContainer() {
  var pixiContainer = document.getElementById('pixiOverlay');
  renderer = PIXI.autoDetectRenderer(canvasSize, canvasSize, {transparent: true});

  var animationContainer = document.getElementById('animationContainer');
  animationContainer.append(renderer.view);
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
