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
   *  main | Отображение анимаций получения/отправки сообщений
   */
  $(function() {
    // Происходит набор текста...

    let top = 138;
    const MAGIC_RATIO = 1.431;
    setTimeout(function() {
      const article = document.createElement('article');
      article.innerHTML = '<p class="user">/start</p><div style="clear:both"></div>';
      $('#chat').append(article);

      const articleHeight = parseFloat($('article:first-of-type').height());
      const mainHeight    = parseFloat($('#chat').outerHeight());
      const percent       = (articleHeight / mainHeight) * 100;
      top -= percent;
      console.log(articleHeight, mainHeight, percent);
      $('article:first-of-type').css('margin-top', top + '%');
    }, 1000);

    $('li#about-me').on('click', function() {
      const article = document.createElement('article');
      article.innerHTML = `<p class="user">${Math.random(1000)}</p><div style="clear:both"></div>`;
      $('#chat').append(article);

      const articleHeight = Math.round(parseFloat($(article).outerHeight(true)) * 1000) / 1000;
      const mainHeight    = Math.round(parseFloat($('#chat').outerHeight()) * 1000) / 1000;
      const percent       = ((articleHeight / mainHeight) * 100) * MAGIC_RATIO;
      top -= percent;
      console.log(articleHeight, mainHeight, percent);


      if (top > 0) {
        $('article:first-of-type').css('margin-top', top + '%');
      } else {
        $('article:first-of-type').css('margin-top', '2%');
        $('#chat').scrollTop($('#chat')[0].scrollHeight);
      }
    });

    $('li#portfolio').on('click', function() {
      const article = document.createElement('article');
      article.innerHTML = `<p class="user">Dolores animi omnis dolore nisi repellendus ex at impedit odio iste libero sit asperiores alias quaerat nostrum nihil voluptatibus, error reiciendis earum.</p><div style="clear:both"></div>`;
      $('#chat').append(article);

      const articleHeight = Math.round(parseFloat($(article).outerHeight(true)) * 1000) / 1000;
      const mainHeight    = Math.round(parseFloat($('#chat').outerHeight()) * 1000) / 1000;
      const percent       = ((articleHeight / mainHeight) * 100) * MAGIC_RATIO;
      top -= percent;
      console.log(articleHeight, mainHeight, percent);


      if (top > 0) {
        $('article:first-of-type').css('margin-top', top + '%');
      } else {
        $('article:first-of-type').css('margin-top', '2%');
        $('#chat').scrollTop($('#chat')[0].scrollHeight);
      }
    });

    $('li#offer-me').on('click', function() {
      const article = document.createElement('article');
      article.innerHTML = `<p class="user">Dolores animi omnis dolore nisi repellendus ex at impedit odio iste libero sit asperiores alias quaerat nostrum nihil voluptatibus, error reiciendis earum.Dolores animi omnis dolore nisi repellendus ex at impedit odio iste libero sit asperiores alias quaerat nostrum nihil voluptatibus, error reiciendis earum.</p><div style="clear:both"></div>`;
      $('#chat').append(article);

      const articleHeight = Math.round(parseFloat($(article).outerHeight(true)) * 1000) / 1000;
      const mainHeight    = Math.round(parseFloat($('#chat').outerHeight()) * 1000) / 1000;
      const percent       = ((articleHeight / mainHeight) * 100) * MAGIC_RATIO;
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
})(jQuery);