var scroll_button_added = false;

$(document).ready(function() {

      if (!scroll_button_added) {
        addScrollButton();
      }

      // Show or hide the sticky footer button
      $(window).scroll(function() {
        if ($(this).scrollTop() > 200) {
          $('.go-top').fadeIn(200);
        } else {
          $('.go-top').fadeOut(200);
        }
      });
      
      // Animate the scroll to top
      $('.go-top').click(function(event) {
        event.preventDefault();
        
        $('html, body').animate({scrollTop: 0}, 300);
      })
    });

function addScrollButton() {
  $('body').append('<a class="go-top">Top</a>');
  scroll_button_added = true;
}
