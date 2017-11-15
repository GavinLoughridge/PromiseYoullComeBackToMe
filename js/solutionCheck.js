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
  commandList = solution.innerText.split('\n');

  console.log(commandList);

  executeCommands();

  createPixiContainer();

  nextStep = path.shift();

  $(`#x${starts[level][0]}y${starts[level][1]}`).removeClass('ship');
  gameLoop();
}

$('#submitButton').click(trySolution);
