
const NAVBAR_HEIGHT = 60;

$(document).ready(() => {
  let navBar = $('#nav-bar');
  navBar.addClass("navigation--theme-default");

  $(window).on('scroll', (event) => {
    if (window.scrollY > 50) {
      navBar.removeClass('navigation--theme-default');
      navBar.addClass('navigation--theme-fixed');
    } else {
      navBar.removeClass('navigation--theme-fixed');
      navBar.addClass('navigation--theme-default');
    }
  });

  navBar.on('click', (event) => {
    if ($(event.target).hasClass('navigation__menu-item')) {
      const elemOffset = $( `#${event.target.dataset.section}` ).offset().top;

      $('html, body').animate({
          scrollTop: elemOffset - NAVBAR_HEIGHT
      }, 750);
    }
  });
})
