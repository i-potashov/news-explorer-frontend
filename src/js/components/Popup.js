export default class Popup {
  constructor() {
    this.popup = document.querySelector('.popup__container');
    this.closeButton = document.querySelector('.popup__close');
    this.container = document.querySelector('.popup__wrap');
    this.logo = document.querySelector('.header__logo');
    this.handleEscClose = this.handleEscClose.bind(this);
    this.handleContainerClose = this.handleContainerClose.bind(this);
    this.closeTablet = this.closeTablet.bind(this);
    this.close = this.close.bind(this);
    this.pageWidth = null;
  }

  open() {
    this.checkColor();
    this.popup.classList.remove('popup__container_closed');
    this.popup.classList.add('popup__container_opened');
    document.addEventListener('keydown', this.handleEscClose);
    document.addEventListener('click', this.handleContainerClose);
    this.addListeners();
  }

  checkColor() {
    if (this.logo.classList.contains('header__logo_dark')) {
      this.logo.style.color = 'black';
    }
  }

  changePopup() {
    this.popup.classList.remove('popup__container_opened');
    this.popup.classList.add('popup__container_closed');
    this.removeListeners();
    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }
  }

  close() {
    this.popup.classList.remove('popup__container_opened');
    this.popup.classList.add('popup__container_closed');
    this.removeListeners();
    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }
  }

  closeTablet(e) {
    if (e.target.classList.contains('popup__container_opened')) {
      this.close();
      this.removeListeners();
    }
  }

  handleEscClose(e) {
    if (e.keyCode === 27) {
      this.close();
    }
  }

  handleContainerClose(e) {
    if (e.target.classList.contains('popup__container')) {
      this.close();
      this.removeListeners();
    }
  }

  addListeners() {
    this.closeButton.addEventListener('click', this.close);
    this.pageWidth = window.innerWidth;
    if (this.pageWidth < 1200 && this.pageWidth >= 768) {
      this.popup.addEventListener('click', this.closeTablet);
    }
  }

  removeListeners() {
    this.closeButton.removeEventListener('click', this.close);
    this.popup.removeEventListener('click', this.closeTablet);
  }

  togglePopup(funcName) {
    this.changePopup();
    funcName();
  }
}
