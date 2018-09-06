!(function($, undefined) {
  /**
   *  .status-bar__time | Отображение актуального времени на iPhone X
   */
  $('.status-bar__time time').ready(function() {
    $('.status-bar__time time').text(("0" + new Date().getHours()).slice(-2) + ':' + ("0" + new Date().getMinutes()).slice(-2));
    $('.status-bar__time').css("background-position", "87.5% 79%");

    setInterval(function() {
      $('.status-bar__time time').text(("0" + new Date().getHours()).slice(-2) + ':' + ("0" + new Date().getMinutes()).slice(-2));
    }, 2000);
  });

  /**
   *  Нажатие на кнопку '< Back'
   */
  $(function() {
    $('.top-tg-bar__back').on('click', function() {
      $('main').addClass('animated flash fast');
      $('.top-tg-bar__back').addClass('disabled');
      setTimeout(() => {
        $('main').removeClass('animated flash fast');
        $('.top-tg-bar__back').removeClass('disabled');
      }, 900);
    });
  });

  /**
   *  Публикация сообщения
   */
  let top = 138;
  function postMessage(className, message) {
    const article = document.createElement('article');
    article.innerHTML = `<p class="${className}">${message}</p><div style="clear:both"></div>`;
    $(article).addClass('animated fadeInUp faster');
    $('#chat').append(article);

    const articleHeight = Math.round(parseFloat($(article).outerHeight(true)) * 1000) / 1000,
            mainHeight  = Math.round(parseFloat($('#chat').outerHeight()) * 1000) / 1000,
            percent     = ((articleHeight / mainHeight) * 100) * 1.431;
    top -= percent;

    if (top > 0) {
      $('article:first-of-type').css('margin-top', top + '%');
    } else {
      $(article).removeClass('animated fadeInUp faster');
      $('article').css('transition', 'none');
      $('article:first-of-type').css('margin-top', '2%');
      $(article).get(0).scrollIntoView({ block: 'end',  behavior: 'smooth' });
    }

    $('footer>nav>ul>li').css('pointer-events', 'none');
    setTimeout(function() {
      $('footer>nav>ul>li').css('pointer-events', 'auto');
    }, 500);
  }

  /**
   *  Инициализация бота: отправка сообщения '/start', отображение навигации бота
   */
  $(function() {
    (function printLetters(chars) {
        document.getElementById('text-message').value += chars.shift();
        if (chars.length) {
            setTimeout(printLetters, 200, chars);
        }
    })('/start'.split(''));

    setTimeout(function() {
      $("#text-message").prop('disabled', false);
      $('.top-tg-bar__back').removeClass('disabled');
      document.getElementById('text-message').value = '';

      const article = document.createElement('article');
      article.innerHTML = '<p class="user-text">/start</p><div style="clear:both"></div>';
      $('#chat').append(article);

      const articleHeight = parseFloat($('article:first-of-type').height()),
            mainHeight    = parseFloat($('#chat').outerHeight()),
            percent       = (articleHeight / mainHeight) * 100;
      top -= percent;
      $('article:first-of-type').css('margin-top', top + '%');

      setTimeout(function() {
        $('footer>nav>ul>li').addClass('animated jackInTheBox fast');
        $('footer>nav>ul>li').css('display', 'block');
        postMessage('bot-text', 'Погоди-ка...');
      }, 800);
    }, 1800);

    /**
     *  Запрос на получение информации обо мне
     */
    $('li#about-me').on('click', function() {
      $('article').css('transition', 'all 0.1s linear');
      postMessage('user-text', 'Расскажи-ка о себе <img src="../img/thinking-face.png";">');
      setTimeout(function() {
        postMessage('bot-text', 'Погоди-ка...');
      }, 800);
    });
  });
})(jQuery);