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

  $(function () {
    // Происходит набор текста...
    var top = 138;
    var MAGIC_RATIO = 1.431;
    setTimeout(function () {
      var article = document.createElement('article');
      article.innerHTML = '<p class="user">/start</p><div style="clear:both"></div>';
      $('#chat').append(article);
      var articleHeight = parseFloat($('article:first-of-type').height());
      var mainHeight = parseFloat($('#chat').outerHeight());
      var percent = articleHeight / mainHeight * 100;
      top -= percent;
      console.log(articleHeight, mainHeight, percent);
      $('article:first-of-type').css('margin-top', top + '%');
    }, 1000);
    $('li#about-me').on('click', function () {
      var article = document.createElement('article');
      article.innerHTML = "<p class=\"user\">" + Math.random(1000) + "</p><div style=\"clear:both\"></div>";
      $('#chat').append(article);
      var articleHeight = Math.round(parseFloat($(article).outerHeight(true)) * 1000) / 1000;
      var mainHeight = Math.round(parseFloat($('#chat').outerHeight()) * 1000) / 1000;
      var percent = articleHeight / mainHeight * 100 * MAGIC_RATIO;
      top -= percent;
      console.log(articleHeight, mainHeight, percent);

      if (top > 0) {
        $('article:first-of-type').css('margin-top', top + '%');
      } else {
        $('article:first-of-type').css('margin-top', '2%');
        $('#chat').scrollTop($('#chat')[0].scrollHeight);
      }
    });
    $('li#portfolio').on('click', function () {
      var article = document.createElement('article');
      article.innerHTML = "<p class=\"user\">Dolores animi omnis dolore nisi repellendus ex at impedit odio iste libero sit asperiores alias quaerat nostrum nihil voluptatibus, error reiciendis earum.</p><div style=\"clear:both\"></div>";
      $('#chat').append(article);
      var articleHeight = Math.round(parseFloat($(article).outerHeight(true)) * 1000) / 1000;
      var mainHeight = Math.round(parseFloat($('#chat').outerHeight()) * 1000) / 1000;
      var percent = articleHeight / mainHeight * 100 * MAGIC_RATIO;
      top -= percent;
      console.log(articleHeight, mainHeight, percent);

      if (top > 0) {
        $('article:first-of-type').css('margin-top', top + '%');
      } else {
        $('article:first-of-type').css('margin-top', '2%');
        $('#chat').scrollTop($('#chat')[0].scrollHeight);
      }
    });
    $('li#offer-me').on('click', function () {
      var article = document.createElement('article');
      article.innerHTML = "<p class=\"user\">Dolores animi omnis dolore nisi repellendus ex at impedit odio iste libero sit asperiores alias quaerat nostrum nihil voluptatibus, error reiciendis earum.Dolores animi omnis dolore nisi repellendus ex at impedit odio iste libero sit asperiores alias quaerat nostrum nihil voluptatibus, error reiciendis earum.</p><div style=\"clear:both\"></div>";
      $('#chat').append(article);
      var articleHeight = Math.round(parseFloat($(article).outerHeight(true)) * 1000) / 1000;
      var mainHeight = Math.round(parseFloat($('#chat').outerHeight()) * 1000) / 1000;
      var percent = articleHeight / mainHeight * 100 * MAGIC_RATIO;
      top -= percent;
      console.log(articleHeight, mainHeight, percent);

      if (top > 0) {
        $('article:first-of-type').css('margin-top', top + '%');
      } else {
        $('article:first-of-type').css('margin-top', '2%');
        $('#chat').scrollTop($('#chat')[0].scrollHeight);
      }
    });
  });
}(jQuery);