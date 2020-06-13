'use strict';

var WIZARDS_COUNT = 4;
var WIZARD_NAMES = ['Иван', 'Хуан Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var WIZARD_COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var WIZARD_EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var WIZARD_FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];

var WIZARD_COLOR_SETTINGS = {
  FILL: 'fill',
  BACKGROUND_COLOR: 'backgroundColor'
};

var userDialog = document.querySelector('.setup');
var userDialogOpen = document.querySelector('.setup-open');
var userDialogClose = userDialog.querySelector('.setup-close');
var userDialogSimilar = userDialog.querySelector('.setup-similar');
var wizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
var wizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
var coatInput = userDialog.querySelector('input[name="coat-color"]');
var eyesInput = userDialog.querySelector('input[name="eyes-color"]');
var fireballInput = userDialog.querySelector('input[name="fireball-color"]');
var similarListElement = userDialog.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var wizardSettingsCleanUp;

var getRandomNumber = function (min, max) {
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;

  return randomNumber;
};

var getRandomItem = function (arr) {
  var min = 0;
  var max = arr.length - 1;

  var randomIdx = getRandomNumber(min, max);

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

var setColorListener = function (wizardPart, input, styleProp, colors) {
  var listener = function () {
    var color = getRandomItem(colors);

    wizardPart.style[styleProp] = color;

    input.value = color;
  };

  wizardPart.addEventListener('click', listener);

  return listener;
};

var setColorListeners = function () {
  var coatColorListener = setColorListener(wizardCoat, coatInput, WIZARD_COLOR_SETTINGS.FILL, WIZARD_COAT_COLORS);
  var eyesColorListener = setColorListener(wizardEyes, eyesInput, WIZARD_COLOR_SETTINGS.FILL, WIZARD_EYES_COLORS);
  var fireballListener = setColorListener(wizardFireball, fireballInput, WIZARD_COLOR_SETTINGS.BACKGROUND_COLOR, WIZARD_FIREBALL_COLORS);

  return function () {
    wizardCoat.removeEventListener('click', coatColorListener);
    wizardEyes.removeEventListener('click', eyesColorListener);
    wizardFireball.removeEventListener('click', fireballListener);
  };
};

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();

    closePopup();
  }
};

var openPopup = function () {
  userDialog.classList.remove('hidden');
  userDialogSimilar.classList.remove('hidden');

  wizardSettingsCleanUp = setColorListeners();

  document.addEventListener('keydown', onPopupEscPress);
};

var closePopup = function () {
  userDialog.classList.add('hidden');
  userDialogSimilar.classList.add('hidden');

  wizardSettingsCleanUp();

  document.removeEventListener('keydown', onPopupEscPress);
};

var initAppListeners = function () {
  userDialogOpen.addEventListener('click', function () {
    openPopup();
  });

  userDialogOpen.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      openPopup();
    }
  });

  userDialogClose.addEventListener('click', function () {
    closePopup();
  });

  userDialogClose.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      closePopup();
    }
  });
};

var initApp = function (wizards) {
  renderWizards(wizards);

  initAppListeners();
};

var wizards = getWizards(WIZARDS_COUNT);

initApp(wizards);
