let textbox = document.getElementById('textbox');

function appendToTextbox(string) {
  if (string.charAt(0) === '#') {
    textbox.innerHTML += "<br>";
  } else {
    textbox.innerHTML += string.charAt(0);
  }

  textbox.scrollTop = textbox.scrollHeight;

  if (string.length > 1) {
    setTimeout(function() {
      appendToTextbox(string.substring(1));
    }, 20)
  }
}

let startText = "this is test content. lorum ipsum and all that stuff. i need a lot more text to test this. this is a game about time and space and everything that matters. you have to use javascript promises to make it out of deep space and back to earth and other stuff.##this is test content. lorum ipsum and all that stuff. i need a lot more text to test this. this is a game about time and space and everything that matters. you have to use javascript promises to make it out of deep space and back to earth and other stuff."
