'use strict';

window.render = (function () {
  var WIZARDS_COUNT = 4;
  var similar = document.querySelector('.setup-similar');
  var similarList = similar.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.colorCoat;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.colorEyes;

    return wizardElement;
  };

  var renderWizards = function (wizards, length) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < length; i++) {
      var wizard = renderWizard(wizards[i]);

      fragment.appendChild(wizard);
    }

    similarList.appendChild(fragment);
  };

  return function (wizards) {
    var takeNumber = wizards.length > WIZARDS_COUNT ? WIZARDS_COUNT : wizards.length;

    similarList.innerHTML = '';

    renderWizards(wizards, takeNumber);

    similar.classList.remove('hidden');
  };
})();
