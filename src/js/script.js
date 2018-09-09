!(function($, undefined) {
  $(window).on('load', function() {
    setTimeout(function () {
      $('.wrapper').css('visibility', 'visible');
      $('.preloader').fadeOut('slow');
    }, 500);
  });


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
  function postMessage(className, message, left) {
    const article = document.createElement('article');
    article.innerHTML = `
      <section class="content">
        <p class="message-text">${message}</p>
        <span class="message-info sent">${("0" + new Date().getHours()).slice(-2) + ':' + ("0" + new Date().getMinutes()).slice(-2)}</span>
      </section>
      <div style="clear:both"></div>`;
    $(article).addClass('animated fadeInUp faster');
    $(article).addClass(className);
    if (className === 'bot-message') {
      $(article).find('.message-info').css('left', left);
    }
    $('#chat').append(article);

    // Удаление уголочка предыдущего сообщения, если сообщение от того же адресата...
    if ($(article).prev().attr('class').includes(className)) {
      $(article).prev().css('background', 'none');
    }

    if (className === 'user-message') {
      document.getElementById('user-sound').play();
    } else {
      document.getElementById('bot-sound').play();
    }

    const articleHeight = Math.round(parseFloat($(article).outerHeight(true)) * 1000) / 1000,
            mainHeight  = Math.round(parseFloat($('#chat').outerHeight()) * 1000) / 1000,
            percent     = ((articleHeight / mainHeight) * 100) * 1.46;
    top -= percent;

    if (top > 0) {
      $('article:first-of-type').css('margin-top', top + '%');
    } else {
      $('#chat').css('overflow-y', 'scroll');
      $('#chat').css('overflow-x', 'hidden');
      $('article').removeClass('animated fadeInUp faster');
      $('article').css('transition', 'none');
      $('article:first-of-type').css('margin-top', '2%');
      $(article).get(0).scrollIntoView({ block: 'end',  behavior: 'smooth' });
    }

    $('footer>nav>ul>li').css('pointer-events', 'none');
    setTimeout(function() {
      $(article).find('span').removeClass('sent');
      $(article).find('span').addClass('read');
      $('footer>nav>ul>li').css('pointer-events', 'auto');
    }, 400);
  }

  /**
   *  Инициализация бота: отправка сообщения '/start', отображение навигации бота
   */
  $(function() {
    $('li#start-bot').on('click', function() {
      $('.start-message').css('display', 'none');
      $('li#start-bot').css('pointer-events', 'none');

        const article = document.createElement('article');
        article.innerHTML = `
          <section class="content">
            <p class="message-text">/start</p>
            <span class="message-info sent">${("0" + new Date().getHours()).slice(-2) + ':' + ("0" + new Date().getMinutes()).slice(-2)}</span>
          </section>
          <div style="clear:both"></div>`;
        $(article).addClass('animated fadeInUp faster');
        $(article).addClass('user-message');
        $('#chat').append(article);

        const articleHeight = parseFloat($('article:first-of-type').height()),
              mainHeight    = parseFloat($('#chat').outerHeight()),
              percent       = (articleHeight / mainHeight) * 100;
        top -= percent;
        $('article:first-of-type').css('color', '#3260ad');

        $('article:first-of-type').css('margin-top', '158%');
        setTimeout(function() {
          document.getElementById('user-sound').play();
          $(article).find('span').removeClass('sent');
          $(article).find('span').addClass('read');
        }, 400);

        setTimeout(function() {
           $('article:first-of-type').css('margin-top', top + '%');
          $('li#start-bot').css('display', 'none');
          $('main').css('height', '67%');
          $('footer').css('height', '23%');
          $('.input-field').css('height', '21%');
          $('footer nav').css('height', '79%');
          $('footer>nav>ul>li:not(:first-child)').addClass('animated jackInTheBox fast');
          $('footer>nav>ul>li:not(:first-child)').css('display', 'block');
          $('article').css('transition', 'all 0.1s linear');
        }, 800);
    });
  });

  $(function() {
    /**
     *  Запрос на получение информации обо мне
     */
    $('li#about-me').on('click', function() {
      postMessage('user-message', 'Расскажи-ка о себе <img src="../img/thinking-face.png";">');
      setTimeout(function() {
        postMessage('bot-message', 
        `Меня зовут Александр. Мне 19 лет. В настоящее время проживаю в СПб. Студент 3-го курса СПбГУТ по направлению "Программная инженерия". Занимаюсь вёрсткой, front-end разработкой, а также написанием скриптов для автоматизации работы в браузере на связке iMacros v8.9.7 и Mozilla FF.`, '82%');
        setTimeout(function() {
          postMessage('bot-message', 
          `Знания, умения, навыки:<br>
           JavaScript: <strong>ES5, ES2015</strong><br>
           <strong>HTML5, CSS3</strong> (валидная, адаптивная верстка)<br>
           Препроцессор: <strong>SCSS</strong><br>
           <strong>jQuery, Bootstrap</strong><br>
           Сборка: <strong>Gulp</strong>`, '82%');
        }, 1200);
      }, 800);
    });
    /**
     *  Запрос на получение моего портфолио
     */
    $('li#portfolio').on('click', function() {
      postMessage('user-message', 'А чем занимался? <img src="../img/face-with-monoclepng.png";">');
      setTimeout(function() {
        postMessage('bot-message', 
        `Мои проекты:<br>
        <img src="../img/github_logo.png"> <a href="https://github.com/AlexanderFSP" target="_blank">github.com/AlexanderFSP</a><br>
        <img src="../img/rucaptcha.png"> <a href="https://rucaptcha.com/software/view/freebitcoin-multicaptcha-bot" target="_blank">MultiCaptchaBot / Топик</a><br>
        <img src="../img/wix.png"> <a href="https://multicaptchabot.wixsite.com/multicaptchabot" target="_blank">MultiCaptchaBot / Сайт</a>
        `, '77.8%');
      }, 900);
    });

    /**
     *  Запрос на соотрудничество
     */
    $('li#offer-me').on('click', function() {
      postMessage('user-message', 'Есть идея! <img src="../img/electric-light-bulb.png";"><img src="../img/rocket.png";"><img src="../img/money-bag.png";"><br>Сможешь помочь?');
      setTimeout(function() {
        postMessage('bot-message', 
          `Предложить работу вы можете связавшись со мной по электронной почте или через фриланс биржу:<br>
           <img src="../img/logo-fl.png"> <a href="https://www.fl.ru/users/AlexanderFSP/" target="_blank">fl.ru/users/AlexanderFSP</a><br>
           <img src="../img/mail.jpg"> <a href="mailto:alexanderfsp@mail.ru">alexanderfsp@mail.ru</a>
           `, '82%');
      }, 800);
    });

    /**
     *  Запрос на получение моих контактов
     */
    $('li#contacts').on('click', function() {
      postMessage('user-message', 'Как связаться? <img src="../img/telephone-receiver.png";">');
      setTimeout(function() {
        postMessage('bot-message', 
        `Связаться со мной можно любым из перечисленных ниже способов:<br>
        <img src="../img/vk.jpg"> <a href="https://vk.com/id66628645" target="_blank">vk.com/id66628645<br>
        <img src="../img/telegram.jpeg"> <a href="https://t.me/AlexanderFSP" target="_blank">@AlexanderFSP<br>
        <img src="../img/skype.png"> <a href="skype:live:7f3ffffbc5fd6a80" target="_blank">AlexanderFSP<br>
        <img src="../img/mail.jpg"> <a href="mailto:alexanderfsp@mail.ru">alexanderfsp@mail.ru</a>
        `, '82%');
      }, 1000);
    });
  });
})(jQuery);