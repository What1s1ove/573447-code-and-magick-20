'use strict';

window.addDragListener = (function () {
  var addDragListener = function (dragElement, dragContainer) {
    var dragListener = function (evt) {
      evt.preventDefault();

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var wasDragged = false;

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        wasDragged = true;

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        dragContainer.style.top = (dragContainer.offsetTop - shift.y) + 'px';
        dragContainer.style.left = (dragContainer.offsetLeft - shift.x) + 'px';

      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);

        if (wasDragged) {
          var onClickPreventDefault = function (clickEvt) {
            clickEvt.preventDefault();

            dragElement.removeEventListener('click', onClickPreventDefault);
          };

          dragElement.addEventListener('click', onClickPreventDefault);
        }
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    dragElement.addEventListener('mousedown', dragListener);

    return dragListener;
  };

  return addDragListener;
})();
