/*
  check solution
*/

let commandList;
let executionState = {
  "context": 'none',
  "error": false,
  "errorsCatchable": false,
};

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
    }
  },
  "}": () => {
    if (executionState["context"] === 'function') {
      executionState["context"] = 'method';
    }
  },
  "return moveUp();": () => {
    if (executionState["context"] === 'function') {
      position[1] += 1;
      moveTo();
    }
  },
  "return moveDown();": () => {
    if (executionState["context"] === 'function') {
      position[1] -= 1
      moveTo();
    }
  },
  "return moveLeft();": () => {
    if (executionState["context"] === 'function') {
      position[0] -= 1;
      moveTo();
    }
  },
  "return moveRight();": () => {
    if (executionState["context"] === 'function') {
      position[0] += 1;
      moveTo();
    }
  },
}

function executeCommands() {
  if (commandList.length > 0) {
    const command = commandList.shift();
    if (Object.keys(commandTable).indexOf(command) + 1) {
      commandTable[command]();
    }
    executeCommands();
  }
}

function trySolution() {
  if (gamestate !== 'playing') {
    return;
  }
  gamestate = 'checkingsolution';
  commandList = solution.innerText.split('\n');

  executionState = {
    "context": 'none',
    "error": false,
    "errorsCatchable": false,
  };

  executeCommands();

  createPixiContainer();

  nextStep = path.shift();

  $(`#x${starts[level][0]}y${starts[level][1]}`).removeClass('ship');
  gameLoop();
}

$('#submitButton').mousedown(trySolution);
