const NAVBAR_HEIGHT = 60;

document.addEventListener('DOMContentLoaded', () => {
  const navBar = document.querySelector('#nav-bar');
  const menu = document.querySelector('.navigation__menu');
  const shadow = document.querySelector('.navigation__shadow');
  const menuBtn = document.querySelector('.navigation__menu-btn');

  init();

  function init() {
    navBar.classList.add('navigation--theme-default');

    document.addEventListener('scroll', changeNavBar);
    navBar.addEventListener('click', handleNavbarClick);
    menuBtn.addEventListener('click', openMenu);
    shadow.addEventListener('click', closeMenu);

    changeNavBar();
    createMap();
  }

  function handleNavbarClick(event) {
    if (event.target.classList.contains('navigation__menu-item')) {
      const elementToScroll = document.querySelector(`#${event.target.dataset.section}`);
      const elemOffset = elementToScroll.offsetTop;
      console.log('elemOffset ', elemOffset);

      window.scroll({
        top: elemOffset - NAVBAR_HEIGHT,
        behavior: 'smooth'
      });
    }
  }

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
      navBar.classList.remove('navigation--theme-default');
      navBar.classList.add('navigation--theme-fixed');
    } else {
      navBar.classList.remove('navigation--theme-fixed');
      navBar.classList.add('navigation--theme-default');
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

    const map = new google.maps.Map(document.getElementById('googleMap'), mapProp);
    const marker = new google.maps.Marker({
      position: mapProp.center
    });

    marker.setMap(map);
  }
});
