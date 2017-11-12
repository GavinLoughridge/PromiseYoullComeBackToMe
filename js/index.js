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
function moveUp() {
  position[1] += 1;
  checkPosition();
}

function moveDown() {
  position[1] -= 1;
  checkPosition();
}

function moveRight() {
  position[0] += 1;
  checkPosition();
}

function moveLeft() {
  position[0] -= 1;
  checkPosition();
}

/*
  check current position for events
*/

function enterWormhole() {
  console.log('level wormholes', wormholes[level]);
  console.log('position is', `x${position[0]}y${position[1]}`);
  console.log('target wormhole', wormholes[level][`x${position[0]}y${position[1]}`]);
  let wormhole = wormholes[level][`x${position[0]}y${position[1]}`];
  if (Math.random() > .5) {
    console.log('wormhole success');
    position = wormhole["pass"];
  } else {
    console.log('wormhole fail');
    position = wormhole["fail"];
    executionState["error"] = true;
    executionState["context"] = 'promise';
  }
}

function checkPosition() {
  if ($(`#x${position[0]}y${position[1]}`).hasClass('wormholeOrigin')) {
    enterWormhole();
  } else if (!$(`#x${position[0]}y${position[1]}`).hasClass('goal')) {
    alert('you got lost in space!');
  }
}

/*
  solution tests
*/
function checkSolutionCords() {
  console.log('position is', position);
  if ($(`#x${position[0]}y${position[1]}`).hasClass('goal')) {
    console.log('you win');
  } else {
    console.log('you lose');
  }
}

let executionState = {
  "context": 'none',
  "error": false,
  "errorsCatchable": false,
}

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
    if (executionState["context"] === 'method') {
      executionState["context"] = 'promise';
      executionState["errorsCatchable"] = false;
    }
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
      moveUp();
    }
  },
  "moveDown();": () => {
    if (executionState["context"] === 'function') {
      moveDown();
    }
  },
  "moveLeft();": () => {
    if (executionState["context"] === 'function') {
      moveLeft();
    }
  },
  "moveRight();": () => {
    if (executionState["context"] === 'function') {
      moveRight();
    }
  },
}

function executeCommands(list) {
  if (list.length > 0) {
    console.log('position is', position);
    const command = list.shift();
    setTimeout(() => {
      $(`#x${position[0]}y${position[1]}`).toggleClass('ship');
      console.log('evaluating command:', command);
      console.log('with state:', executionState);
      if (Object.keys(commandTable).indexOf(command) + 1) {
        commandTable[command]();
      }
      executeCommands(list);
      $(`#x${position[0]}y${position[1]}`).toggleClass('ship');
    }, 1000);
  } else {
    checkSolutionCords();
  }
}

function trySolution() {
  let commandList = solutionContainer.innerText.split('\n');

  console.log(commandList);

  executeCommands(commandList);

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

function buildLevel(level) {
  populateMap(mapSizes[level]);

  position = starts[level].slice();

  $(`#x${goals[level][0]}y${goals[level][1]}`).addClass('goal');
  $(`#x${starts[level][0]}y${starts[level][1]}`).addClass('ship');
  let wormholeKeys = Object.keys(wormholes[level]);

  for (let i = 0; i < wormholeKeys.length; i++) {
    $(`#x${wormholes[level][wormholeKeys[i]]["origin"][0]}y${wormholes[level][wormholeKeys[i]]["origin"][1]}`).addClass('wormholeOrigin');
    $(`#x${wormholes[level][wormholeKeys[i]]["pass"][0]}y${wormholes[level][wormholeKeys[i]]["pass"][1]}`).addClass('wormholePass');
    $(`#x${wormholes[level][wormholeKeys[i]]["fail"][0]}y${wormholes[level][wormholeKeys[i]]["fail"][1]}`).addClass('wormholeFail');
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

let level = 1;
buildLevel(level);
