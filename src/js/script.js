!(function($, undefined) {
  /**
   *  .status-bar__time | Отображение актуального времемни на iPhone X
   */
  $('.status-bar__time time').ready(function() {
    setInterval(function() {
      const [ hours, minutes ] = new Date().toLocaleTimeString().split(':');

      document.querySelector('.status-bar__time time').innerText = hours + ':' + minutes;
      $('.status-bar__time').css("background-position", "87.5% 79%");
    }, 1000);
  });

  /**
   *  main | Отображение анимаций получения/отправки сообщений
   */
  $(function() {

  });
})(jQuery);