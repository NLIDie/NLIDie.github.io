'use strict';

// file load.js

(function () {
  'use strict';

  var URL = 'https://rawgit.com/Varinetz/e6cbadec972e76a340c41a65fcc2a6b3/raw/90191826a3bac2ff0761040ed1d95c59f14eaf26/frontend_test_table.json';

  window.load = function (onSuccess, onError) {
    var xhr = new XMLHttpRequest();

    xhr.open('GET', URL);

    xhr.addEventListener('load', function (evt) {
      if (xhr.status === 200) {
        onSuccess(JSON.parse(xhr.responseText));
      } else {
        onError('\u041E\u0448\u0438\u0431\u043A\u0430 \u0437\u0430\u0433\u0440\u0443\u0437\u043A\u0438 \u0434\u0430\u043D\u043D\u044B\u0445: \u0441\u0442\u0430\u0442\u0443\u0441 ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function (evt) {
      onError('Произощла ошибка соединения');
    });

    xhr.addEventListener('timeout', function (evt) {
      onError('\u0417\u0430\u043F\u0440\u043E\u0441 \u043D\u0435 \u0443\u0441\u043F\u0435\u043B \u0432\u044B\u043F\u043E\u043B\u043D\u0438\u0442\u044C\u0441\u044F \u0437\u0430 ' + xhr.timeout + ' \u043C\u0441');
    });

    xhr.timeout = 10000;

    xhr.send();
  };
})();
'use strict';

// file setup.js

(function () {
  'use strict';

  var tableOrderCarList = document.querySelector('#table-order-car');
  var orderCarTemplate = document.querySelector('#template-order-car').content;

  var renderOrderCar = function renderOrderCar(orderCar) {
    var identificationOfStatus = function identificationOfStatus(carStatus) {
      switch (carStatus) {
        case 'pednding':
          return 'Ожидается';
        case 'out_of_stock':
          return 'Нет в наличии';
        case 'in_stock':
          return 'В наличии';
        default:
          return 'Нет в наличии';
      }
    };

    var carStatus = identificationOfStatus(orderCar.status);

    var carElement = orderCarTemplate.cloneNode(true);
    var carElementTable = carElement.querySelector('.table__item');

    carElement.querySelector('.table__item-value--title').textContent = orderCar.title;
    carElement.querySelector('.table__item-value--description').textContent = orderCar.description;
    carElement.querySelector('.table__item-value--description-mobile').textContent = orderCar.description;
    carElement.querySelector('.table__item-value--year').textContent = orderCar.year;
    carElement.querySelector('.indication-circle').classList.add('indication-circle--' + orderCar.color);
    carElement.querySelector('.table__item-value--status').textContent = carStatus;
    carElement.querySelector('.table__item-value--price').textContent = orderCar.price + ' \u0440\u0443\u0431.';

    carElement.querySelector('.btn--delete').addEventListener('click', function (evt) {
      carElementTable.remove();
    });

    return carElement;
  };

  var successHandler = function successHandler(orderCar) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < orderCar.length; i++) {
      fragment.appendChild(renderOrderCar(orderCar[i]));
    }

    tableOrderCarList.appendChild(fragment);
  };

  var errorHandler = function errorHandler(errorMessage) {
    var node = document.createElement('div');

    node.classList.add('error-message');
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  load(successHandler, errorHandler);
})();