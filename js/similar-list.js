'use strict';

window.similarList = (function () {
  var localWizards = [];
  var rankCostMap = {
    'colorCoat': 2,
    'colorEyes': 1,
    'colorFireball': 1
  };
  var similarSettings = {
    colorCoat: null,
    colorEyes: null,
    colorFireball: null
  };

  var getRank = function (wizard) {
    var rank = Object.keys(similarSettings).reduce(function (acc, key) {
      var newRank = wizard[key] === similarSettings[key]
        ? acc += rankCostMap[key]
        : acc;

      return newRank;
    }, 0);

    return rank;
  };

  var updateWizards = function (wizards) {
    var sortedWizards = wizards.sort(function (a, b) {
      var rankDiff = getRank(b) - getRank(a);

      if (rankDiff === 0) {
        rankDiff = b.name.localeCompare(a.name);
      }

      return rankDiff;
    });

    window.render(sortedWizards);
  };

  var changeListSettings = function (newSettings) {
    similarSettings = Object.assign(similarSettings, newSettings);

    updateWizards(localWizards);
  };

  var onLoadSuccess = function (wizards) {
    localWizards = wizards;

    updateWizards(localWizards);
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

  var initSimilarList = function () {
    window.backend.load(onLoadSuccess, onLoadFailure);
  };

  initSimilarList();

  return {
    changeListSettings: changeListSettings
  };
})();
