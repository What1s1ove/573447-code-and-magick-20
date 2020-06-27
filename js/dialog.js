'use strict';

window.dialog = (function () {
  var userDialog = document.querySelector('.setup');
  var userDialogOpen = document.querySelector('.setup-open');
  var userDialogClose = userDialog.querySelector('.setup-close');
  var userDialogForm = userDialog.querySelector('.setup-wizard-form');
  var userDialogAvatar = userDialog.querySelector('.upload');
  var wizardCoat = userDialog.querySelector('.setup-wizard .wizard-coat');
  var wizardEyes = userDialog.querySelector('.setup-wizard .wizard-eyes');
  var wizardFireball = userDialog.querySelector('.setup-fireball-wrap');
  var coatInput = userDialog.querySelector('input[name="coat-color"]');
  var eyesInput = userDialog.querySelector('input[name="eyes-color"]');
  var fireballInput = userDialog.querySelector('input[name="fireball-color"]');
  var wizardFormCleanUp;

  var WizardColorSettingsType = {
    FILL: 'fill',
    BACKGROUND_COLOR: 'backgroundColor'
  };

  var changeSimilarList = function () {
    window.similarList.changeListSettings({
      colorCoat: coatInput.value,
      colorEyes: eyesInput.value,
      colorFireball: fireballInput.value
    });
  };

  var setColorListener = function (wizardPart, input, styleProp, colors, cb) {
    var listener = function () {
      var color = window.helpers.getRandomItem(colors);

      wizardPart.style[styleProp] = color;

      input.value = color;

      if (cb) {
        cb();
      }
    };

    wizardPart.addEventListener('click', listener);

    return listener;
  };

  var setFormListeners = function () {
    var coatColorListener = setColorListener(
        wizardCoat,
        coatInput,
        WizardColorSettingsType.FILL,
        window.constants.WIZARD_COAT_COLORS,
        changeSimilarList
    );
    var eyesColorListener = setColorListener(
        wizardEyes,
        eyesInput,
        WizardColorSettingsType.FILL,
        window.constants.WIZARD_EYES_COLORS,
        changeSimilarList
    );
    var fireballListener = setColorListener(
        wizardFireball,
        fireballInput,
        WizardColorSettingsType.BACKGROUND_COLOR,
        window.constants.WIZARD_FIREBALL_COLORS,
        changeSimilarList
    );
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

    wizardFormCleanUp = setFormListeners();

    document.addEventListener('keydown', onPopupEscPress);
  };

  var closePopup = function () {
    userDialog.classList.add('hidden');

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

    changeSimilarList();
  };

  init();
})();
