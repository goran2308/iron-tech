// Mobile navigation events
const cog = document.querySelector('.cog');
const mobileNav = document.querySelector('aside');
const closeButton = document.querySelector('.fa-times');
const navLinks = document.querySelectorAll('.sideNav-links');

cog.addEventListener('click', cogClick);
closeButton.addEventListener('click', closeClick);

navLinks.forEach(element => {
  element.addEventListener('click', closeClick);
});

function cogClick() {
  if (mobileNav.style.display = 'none') {
    mobileNav.style.display = 'flex'
  } else {
    mobileNav.style.display = 'none'
  }
};

function closeClick() {
  if (mobileNav.style.display = 'flex') {
    mobileNav.style.display = 'none'
  } else {
    mobileNav.style.display = 'flex'
  }
};



// Hide the navigation on scroll down
(function () {

  const doc = document.documentElement;
  const w = window;

  let prevScroll = w.scrollY || doc.scrollTop;
  let curScroll;
  let direction = 0;
  let prevDirection = 0;

  let header = document.querySelector('.navbar');

  const checkScroll = function () {
    curScroll = w.scrollY || doc.scrollTop;

    if (curScroll > prevScroll) {
      direction = 2;
    } else if (curScroll < prevScroll) {
      direction = 1;
    }

    if (direction !== prevDirection) {
      toggleHeader(direction, curScroll);
    }

    prevScroll = curScroll;
  };


  const toggleHeader = function (direction, curScroll) {
    if (direction === 2 && curScroll > 108) {
      header.classList.add('hide');
      prevDirection = direction;
    } else if (direction === 1) {
      header.classList.remove('hide');
      prevDirection = direction;
    }
  };

  window.addEventListener('scroll', checkScroll);

})();