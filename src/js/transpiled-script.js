"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

!function ($, undefined) {
  /**
   *  .status-bar__time | Отображение актуального времени на iPhone X
   */
  $('.status-bar__time time').ready(function () {
    var _toLocaleTimeString$s = new Date().toLocaleTimeString().split(':'),
        _toLocaleTimeString$s2 = _slicedToArray(_toLocaleTimeString$s, 2),
        hours = _toLocaleTimeString$s2[0],
        minutes = _toLocaleTimeString$s2[1];

    $('.status-bar__time time').text(hours + ':' + minutes);
    $('.status-bar__time').css("background-position", "87.5% 79%");
    setInterval(function () {
      var _toLocaleTimeString$s3 = new Date().toLocaleTimeString().split(':'),
          _toLocaleTimeString$s4 = _slicedToArray(_toLocaleTimeString$s3, 2),
          hours = _toLocaleTimeString$s4[0],
          minutes = _toLocaleTimeString$s4[1];

      $('.status-bar__time time').text(hours + ':' + minutes);
    }, 2000);
  });
  /**
   *  main | Отображение анимаций получения/отправки сообщений
   */

  $(function () {});
}(jQuery);