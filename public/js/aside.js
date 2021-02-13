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