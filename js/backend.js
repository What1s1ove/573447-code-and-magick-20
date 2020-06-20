'use strict';

window.backend = (function () {
  var BASE_URL = 'https://javascript.pages.academy/code-and-magick';
  var TIMEOUT_IN_MS = 10000;
  var StatusCode = {
    OK: 200
  };

  var sendRequest = function (method, path, onSuccess, onError, data) {
    var xhr = new XMLHttpRequest();
    var url = BASE_URL + path;

    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(method, url);

    xhr.send(data);
  };

  return {
    load: function (onSuccess, onError) {
      sendRequest('GET', '/data', onSuccess, onError);
    },
    save: function (onSuccess, onError, data) {
      sendRequest('POST', '', onSuccess, onError, data);
    }
  };
})();
