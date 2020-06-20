'use strict';

(function () {
  var userDialog = document.querySelector('.setup');
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var userDialogForm = userDialog.querySelector('.setup-wizard-form');
  var userDialogAvatar = userDialog.querySelector('.upload');
  var userDialogSimilar = userDialog.querySelector('.setup-similar');
  var wizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
  var coatInput = userDialog.querySelector('input[name="coat-color"]');
  var eyesInput = userDialog.querySelector('input[name="eyes-color"]');
  var fireballInput = userDialog.querySelector('input[name="fireball-color"]');
  var wizardFormCleanUp;

  var WIZARD_COLOR_SETTING_TYPES = {
    FILL: 'fill',
    BACKGROUND_COLOR: 'backgroundColor'
  };

  var setColorListener = function (wizardPart, input, styleProp, colors) {
    var listener = function () {
      var color = window.helpers.getRandomItem(colors);

      wizardPart.style[styleProp] = color;

      input.value = color;
    };

    wizardPart.addEventListener('click', listener);

    return listener;
  };

  var setFormListeners = function () {
    var coatColorListener = setColorListener(wizardCoat, coatInput, WIZARD_COLOR_SETTING_TYPES.FILL, window.constants.WIZARD_COAT_COLORS);
    var eyesColorListener = setColorListener(wizardEyes, eyesInput, WIZARD_COLOR_SETTING_TYPES.FILL, window.constants.WIZARD_EYES_COLORS);
    var fireballListener = setColorListener(wizardFireball, fireballInput, WIZARD_COLOR_SETTING_TYPES.BACKGROUND_COLOR, window.constants.WIZARD_FIREBALL_COLORS);
    var submitListener = setSubmitListener(userDialogForm);
    var dragListener = window.addDragListener(userDialogAvatar, userDialog);

    return function () {
      wizardCoat.removeEventListener('click', coatColorListener);
      wizardEyes.removeEventListener('click', eyesColorListener);
      wizardFireball.removeEventListener('click', fireballListener);
      userDialogAvatar.removeEventListener('mousedown', dragListener);
      userDialogForm.removeEventListener('submit', submitListener);
    };
  };

  var setSubmitListener = function (form) {
    var submitListener = function (evt) {
      var formData = new FormData(form);

      window.backend.save(
          function (_response) {
            userDialog.classList.add('hidden');
          },
          function () {},
          formData
      );

      evt.preventDefault();
    };

    form.addEventListener('submit', submitListener);

    return submitListener;
  };

  var onPopupEscPress = function (evt) {
    window.helpers.checkIsEscEvent(evt, closePopup);
  };

  var openPopup = function () {
    userDialog.classList.remove('hidden');
    userDialogSimilar.classList.remove('hidden');

    wizardFormCleanUp = setFormListeners();

    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');
    userDialogSimilar.classList.add('hidden');

    wizardFormCleanUp();

    document.removeEventListener('keydown', onPopupEscPress);
  };

  var initListeners = function () {
    userDialogOpen.addEventListener('click', function () {
      openPopup();
    });

    userDialogOpen.addEventListener('keydown', function (evt) {
      window.helpers.checkIsEnterEvent(evt, openPopup);
    });

    userDialogClose.addEventListener('click', function () {
      closePopup();
    });

    userDialogClose.addEventListener('keydown', function (evt) {
      window.helpers.checkIsEnterEvent(evt, closePopup);
    });
  };

  var init = function () {
    initListeners();
  };

  init();
})();
