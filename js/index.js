let level = 0;
let gamestate = 'instructions';

function enterGame() {
  $(window).off('keydown', enterGame);
  $(window).on('keydown', userInput);
  console.log('entering game');
  $('#landing').css('display', 'none');
  startLevel(level);
}

function setLandingPagePhoto() {
  let year = (Math.floor(Math.random() * (2018 - 1995)) + 1995).toString();
  let month = (Math.floor(Math.random() * 12) + 1).toString();
  let day = (Math.floor(Math.random() * 28) + 1).toString();

  if (month.length === 1) {
    month = '0'.concat(month);
  }
  if (day.length === 1) {
    day = '0'.concat(day);
  }
  let date = year.concat('-').concat(month).concat('-').concat(day);

  console.log('YMDD', year, month, day, date);

  //date=${date}&

  var $xhr = $.getJSON(`https://api.nasa.gov/planetary/apod?api_key=8ZXHhuX7oxCjmUKVYTWXo7EmyckGB7X27dVstz8x`);

  console.log('asking for landing picture');
  $xhr.then(function(data) {
    if ($xhr.status !== 200) {
      return;
    }
    console.log('setting landing picture');
    landing.style.backgroundImage = `url(${data.url})`;
  });
}

setLandingPagePhoto();
$(window).on('keydown', enterGame);

updateViewport();

let userInputString = '';

function enterUserInput() {
  console.log(userInputString);
  switch (userInputString) {
    case "start":
      if (gamestate === 'instructions') {
        buildLevel(level);
        revealLevel();
        gamestate = 'playing';
      };
      if (gamestate === 'lost') {
        buildLevel(level);
        let lostReversalText = "##Causality reversed##";
        appendToTextbox(lostReversalText);
        gamestate = 'playing';
      };
      break;
    case "help":
      appendToTextbox(helpInfo);
      break;
    case "mission":
      appendToTextbox(missionInfo[level]);
      break;
    case "controls":
      appendToTextbox(controlInfo[level]);
      break;
    case "pep":
      appendToTextbox(promiseInfo[level]);
      break;
    default:
      appendToTextbox("##UNRECOGNIZED COMMAND##");
  }
  userInputString = '';
}

function userInput(event) {
  if (event.which === 13) {
    enterUserInput();
  } else if ((event.which > 64 && event.which < 91) || event.which === 32) {
    textbox.innerHTML += String.fromCharCode(event.which + 32);
    userInputString += String.fromCharCode(event.which + 32);
  }
}
