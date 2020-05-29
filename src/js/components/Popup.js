// import Validate from '../validate_tmp/validate';

export default class Popup {
  constructor() {
    this.controllerClass = null;
    this.popup = document.querySelector('.popup__container');
    this.closeButton = document.querySelector('.popup__close');
    this.container = document.querySelector('.popup__wrap');
    this.container = document.querySelector('.popup__wrap');
    this.logo = document.querySelector('.header__logo');
    this.handleEscClose = this.handleEscClose.bind(this);
    this.closeTablet = this.closeTablet.bind(this);
    this.close = this.close.bind(this);
    this.pageWidth = null;
  }

  open(controllerClass) {
    this.controllerClass = controllerClass || null;
    this.checkColor();
    this.popup.classList.remove('popup__container_closed');
    this.popup.classList.add('popup__container_opened');
    document.addEventListener('keydown', this.handleEscClose);
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
    this.controllerClass.render();
    if (this.controllerClass.color === 'dark') {
      this.controllerClass.render();
    }
    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }
  }

  close() {
    this.popup.classList.remove('popup__container_opened');
    this.popup.classList.add('popup__container_closed');
    this.removeListeners();
    this.controllerClass.unblockPage();
    if (document.documentElement.clientWidth <= 720) {
      this.controllerClass.showMobileMenuIcon();
    } else {
      this.controllerClass.hideMobileMenuIcon();
    }
    while (this.container.firstChild) {
      this.container.firstChild.remove();
    }
  }

  closeTablet(e) {
    if (e.target.classList.contains('popup__container_opened')) {
      console.log('true');
      this.close();
      this.removeListeners();
    }
  }

  handleEscClose(e) {
    if (e.keyCode === 27) {
      this.close();
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

  // validate(inputs, button) {
  //   this.validateInput = new Validate(inputs, button);
  //   inputs.forEach((val) => val.addEventListener('input', this.validateInput.checkInput));
  //   this.validateInput.checkSubmitStatus();
  // }
}
