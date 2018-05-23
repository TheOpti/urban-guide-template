const NAVBAR_HEIGHT = 60;

$(document).ready(() => {
  const navBar = $('#nav-bar');
  navBar.addClass("navigation--theme-default");

  $(window).on('scroll', (event) => {
    changeNavBar();
  });

  $(window).on('load', () => {
    createMap();
  });

  navBar.on('click', (event) => {
    if ($(event.target).hasClass('navigation__menu-item')) {
      const elemOffset = $(`#${event.target.dataset.section}`).offset().top;

      $('html, body').animate({
        scrollTop: elemOffset - NAVBAR_HEIGHT
      }, 750);
    }
  });

  function changeNavBar() {
    if (window.scrollY > 50) {
      navBar.removeClass('navigation--theme-default');
      navBar.addClass('navigation--theme-fixed');
    } else {
      navBar.removeClass('navigation--theme-fixed');
      navBar.addClass('navigation--theme-default');
    }
  }

  function createMap() {
    var mapProp = {
      center: new google.maps.LatLng(51.508742, -0.120850),
      zoom: 15,
      clickableIcons: true,
      disableDefaultUI: true,
      scrollwheel: false
    };

    var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);

    var marker = new google.maps.Marker({
      position: mapProp.center
    });

    marker.setMap(map);
  }

  changeNavBar();
});
