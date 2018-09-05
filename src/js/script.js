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

  });
})(jQuery);