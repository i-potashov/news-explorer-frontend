export default class MobileMenu {
  constructor(color) {
    this.headerBlock = document.querySelector('.header');
    this.mobileMenuButton = document.querySelector('.header__mobile-button');
    this.mobileMenuContainer = document.querySelector('.header__wrap');
    this.logo = document.querySelector('.header__logo');
    this.page = document.querySelector(('.page'));
    this.popup = document.querySelector('.popup__container');
    this.render = this.render.bind(this);
    this.color = color;
  }

  render() {
    this.toggleMobileMenu();
    if (this.mobileMenuContainer.classList.contains('header__wrap_open')) {
      if (this.color === 'dark') {
        this.changeColor();
        this.logo.style.color = 'white';
      }
      this.toggleMobileMenuIcon();
      this.headerBlock.classList.toggle('header_fixed');
      this.blockPage();
    } else {
      if (this.color === 'dark') {
        this.changeColor();
        this.logo.style.color = 'black';
      }
      this.toggleMobileMenuIcon();
      this.headerBlock.classList.toggle('header_fixed');
      this.unblockPage();
      this.removeListeners();
    }
  }

  toggleMobileMenuIcon() {
    this.mobileMenuButton.classList.toggle('header__mobile-button_close');
    this.mobileMenuButton.classList.toggle('header__mobile-button_open');
  }

  changeColor() {
    this.mobileMenuButton.classList.toggle('header__mobile-button_dark');
    this.mobileMenuButton.classList.toggle('header__mobile-button_light');
  }

  toggleMobileMenu() {
    this.mobileMenuContainer.classList.toggle('header__wrap_open');
    this.mobileMenuContainer.classList.toggle('header__wrap_close');
  }

  blockPage() {
    this.page.style.overflow = 'hidden';
  }

  unblockPage() {
    this.page.style.removeProperty('overflow');
  }

  addListeners() {
    this.mobileMenuButton.addEventListener('click', this.render.bind(this));
  }

  removeListeners() {
    this.mobileMenuButton.removeEventListener('click', this.render.bind(this));
  }
}
