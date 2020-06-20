'use strict';

(function () {
  var WIZARDS_COUNT = 4;

  var userDialog = document.querySelector('.setup');
  var userDialogSimilar = userDialog.querySelector('.setup-similar');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    wizards.forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });

    similarListElement.appendChild(fragment);
  };

  var onLoadSuccess = function (wizards) {
    var shuffledWizards = window.helpers.getShuffledArray(wizards);

    renderWizards(shuffledWizards.slice(0, WIZARDS_COUNT));

    userDialogSimilar.classList.remove('hidden');
  };

  var onLoadFailure = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var initSetup = function () {
    window.backend.load(onLoadSuccess, onLoadFailure);
  };

  initSetup();
})();
