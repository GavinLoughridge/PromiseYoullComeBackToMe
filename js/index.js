/*
  drag and drop functionality
*/
function allowDrop(ev) {
  ev.preventDefault();
}

function drag(event) {
  if ($(event.target).hasClass('codeblock')) {
    event.dataTransfer.setData("element", event.target.innerHTML);
  }
}

function drop(event) {
  event.preventDefault();
  if (event.dataTransfer.getData("element")) {
    event.target.innerHTML += event.dataTransfer.getData("element");
    event.target.innerHTML += ';<br>';
  }
}

codeblocks.addEventListener('dragstart', drag);
solutionContainer.addEventListener('drop', drop);
solutionContainer.addEventListener('dragover', allowDrop);

/*
  level solutions
*/
const endPosition1 = [2, 2];
let endPosition = endPosition1;
let startPosition = [0, 0];
let position = startPosition;

/*
  space ship movement functions
*/
function moveUp() {
  position[1] += 1;
}

function moveDown() {
  position[1] -= 1;
}

function moveRight() {
  position[0] += 1;
}

function moveLeft() {
  position[0] -= 1;
}

/*
  solution tests
*/
function checkSolutionCords() {
  console.log('position is', position);
  if (position === endPosition) {
    console.log('you lose');
  } else {
    console.log('you win');
  }
}

const commandTable = {
  "moveUp()": () => {moveUp();moveUp()},
  "moveDown()": () => {moveDown();moveDown()},
  "moveLeft()": () => {moveLeft();moveLeft()},
  "moveRight()": () => {moveRight();moveRight()},
}

function executeCommands(list) {
  if (list.length > 0) {
    console.log('position is', position);
    const command = list.shift();
    setTimeout(() => {
      $(`#x${position[0]}y${position[1]}`).toggleClass('ship');
      commandTable[command]();
      executeCommands(list);
      $(`#x${position[0]}y${position[1]}`).toggleClass('ship');
    }, 1000);
  } else {
    checkSolutionCords();
  }
}

function trySolution() {
  let solutionList = $('#solutionContainer').text().trim().split(';');
  solutionList.pop();
  executeCommands(solutionList);
}

$('#submitButton').click(trySolution);

/*
  build map
*/
const mapSize1 = 3;
let mapSize = mapSize1;

function makeTile(scale, index) {
  console.log('making tile');
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
  console.log('making map', mapSize);
  for (let i = 0; i < (mapSize * mapSize); i += 1) {
    map.appendChild(makeTile(mapSize, i));
  }
}

populateMap(mapSize);
console.log($("#x2y2"));
$("#x2y2").toggleClass('goal');
$("#x0y0").toggleClass('ship');
