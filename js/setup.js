'use strict';

var WIZARDS_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];

var userDialog = document.querySelector('.setup');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandomItem = function (arr) {
  var min = 0;
  var max = arr.length - 1;

  var randomIdx = Math.round(min - 0.5 + Math.random() * (max - min + 1));

  var randomItem = arr[randomIdx];

  return randomItem;
};

var getWizards = function (count) {
  var wizards = [];

  for (var i = 0; i < count; i++) {
    var wizardName = getRandomItem(WIZARD_NAMES) + ' ' + getRandomItem(WIZARD_SURNAMES);
    var wizardCoatColor = getRandomItem(WIZARD_COAT_COLORS);
    var wizardEyesColor = getRandomItem(WIZARD_EYES_COLORS);

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
  wizardElement.querySelector('.wizard-eyes');

  return wizardElement;
};

var wizards = getWizards(WIZARDS_COUNT);
var fragment = document.createDocumentFragment();

userDialog.classList.remove('hidden');

wizards.forEach(function (wizard) {
  fragment.appendChild(renderWizard(wizard));
});

similarListElement.appendChild(fragment);

userDialog.querySelector('.setup-similar').classList.remove('hidden');
