//   render при вызове перерисовывает шапку в зависимости от переданного аргумента — объекта props.
//   У этого объекта есть два обязательных свойства:
//   isLoggedIn — залогинен ли пользователь;
//   userName — имя, которое отображается в шапке залогиненного пользователя.

export default class Header {
  constructor(buttonMenu, mainApi, signInHandler) {
    this.headerBlock = document.querySelector('.header');
    this.mobileMenuButton = document.querySelector('.header__mobile-button');
    this.mobileMenuContainer = document.querySelector('.header__wrap');
    this.logo = document.querySelector('.header__logo');
    this.page = document.querySelector(('.page'));
    this.popup = document.querySelector('.popup__container');
    this.render = this.render.bind(this);
    this.buttonMenu = buttonMenu;
    this.mainApi = mainApi;
    this.isLoggedIn = false;
    this.signInHandler = signInHandler;

  }

  checkAuth() {
    if (localStorage.getItem('token')) {
      this.isLoggedIn = true;
      this.setLogOutButton();
    } else {
      this.isLoggedIn = false;
    }
    console.log(this.isLoggedIn);
  }

  setLogOutButton() {
    this.buttonMenu.classList.add('button__menu_logout');
    // this.buttonMenu.textContent = this.mainApi.getUserData().then(res => res.name);
    // this.getUserData();
  }

  setLoginButton() {
    this.buttonMenu.classList.add('button__menu_login');
    this.buttonMenu.textContent = 'Регистрация';
    const loginButton = document.querySelector('.button__menu_login');
    console.log(loginButton);
    loginButton.addEventListener('click', this.signInHandler);
  }

  getUserData() {
    this.mainApi.getUserData();
  }

  render() {
    this.toggleMobileMenu();
    if (this.mobileMenuContainer.classList.contains('header__wrap_open')) {
      if (this.color === 'dark') {
        this.changeColor();
        this.logo.style.color = 'white';
        console.log(this.logo);
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

  checkPopupVisible() {
    if (this.mobileMenuContainer.classList.contains('header__wrap_open')) {
      this.toggleMobileMenu();
      this.headerBlock.classList.remove('header_fixed');
      this.mobileMenuButton.classList.add('header__mobile-button_open');
    }
  }

  changeColor() {
    this.mobileMenuButton.classList.toggle('header__mobile-button_dark');
    this.mobileMenuButton.classList.toggle('header__mobile-button_light');
  }

  // Управление открытием меню
  toggleMobileMenu() {
    this.mobileMenuContainer.classList.toggle('header__wrap_open');
    this.mobileMenuContainer.classList.toggle('header__wrap_close');
  }

  hideMobileMenuIcon() {
    this.mobileMenuButton.style.display = 'none';
  }

  showMobileMenuIcon() {
    if (this.color === 'dark') {
      this.changeColor();
    }
    this.mobileMenuButton.style.display = 'block';
    this.mobileMenuButton.classList.add('header__mobile-button_open');
    this.mobileMenuButton.classList.remove('header__mobile-button_close');
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
