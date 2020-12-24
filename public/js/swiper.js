const mySwiper = new Swiper('.swiper-container', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  setWrapperSize: false,

  autoplay: {
    delay: 5000,
    disableOnInteraction: false
  },

  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});