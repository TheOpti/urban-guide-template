window.addEventListener('DOMContentLoaded', function() {

  let navBar = document.getElementById('nav-bar');
  navBar.classList.add("navigation--theme-default");

  window.addEventListener('scroll', function(event) {
    console.log('SCROLL EVENT ', event);
    console.log('document ', window);

    if (window.scrollY > 50) {
      navBar.classList.remove('navigation--theme-default');
      navBar.classList.add('navigation--theme-fixed');
    } else {
      navBar.classList.remove('navigation--theme-fixed');
      navBar.classList.add('navigation--theme-default');
    }

  });

});
