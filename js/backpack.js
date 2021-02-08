'use strict';

window.backpack = (function () {
  var shopNode = document.querySelector('.setup-star');
  var artifactListNode = document.querySelector('.setup-artifacts');
  var draggedNode = null;
  var dragCleanUp = null;

  var onDragStart = function (evt) {
    var target = evt.target.closest('img');

    if (!target) {
      return;
    }

    draggedNode = evt.target;
    evt.dataTransfer.setData('text', evt.target.alt);

    dragCleanUp = subscribeDragArtifactList();
  };

  var onDrop = function (evt) {
    evt.target.style.backgroundColor = '';
    evt.target.appendChild(draggedNode);
  };

  var onDragenter = function (evt) {
    evt.target.style.backgroundColor = 'yellow';
  };

  var onDragOver = function (evt) {
    evt.preventDefault();
  };

  var onDragLeave = function (evt) {
    evt.target.style.backgroundColor = '';
  };

  var subscribeDragArtifactList = function () {
    artifactListNode.addEventListener('drop', onDrop);
    artifactListNode.addEventListener('dragenter', onDragenter);
    artifactListNode.addEventListener('dragover', onDragOver);
    artifactListNode.addEventListener('dragleave', onDragLeave);

    return function () {
      draggedNode = null;

      artifactListNode.removeEventListener('drop', onDrop);
      artifactListNode.removeEventListener('dragenter', onDragenter);
      artifactListNode.removeEventListener('dragover', onDragOver);
      artifactListNode.removeEventListener('dragleave', onDragLeave);
    };
  };

  var subscribeDragBackpack = function () {
    shopNode.addEventListener('dragstart', onDragStart);

    return function () {
      shopNode.removeEventListener('dragstart', onDragStart);

      if (dragCleanUp) {
        dragCleanUp();
      }
    };
  };

  return {
    subscribeDrag: subscribeDragBackpack
  };
})();
