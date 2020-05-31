export default class Header {
  constructor(mainApi, signUpPopup, signInPopup, successPopup) {
    this.mainApi = mainApi;
    this.signInPopup = signInPopup;
    this.signUpPopup = signUpPopup;
    this.successPopup = successPopup;
    this.headerBlock = document.querySelector('.header');
    this.articlesButton = document.querySelector('.header__item_articles');
    this.mobileMenuButton = document.querySelector('.header__mobile-button');
    this.mobileMenuContainer = document.querySelector('.header__wrap');
    this.buttonMenu = document.querySelector('.button__menu');
    this.page = document.querySelector(('.page'));
    this.popup = document.querySelector('.popup__container');
    this.isLoggedIn = false;
    this.userName = null;
  }

  signUpHandler() {
    this.signUpPopup.render(this.signInHandler.bind(this), this.successHandler.bind(this));
    // this.checkPopupVisible();
    // this.hideMobileMenuIcon();
    // this.signUpPopup.open();
  }

  signInHandler() {
    this.signInPopup.render(this.render.bind(this), this.signUpHandler.bind(this));
    // this.checkPopupVisible();
    // this.hideMobileMenuIcon();
    // this.signInPopup.open();
  }

  successHandler() {
    this.successPopup.render(this.signInHandler.bind(this));
    // this.successPopup.open();
  }

  render() {
    this.checkToken();
    if (this.isLoggedIn) {
      this.mainApi.getUserData()
        .then((res) => this.userName = res.data.name[0].toUpperCase() + res.data.name.substr(1).toLowerCase())
        .then(() => {
          this.setLogOutButton();
          this.removeLoginListener();
          this.addLogoutListener();
        });
    } else {
      this.setLoginButton();
      this.removeLogoutListener();
      this.addLoginListener();
    }
  }

  addLoginListener() {
    this.buttonMenu.addEventListener('click', this.signInHandler.bind(this));
  }

  removeLoginListener() {
    this.buttonMenu.removeEventListener('click', this.signInHandler.bind(this));
  }

  addLogoutListener() {
    this.buttonMenu.addEventListener('click', this.tmpRemoveToken.bind(this));
  }

  removeLogoutListener() {
    this.buttonMenu.removeEventListener('click', this.tmpRemoveToken.bind(this));
  }

  tmpRemoveToken() {
    Promise.resolve()
      .then(() => localStorage.removeItem('token'))
      .then(() => {
        document.location.reload();
        document.location.href = './';
      });
  }

  checkToken() {
    localStorage.getItem('token') ? this.isLoggedIn = true : this.isLoggedIn = false;
  }

  getUserName() {
    return this.mainApi.getUserData();
  }

  setLogOutButton() {
    this.buttonMenu.classList.add('button__menu_logout');
    this.buttonMenu.classList.remove('button__menu_login');
    this.buttonMenu.textContent = this.userName;
    this.articlesButton.style.display = 'block';
  }

  setLoginButton() {
    this.buttonMenu.classList.add('button__menu_login');
    this.buttonMenu.classList.remove('button__menu_logout');
    this.buttonMenu.textContent = 'Авторизоваться';
    this.articlesButton.style.display = 'none';
  }

  toggleSavedArticles() {

  }

  // setActiveLink() {
  //   this.link.forEach(str => {
  //     if (str.firstElementChild.href === document.location.href) {
  //       str.classList.add('header__link_active');
  //     }
  //   })
  // }

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
}
