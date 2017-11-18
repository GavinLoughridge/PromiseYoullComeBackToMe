let textbox = document.getElementById('textbox');

function appendToTextbox(string, resolve) {
  if (string.charAt(0) === '#') {
    textbox.innerHTML += "<br>";
  } else {
    textbox.innerHTML += string.charAt(0);
  }

  console.log(textbox.scrollHeight - textbox.scrollTop);
  console.log(parseInt($('#textbox').css('height').slice(0, -1)));

  if (textbox.scrollHeight - textbox.scrollTop < parseInt($('#textbox').css('height').slice(0, -1)) + 35) {
    textbox.scrollTop = textbox.scrollHeight;
  }

  if (string.length > 1) {
    setTimeout(function() {
      appendToTextbox(string.substring(1), resolve);
    }, 30)
  } else {
    if (typeof resolve === 'function') {
      resolve();
    }
  }
}

function changeTextboxHeight(targetHeight, resolve) {
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

function revealLevel() {
  changeTextboxHeight(160);
}

function giveInstructions(text) {
  let myPromise = new Promise((resolve, reject) => {
    appendToTextbox(text, resolve);
  });

  myPromise.then(function() {
    // should add smething to prevent typing while text is being displayed
    // or else should not run this as a promise
  });
}

function startLevel(level) {
  giveInstructions(instructions[level]);
}
