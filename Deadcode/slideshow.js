const track = document.querySelector('.carouseltrack');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carouselbutton.right');
const prevButton = document.querySelector('.carouselbutton.left');
const dotsNav = document.querySelector('.carouselnav');
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

slides.forEach((slide, index) => {
  slide.style.left = slideWidth * index + 'px';
})
// when I click left, move slides to the left
// when i click right, move slides to the right
// when i click the nav indicators, move to the selected slide
