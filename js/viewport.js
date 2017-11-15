let viewportImages = [];
let retryingAPI = false;
let failuresAPI = 0;
let viewport = document.getElementById('viewport');

let rovers = ["curiosity", "opportunity", "spirit"];
let maxSol = {
  "curiosity": 1849,
  "opportunity": 4650,
  "spirit": 2208
}

function getViewportPhotos() {
  if (failuresAPI > 5) {
    return;
  }

  let rover = rovers[Math.floor(Math.random() * rovers.length)];
  let sol = Math.floor(Math.random() * maxSol[rover]);


  var $xhr = $.getJSON(`https://api.nasa.gov/mars-photos/api/v1/rovers/${rover}/photos?sol=${sol}&api_key=8ZXHhuX7oxCjmUKVYTWXo7EmyckGB7X27dVstz8x`);

  console.log('calling api, vars are', rover, sol);

  $xhr.then(function(data) {
    if ($xhr.status !== 200) {
      if ($xhr.status === 304) {
        throw `no images found`;
      }

      console.log('failure count', failuresAPI);
      failuresAPI += 1;
      return;
    }

    data.photos.forEach(function(photo) {
      viewportImages.push(photo["img_src"]);
    });
    retryingAPI = false;
    failuresAPI = 0;
  }).catch(function(error) {
    if (error === `no images found` && !retryingAPI) {
      retryingAPI = true;
      getViewportPhotos();
    }
  });
}

function updateViewport() {
  console.log('called update');
  console.log('image list is', viewportImages);
  if (viewportImages.length < 2) {
    console.log('called get', viewportImages.length);
    getViewportPhotos();
  }

  if (viewportImages.length > 0) {
    let index = Math.floor(Math.random() * viewportImages.length);
    viewportImage = viewportImages.splice(index, 1);

    console.log('settign to index', index);

    viewport.style.backgroundImage = `url(${viewportImage})`;
  }

  console.log('setting timeout');
  setTimeout(function() {
    updateViewport();
  }, 10000);
}
