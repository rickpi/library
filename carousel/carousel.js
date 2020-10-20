/**
 * @constructor
 * @param {HTMLElement} container optionnal
 * 
 * HTML/CSS Structure
 * .carousel
 *    .carousel__inner
 *        .carousel__slide*n
 *    ul.carousel__nav (optionnal)
 *        li.carousel__nav__item*n
 *    .carousel__arrow.carousel__arrow--prev (optionnal)
 *    .carousel__arrow.carousel__arrow--next (optionnal)
 * 
 * Improvment possibilities
 *    auto slide
 *    go to start when slide next at end
 *    go to end when slide prev at start
 */

class Carousel {
  constructor(container = document) {
    this.inner = container.querySelector('.carousel__inner');
    this.slides = Array.from(this.inner.children);
    this.arrows = {
      prev: container.querySelector('.carousel__arrow--prev'),
      next: container.querySelector('.carousel__arrow--next')
    };
    this.nav = container.querySelector('.carousel__nav');
    this.navItems = this.nav ? Array.from(this.nav.children) : null;
    this.slideWidth = this.slides[0].getBoundingClientRect().width;

    this.run = this.run.bind(this);
    this.initialState = this.initialState.bind(this);
    this.handlePrev = this.handlePrev.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handleClickNav = this.handleClickNav.bind(this);
    this.sliding = this.sliding.bind(this);
    this.updateNavItem = this.updateNavItem.bind(this);
    this.hideShowArrows = this.hideShowArrows.bind(this);
  }

  run = () => {
    this.initialState();
    if (this.arrows.prev) this.arrows.prev.addEventListener('click', this.handlePrev);
    if (this.arrows.next) this.arrows.next.addEventListener('click', this.handleNext);
    if (this.nav) this.nav.addEventListener('click', (event) => {
      this.handleClickNav(event.target);
    });
  }

  initialState() {
    this.slides[0].classList.add('carousel__slide--current');
    if (this.nav) this.navItems[0].classList.add('carousel__nav__item--current');
    if (this.arrows.prev) this.arrows.prev.classList.add('carousel__arrow--hidden');
    this.slides.forEach((slide, index) => {
      slide.style.left = this.slideWidth * index + 'px';
    });
  }

  handlePrev() {
    const currentSlide = this.inner.querySelector('.carousel__slide--current');
    const prevSlide = currentSlide.previousElementSibling;
    let currentNavItem = null;
    let prevNavItem = null;

    if (this.nav) {
      currentNavItem = this.nav.querySelector('.carousel__nav__item--current');
      prevNavItem = currentNavItem.previousElementSibling;
    }
    const prevIndex = this.slides.findIndex((slide) => slide === prevSlide);

    this.sliding(currentSlide, prevSlide);
    if (this.nav) this.updateNavItem(currentNavItem, prevNavItem);
    this.hideShowArrows(prevIndex);
  }

  handleNext() {
    const currentSlide = this.inner.querySelector('.carousel__slide--current');
    const nextSlide = currentSlide.nextElementSibling;
    let currentNavItem = null;
    let nextNavItem = null;

    if (this.nav) {
      currentNavItem = this.nav.querySelector('.carousel__nav__item--current');
      nextNavItem = currentNavItem.nextElementSibling;
    }
    const nextIndex = this.slides.findIndex((slide) => slide === nextSlide);

    this.sliding(currentSlide, nextSlide);
    if (this.nav) this.updateNavItem(currentNavItem, nextNavItem);
    this.hideShowArrows(nextIndex);
  }

  handleClickNav(target) {
    const targetNavItem = target.closest('li');

    if (!targetNavItem) return;
    
    const currentSlide = this.inner.querySelector('.carousel__slide--current');
    const currentNavItem = this.nav.querySelector('.carousel__nav__item--current');
    
    const targetIndex = this.navItems.findIndex((navItem) => navItem === targetNavItem);
    const nextSlide = this.slides[targetIndex];

    this.sliding(currentSlide, nextSlide);
    this.updateNavItem(currentNavItem, targetNavItem);
    this.hideShowArrows(targetIndex);
  }

  sliding(currentSlide, targetSlide) {
    this.inner.style.transform = `translateX(-${targetSlide.style.left})`;
    currentSlide.classList.remove('carousel__slide--current');
    targetSlide.classList.add('carousel__slide--current');
  }

  updateNavItem(currentNavItem, targetNavItem) {
    currentNavItem.classList.remove('carousel__nav__item--current');
    targetNavItem.classList.add('carousel__nav__item--current');
  }

  hideShowArrows(navItemIndex) {
    if (navItemIndex === 0) {
      if (this.arrows.prev) this.arrows.prev.classList.add('carousel__arrow--hidden');
      if (this.arrows.next) this.arrows.next.classList.remove('carousel__arrow--hidden');
    } else if (navItemIndex === this.slides.length - 1) {
      if (this.arrows.prev) this.arrows.prev.classList.remove('carousel__arrow--hidden');
      if (this.arrows.next) this.arrows.next.classList.add('carousel__arrow--hidden');
    } else {
      if (this.arrows.prev) this.arrows.prev.classList.remove('carousel__arrow--hidden');
      if (this.arrows.next) this.arrows.next.classList.remove('carousel__arrow--hidden');
    }
  }
}