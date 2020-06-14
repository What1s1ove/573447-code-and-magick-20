'use strict';

(function () {
  var WIZARDS_COUNT = 4;

  var userDialog = document.querySelector('.setup');
  var similarListElement = userDialog.querySelector('.setup-similar-list');
  var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

  var getWizards = function (count) {
    var wizards = [];

    for (var i = 0; i < count; i++) {
      var wizardName = window.helpers.getRandomItem(window.constants.WIZARD_NAMES) + ' ' + window.helpers.getRandomItem(window.constants.WIZARD_SURNAMES);
      var wizardCoatColor = window.helpers.getRandomItem(window.constants.WIZARD_COAT_COLORS);
      var wizardEyesColor = window.helpers.getRandomItem(window.constants.WIZARD_EYES_COLORS);

      var wizard = {
        name: wizardName,
        coatColor: wizardCoatColor,
        eyesColor: wizardEyesColor
      };

      wizards.push(wizard);
    }

    return wizards;
  };

  var renderWizard = function (wizard) {
    var wizardElement = similarWizardTemplate.cloneNode(true);

    wizardElement.querySelector('.setup-similar-label').textContent = wizard.name;
    wizardElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
    wizardElement.querySelector('.wizard-eyes').style.fill = wizard.eyesColor;

    return wizardElement;
  };

  var renderWizards = function (wizards) {
    var fragment = document.createDocumentFragment();

    wizards.forEach(function (wizard) {
      fragment.appendChild(renderWizard(wizard));
    });

    similarListElement.appendChild(fragment);
  };

  var initSetup = function (wizards) {
    renderWizards(wizards);
  };

  var wizards = getWizards(WIZARDS_COUNT);

  initSetup(wizards);
})();
