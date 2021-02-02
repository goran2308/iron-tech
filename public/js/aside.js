const cog = document.querySelector('.cog');
const mobileNav = document.querySelector('aside');
const closeButton = document.querySelector('.fa-times');

cog.addEventListener('click', cogClick);
closeButton.addEventListener('click', closeClick);

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