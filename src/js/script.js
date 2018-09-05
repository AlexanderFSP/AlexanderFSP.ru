!(function($, undefined) {
  /**
   *  .status-bar__time | Отображение актуального времени на iPhone X
   */
  $('.status-bar__time time').ready(function() {
    const [ hours, minutes ] = new Date().toLocaleTimeString().split(':');
    $('.status-bar__time time').text(hours + ':' + minutes);
    $('.status-bar__time').css("background-position", "87.5% 79%");

    setInterval(function() {
      const [ hours, minutes ] = new Date().toLocaleTimeString().split(':');
      $('.status-bar__time time').text(hours + ':' + minutes);
    }, 2000);
  });

  /**
   *  Инициализация бота: отправка сообщения '/start', отображение навигации бота
   */
  $(function() {
    let top = 138;
    const MAGIC_RATIO = 1.431;
    setTimeout(function() {
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
      }, 200);
    }, 800);

    /**
     *  Запрос на получение информации обо мне
     */
    $('li#about-me').on('click', function() {
      $('article').css('transition', 'all 0.1s linear');

      const article = document.createElement('article');
      article.innerHTML = `<p class="user-text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Cum ullam sed eius totam ducimus consequatur, illo nobis rerum, placeat soluta magni ipsum sapiente expedita pariatur libero commodi laborum! Voluptatum, eveniet!</p><div style="clear:both"></div>`;
      $(article).addClass('animated fadeInUp faster');
      $('#chat').append(article);

      const articleHeight = Math.round(parseFloat($(article).outerHeight(true)) * 1000) / 1000,
            mainHeight    = Math.round(parseFloat($('#chat').outerHeight()) * 1000) / 1000,
            percent       = ((articleHeight / mainHeight) * 100) * MAGIC_RATIO;
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
      const timerId = setInterval(function() {
        $('footer>nav>ul>li').css('pointer-events', 'auto');
        clearInterval(timerId);
      }, 400);
    });
  });
})(jQuery);