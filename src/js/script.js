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
    const article = document.createElement('article'),
          articleClassName = (className === 'user-text') ? 'user-message' : 'bot-message';
    article.innerHTML = `<section class="content">
                           <p class="message-text">${message}</p>
                           <footer class="message-info sent">${("0" + new Date().getHours()).slice(-2) + ':' + ("0" + new Date().getMinutes()).slice(-2)}</footer>
                          </section>
                          <div style="clear:both"></div>`;
    $(article).addClass('animated fadeInUp faster');
    $(article).addClass(articleClassName);
    $('#chat').append(article);

    // Удаление уголочка предыдущего сообщения, если сообщение от того же адресата...
    if ($(article).prev().attr('class').includes(articleClassName)) {
      $(article).prev().css('background', 'none');
    }

    const articleHeight = Math.round(parseFloat($(article).outerHeight(true)) * 1000) / 1000,
            mainHeight  = Math.round(parseFloat($('#chat').outerHeight()) * 1000) / 1000,
            percent     = ((articleHeight / mainHeight) * 100) * 1.431;
    top -= percent;

    if (top > 0) {
      $('article:first-of-type').css('margin-top', top + '%');
    } else {
      $('article').removeClass('animated fadeInUp faster');
      $('article').css('transition', 'none');
      $('article:first-of-type').css('margin-top', '2%');

      $(article).get(0).scrollIntoView({ block: 'end',  behavior: 'smooth' });
    }

    $('footer>nav>ul>li').css('pointer-events', 'none');
    setTimeout(function() {
      $(article).find('footer').removeClass('sent');
      $(article).find('footer').addClass('read');
      $('footer>nav>ul>li').css('pointer-events', 'auto');
    }, 500);
  }

  /**
   *  Инициализация бота: отправка сообщения '/start', отображение навигации бота
   */
  $(function() {
    const BOT_ANSWER_DELAY = 800;

    // Ввод '/start' в input#text-message (имитация запуска бота через 1 сек. после подгрузки документа)...
    setTimeout(function printLetters(chars) {
      document.getElementById('text-message').value += chars.shift();
      if (chars.length) {
          setTimeout(printLetters, 200, chars);
      } else {
        $('#text-message').val('');
      }
    }, 1000, '/start'.split(''));

    //  Убираем disabled-эффект, отображение сообщения и навигационных кнопок бота...
    setTimeout(function() {
      $("#text-message").prop('disabled', false);
      $('.top-tg-bar__back').removeClass('disabled');

      const article = document.createElement('article');
      article.innerHTML = `
        <section class="content">
          <p class="message-text">/start_bot</p>
          <footer class="message-info sent">${("0" + new Date().getHours()).slice(-2) + ':' + ("0" + new Date().getMinutes()).slice(-2)}</footer>
        </section>
        <div style="clear:both"></div>`;
      $(article).addClass('animated fadeInUp faster');
      $(article).addClass('user-message');
      $('#chat').append(article);

      const articleHeight = parseFloat($('article:first-of-type').height()),
            mainHeight    = parseFloat($('#chat').outerHeight()),
            percent       = (articleHeight / mainHeight) * 100;
      top -= percent;
      $('article:first-of-type').css('margin-top', top + '%');

      setTimeout(function() {
        $(article).find('footer').removeClass('sent');
        $(article).find('footer').addClass('read');
      }, 500);

      setTimeout(function() {
        $('footer>nav>ul>li').addClass('animated jackInTheBox fast');
        $('footer>nav>ul>li').css('display', 'block');
        $('article').css('transition', 'all 0.1s linear');
        // Приветственное сообщение...
        postMessage('bot-text', 'Погоди-ка...');
      }, BOT_ANSWER_DELAY);
    }, 2200);

    /**
     *  Запрос на получение информации обо мне
     */
    $('li#about-me').on('click', function() {
      postMessage('user-text', 'Расскажи-ка о себе <img src="../img/thinking-face.png";">');
      setTimeout(function() {
        postMessage('bot-text', 'Погоди-ка...');
      }, BOT_ANSWER_DELAY);
    });

    /**
     *  Запрос на получение моего портфолио
     */
    $('li#portfolio').on('click', function() {
      postMessage('user-text', 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae similique laudantium modi repudiandae, architecto harum. Harum quas error obcaecati accusamus nesciunt enim itaque officiis sed ipsam, aliquam commodi quis totam.');
      setTimeout(function() {
        postMessage('bot-text', 'Погоди-ка...');
      }, BOT_ANSWER_DELAY);
    });
  });
})(jQuery);