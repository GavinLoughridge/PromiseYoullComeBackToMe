/*
  drag and drop functionality
*/
let solution = document.getElementById('solution');
let codeblocks = document.getElementById('codeblocks');
let changeScrollPosition = false;
let draggedElement = false;
let draggedData = false;

function allowDrop(event) {
  event.preventDefault();
}

function allowDropRemove(event) {
  if (draggedElement &&
      !$(event.target).hasClass('solution')) {
    event.preventDefault();
  }
}

function drag(event) {
  if ($(event.target).hasClass('codeblock') &&
      ($(event.target).parent().prop('id') === 'codeblocks' ||
      $(event.target).parent().hasClass('methodDropspace'))) {
    event.dataTransfer.setData("element", event.target.id);
  }
}

function dragRemove(event) {
  if ($(event.target).hasClass('codeblock') &&
      (!$(event.target).hasClass('promise') ||
      $('#solution').children().length === 1) &&
      ($(event.target).parent().hasClass('solution') ||
      $(event.target).parent().hasClass('methodDropspace'))) {
    draggedElement = event.target;
  }
}

function drop(event) {
  event.preventDefault();
  const dataId = event.dataTransfer.getData("element");
  const target = event.target;

  // return if no data is being dragged
  if (!dataId) {
    return;
  }

  if (solution.scrollTop === solution.scrollHeight - 589) {
    changeScrollPosition = true;
  }

  // 'promise' blocks only allowed in solution container and only if the solution container is empty
  if (dataId === 'promiseBlock' && target.id === 'solution' && !$(target).children().length) {
    $(target).append($(`#${dataId}`).clone());
  }

  // 'then' blocks only allowed in solution container and only if there is a promise there
  if (dataId === 'thenBlock' && target.id === 'solution' && $(target).children('#promiseBlock').length) {
    $(target).append($(`#${dataId}`).clone());
  }

  // 'catch' blocks only allowed in solution container and only if there is a promise there
  if (dataId === 'catchBlock' && target.id === 'solution' && $(target).children('#promiseBlock').length) {
    $(target).append($(`#${dataId}`).clone());
  }

  // 'function' blocks only allowed in 'then' or 'catch' drop spaces, only one in 'catch' and up to two in 'then'
  if ((dataId === 'functionBlockMoveUp' ||
      dataId === 'functionBlockMoveDown' ||
      dataId === 'functionBlockMoveLeft' ||
      dataId === 'functionBlockMoveRight') && $(target).hasClass('methodDropspace') &&
      !$(target).children().length) {
    if ($(target).parent('#thenBlock').length) {
      if (!$(target).siblings().length) {
        $(target).after($(target).clone());
      }
    }
    $(target).append($(`#${dataId}`).clone());
  }

  // 'move' blocks only allowed in 'function' drop spaces
  if ((dataId === 'moveUpBlock' ||
      dataId === 'moveDownBlock' ||
      dataId === 'moveLeftBlock' ||
      dataId === 'moveRightBlock')
      && $(target).hasClass('functionDropspace')) {
    $(target).after($(target).clone());
    $(target).after($(target).clone().append($(`#${dataId}`).clone()));
  }

  if (changeScrollPosition) {
    solution.scrollTop = solution.scrollHeight;
    changeScrollPosition = false;
  }
  draggedData = false;
}

function dropRemove(event) {
  if ($(event.target).hasClass('solution')) {
    $(event.target).append(draggedElement);
  } else if (draggedElement &&
            !$(event.target).parents('#solution').length) {
    draggedElement.remove();
    draggedElement = false;
  }
}

codeblocks.addEventListener('dragstart', drag);
solution.addEventListener('dragstart', drag);
solution.addEventListener('drop', drop);
solution.addEventListener('dragover', allowDrop);
solution.addEventListener('dragstart', dragRemove);
window.addEventListener('dragover', allowDropRemove);
window.addEventListener('drop', dropRemove);
$('#clearButton').mousedown(function() {$('#solution').empty();});
