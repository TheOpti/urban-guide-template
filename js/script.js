const NAVBAR_HEIGHT = 60;

$(document).ready(() => {
  const navBar = $('#nav-bar');
  navBar.addClass("navigation--theme-default");

  const menu = document.querySelector('.navigation__menu');
  const shadow = document.querySelector('.navigation__shadow');
  const hamburgerMenuBtn = document.querySelector('.navigation__menu-btn');

  navBar.on('click', (event) => {
    if ($(event.target).hasClass('navigation__menu-item')) {
      const elemOffset = $(`#${event.target.dataset.section}`).offset().top;

      $('html, body').animate({
        scrollTop: elemOffset - NAVBAR_HEIGHT
      }, 750);
    }
  });

  hamburgerMenuBtn.addEventListener('click', openMenu);
  shadow.addEventListener('click', closeMenu);

  $(window).on('scroll', changeNavBar);
  $(window).on('load', createMap);

  function openMenu() {
    menu.classList.toggle('navigation__menu--open');
    shadow.classList.toggle('navigation__shadow--open');
  }

  function closeMenu() {
    menu.classList.toggle('navigation__menu--open');
    shadow.classList.toggle('navigation__shadow--open');
  }

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
    const mapProp = {
      center: new google.maps.LatLng(51.508742, -0.120850),
      zoom: 15,
      clickableIcons: true,
      disableDefaultUI: true,
      scrollwheel: false
    };

    const map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
    const marker = new google.maps.Marker({
      position: mapProp.center
    });

    marker.setMap(map);
  }

  changeNavBar();
});
