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
   *  Инициализация бота: отправка сообщения '/start', отображение навигации бота
   */

  $(function () {
    var top = 138;
    var MAGIC_RATIO = 1.431;
    setTimeout(function () {
      var article = document.createElement('article');
      article.innerHTML = '<p class="user-text">/start</p><div style="clear:both"></div>';
      $('#chat').append(article);
      var articleHeight = parseFloat($('article:first-of-type').height()),
          mainHeight = parseFloat($('#chat').outerHeight()),
          percent = articleHeight / mainHeight * 100;
      top -= percent;
      $('article:first-of-type').css('margin-top', top + '%');
      setTimeout(function () {
        $('footer>nav>ul>li').addClass('animated jackInTheBox fast');
        $('footer>nav>ul>li').css('display', 'block');
      }, 200);
    }, 800);
    /**
     *  Запрос на получение информации обо мне
     */

    $('li#about-me').on('click', function () {
      $('article').css('transition', 'all 0.1s linear');
      var article = document.createElement('article');
      article.innerHTML = "<p class=\"user-text\">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ullam sed eius totam ducimus consequatur, illo nobis rerum, placeat soluta magni ipsum sapiente expedita pariatur libero commodi laborum! Voluptatum, eveniet!</p><div style=\"clear:both\"></div>";
      $(article).addClass('animated fadeInUp faster');
      $('#chat').append(article);
      var articleHeight = Math.round(parseFloat($(article).outerHeight(true)) * 1000) / 1000,
          mainHeight = Math.round(parseFloat($('#chat').outerHeight()) * 1000) / 1000,
          percent = articleHeight / mainHeight * 100 * MAGIC_RATIO;
      top -= percent;

      if (top > 0) {
        $('article:first-of-type').css('margin-top', top + '%');
      } else {
        $(article).removeClass('animated fadeInUp faster');
        $('article').css('transition', 'none');
        $('article:first-of-type').css('margin-top', '2%');
        $(article).get(0).scrollIntoView({
          block: 'end',
          behavior: 'smooth'
        });
      }

      $('footer>nav>ul>li').css('pointer-events', 'none');
      var timerId = setInterval(function () {
        $('footer>nav>ul>li').css('pointer-events', 'auto');
        clearInterval(timerId);
      }, 400);
    });
  });
}(jQuery);