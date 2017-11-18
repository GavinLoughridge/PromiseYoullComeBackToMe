/*
  build map
*/

let overlaySize = 50;
let canvasSize = 462;
let ctx;
let canvas

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

  canvas = document.getElementById("mapOverlay");
  ctx = canvas.getContext("2d");
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

  if (wormhole["fail"]) {
    let middleX = (wormhole["origin"][0] + wormhole["pass"][0] + wormhole["fail"][0]) / 3;
    let middleY = (wormhole["origin"][1] + wormhole["pass"][1] + wormhole["fail"][1]) / 3;
    let middle = [middleX, middleY];

    makeCurve(wormhole["origin"], middle, wormhole["pass"], "#5eff00");
    makeCurve(wormhole["origin"], middle, wormhole["fail"], "#ff005a");
  } else {
    let middle = [(wormhole["origin"][0] + wormhole["pass"][0]) / 2, (wormhole["origin"][1] + wormhole["pass"][1]) / 2];
    makeCurve(wormhole["origin"], middle, wormhole["pass"], "#5eff00");
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

function buildLevel(level) {
  $('#map').empty();
  if ($('canvas').length === 2) {
    $('canvas')[1].remove();
  }

  if (ctx) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  populateMap(mapSizes[level]);

  position = starts[level].slice();

  for (let i = 0; i < safeSquares[level].length ; i++) {
    $(`#x${safeSquares[level][i][0]}y${safeSquares[level][i][1]}`).addClass('safe');
  }

  $(`#x${goals[level][0]}y${goals[level][1]}`).addClass('goal');
  $(`#x${starts[level][0]}y${starts[level][1]}`).addClass('start');
  $(`#x${starts[level][0]}y${starts[level][1]}`).addClass('ship');

  let wormholeKeys = Object.keys(wormholes[level]);

  for (let i = 0; i < wormholeKeys.length; i++) {
    $(`#x${wormholes[level][wormholeKeys[i]]["origin"][0]}y${wormholes[level][wormholeKeys[i]]["origin"][1]}`).addClass('wormholeOrigin');

    $(`#x${wormholes[level][wormholeKeys[i]]["pass"][0]}y${wormholes[level][wormholeKeys[i]]["pass"][1]}`).addClass('wormholePass');

    if (wormholes[level][wormholeKeys[i]]["fail"]) {
      $(`#x${wormholes[level][wormholeKeys[i]]["fail"][0]}y${wormholes[level][wormholeKeys[i]]["fail"][1]}`).addClass('wormholeFail');
    }

    connectWormhole(wormholes[level][wormholeKeys[i]]);
    connectWormhole(wormholes[level][wormholeKeys[i]]);
  }

  for (let i = 0; i < mapSizes[level]; i++) {
    for (let j = 0; j < mapSizes[level]; j++) {
      if ($(`#x${i}y${j}`).attr('class') === 'tile') {
        $(`#x${i}y${j}`).css('background-image', `url(css/assets/sargossa-${Math.floor(Math.random() * 5)}.jpg)`);
      }
    }
  }
}
