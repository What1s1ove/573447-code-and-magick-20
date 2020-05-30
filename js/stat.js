'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var GAP = 10;
var TEXT_GAP = 20;
var FONT_GAP = 20;
var GIST_GAP = 30;
var BAR_GAP = 50;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var barResultHeight = BAR_HEIGHT + BAR_GAP;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
  ctx.strokeRect(x - 1, y - 1, CLOUD_WIDTH + 1, CLOUD_HEIGHT + 1);
};

var renderText = function (ctx, x, y, text) {
  ctx.font = '16px PT Mono';
  ctx.fillStyle = '#000000';
  ctx.fillText(text, x, y);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];

  for (var i = 0; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }

  return maxElement;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + GAP, CLOUD_Y + GAP, 'rgba(0, 0, 0, 0.7)');
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#ffffff');

  renderText(ctx, CLOUD_X + GAP + TEXT_GAP, CLOUD_Y + GAP + TEXT_GAP, 'Ура вы победили!');
  renderText(ctx, CLOUD_X + GAP + TEXT_GAP, CLOUD_Y + GAP + FONT_GAP + TEXT_GAP, 'Список результатов:');

  var maxTime = getMaxElement(times);

  for (var i = 0; i < players.length; i++) {
    ctx.fillStyle = '#000000';
    ctx.fillText(Math.round(times[i]), CLOUD_X + GAP + GIST_GAP + (BAR_GAP + BAR_WIDTH) * i, barResultHeight - ((BAR_HEIGHT * times[i]) / maxTime) + TEXT_GAP + GAP);
    ctx.fillText(players[i], CLOUD_X + GAP + GIST_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GAP);

    ctx.fillStyle = (players[i] === 'Вы') ? 'rgba(255, 0, 0, 1)' : 'rgb(0, 0, 255,' + Math.random() + ')';

    ctx.fillRect(CLOUD_X + GAP + GIST_GAP + (BAR_GAP + BAR_WIDTH) * i, CLOUD_HEIGHT - GIST_GAP, BAR_WIDTH, (-BAR_HEIGHT * times[i]) / maxTime);
  }
};
