// Example of drag and drop functionality

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("element", ev.target.outerHTML);
}

function drop(ev) {
    ev.preventDefault();
    console.log('target is', ev.target);
    blueBox.innerHTML = ev.dataTransfer.getData("element");
}

greenBox.addEventListener('dragstart', drag);
blueBox.addEventListener('drop', drop);
blueBox.addEventListener('dragover', allowDrop);
