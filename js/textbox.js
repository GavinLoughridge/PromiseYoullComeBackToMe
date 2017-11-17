let textbox = document.getElementById('textbox');

function appendToTextbox(string, resolve) {
  if (string.charAt(0) === '#') {
    textbox.innerHTML += "<br>";
  } else {
    textbox.innerHTML += string.charAt(0);
  }

  if (textbox.scrollHeight - textbox.scrollTop < 690) {
    textbox.scrollTop = textbox.scrollHeight;
  }

  if (string.length > 1) {
    setTimeout(function() {
      appendToTextbox(string.substring(1), resolve);
    }, 10)
  } else {
    resolve();
  }
}

function changeTextboxHeight(targetHeight, resolve) {
  console.log();
  if ($('.textboxContainer:first').height() + 6 > targetHeight) {
    if ($('.textboxContainer:first').css('height') + 6 - targetHeight < 10) {
      $('.textboxContainer:first').height(targetHeight - 6);
    } else {
      $('.textboxContainer:first').height(($('.textboxContainer:first').height()) - 5);
      setTimeout(function() {
        changeTextboxHeight(targetHeight, resolve);
      }, 10);
    }
  }
  if ($('.textboxContainer:first').height() + 6 < targetHeight) {
    if (targetHeight - $('.textboxContainer:first').css('height') - 6 < 10) {
      $('.textboxContainer:first').height(targetHeight - 6);
    } else {
      $('.textboxContainer:first').height(($('.textboxContainer:first').height()) + 5);
      setTimeout(function() {
        changeTextboxHeight(targetHeight, resolve);
      }, 30);
    }
  }
  if($('.textboxContainer:first').height() + 6 === targetHeight && resolve) {
    resolve();
  }
  textbox.scrollTop = textbox.scrollHeight;
}

//solution.scrollTop === solution.scrollHeight - 589

function revealLevel() {
  console.log('switching state');
  changeTextboxHeight(160);
  //$('.textboxContainer:first').css('animation', 'collapse 5s linear');
  //$('.textboxContainer:first').css('height', '160');
}

function checkForStart(event) {
  console.log('check start heard', event.which);
  if (event.which === 83) {
    $(window).off('keydown', checkForStart);
    if (gamestate === 'instructions') {
      buildLevel(level);
      revealLevel();
    }
    if (gamestate === 'lost') {
      buildLevel(level);
      let test1 = "##test";
      function test2() {
        return;
      }
      appendToTextbox(test1, test2);
    }
    gamestate = 'playing';
  }
}

function giveInstructions(text) {
  let myPromise = new Promise((resolve, reject) => {
    appendToTextbox(text, resolve);
  });

  myPromise.then(function() {
    console.log('listening for key');
    $(window).on('keydown', checkForStart);
  });
}

function startLevel(level) {
  giveInstructions(instructions[level]);
}
