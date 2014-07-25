
// swap space
var dragSrcEl = null;
var frameWidth = null;
var frameHeight = null;

function handleOnClick(e){
  // `e` is the mouse event
  // `this` is the element clicked
  e.preventDefault();
  console.log(e);
  console.log(this);
  // get the element inside this div with the class .count.
  var count_div = this.querySelector('.count');
  // get the current text, parse for the number, increase it by 1, and store it.
  var incrementor = parseInt(count_div.getAttribute('data-col-clicks')) + 1;
  // update the view
  count_div.setAttribute('data-col-clicks', incrementor);
  count_div.textContent = 'x ' + incrementor;
}

// callback that changes the object's opacity to 0.4
function handleDragStart(e) {
    // this.style.opacity = '0.4';

    dragSrcEl = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

// callback that allows the drop
function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';

    return false;
};

// occurs as soon as the draggable enter the element space
function handleDragEnter(e) {
    // this / e.target is the current hover target.
    this.classList.add('over');
}

// occurs as soon as the draggable leaves the element space
function handleDragLeave(e) {
    // this / e.target is previous element.
    this.classList.remove('over');
}

function handleDrop(e) {
    // this / e.target is current target element.
    if (e.stopPropagation) {
        e.stopPropagation(); // stop the redirect
    }

    // don't do anything if we are dropping on the same spot.
    if (dragSrcEl != this){
        // swap the element html with what's in the swap space
        dragSrcEl.innerHTML = this.innerHTML;
        this.innerHTML = e.dataTransfer.getData('text/html');
    }

    return false;
}

function handleDragEnd(e) {
    // this / e.target is the source node.
    [].forEach.call(cols, function (col) {
        col.classList.remove('over');
    });
}

var cols = document.querySelectorAll('#columns .column');
[].forEach.call(cols, function(col) {
    col.addEventListener('dragstart', handleDragStart, false);
    col.addEventListener('dragenter', handleDragEnter, false);
    col.addEventListener('dragover', handleDragOver, false);
    col.addEventListener('dragleave', handleDragLeave, false);
    col.addEventListener('drop', handleDrop, false);
    col.addEventListener('dragend', handleDragEnd, false);
    col.addEventListener('click', handleOnClick, false);
});
