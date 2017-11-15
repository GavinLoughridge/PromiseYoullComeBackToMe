// Example of how a level backend might look

let coordinates = [0,0];

  console.log('TRY TO GET TO [1, 1]!');

const ignition = new Promise((resolve, reject) => {
    console.log('blasting off');
  blastoff();
  resolve();
});

ignition.then((input) => {
    console.log('made it to', coordinates);
    console.log('trying to go right');
  return goRight();
    console.log('landed at', coordinates);
}).catch(
  (input) => {
    console.log('rerouted to', coordinates);
    console.log('trying to recover');
    console.log('recovered from:', input);
  goUp();
    console.log('landed at', coordinates);
}
).then((input) => {
  console.log('currently at', coordinates);
  console.log('DID YOU MAKE IT?');
})

function blastoff(input) {
    console.log('going up from', coordinates);
  const result = Math.random();

  if (result > 1) {
      console.log('oh no');
    coordinates[0] += 1;
    throw 'blast off fail';
  } else {
    coordinates[1] += 1;
  }
}

function goUp(input) {
    console.log('going up');
  const result = Math.random();

  if (result > 0) {
    coordinates[1] += 1;
    return coordinates;
  } else {
      console.log('oh no');
    throw 'forward fail';
  }
}

function goDown(input) {
    console.log('going down');
  const result = Math.random();

  if (result > 0) {
    coordinates[1] -= 1;
    return coordinates;
  } else {
      console.log('oh no');
    throw 'back fail';
  }
}

function goRight(input) {
    console.log('going right');
  const result = Math.random();

  if (result > 0) {
    return new Promise((resolve, reject) => {
        console.log('going right promise');

        setTimeout(function() {
          console.log('ran timeout');
          coordinates[0] += 1;
          resolve();
        }, 5000);
    });
  } else {
      console.log('oh no');
    throw 'right fail';
  }
}

function goLeft(input) {
    console.log('going left');
  const result = Math.random();

  if (result > 0.5) {
    coordinates[0] -= 1;
    return coordinates;
  } else {
      console.log('oh no');
    throw 'left fail';
  }
}
