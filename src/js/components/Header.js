export default class Header {
  constructor(mainApi, signUpPopup, signInPopup, successPopup) {
    this.mainApi = mainApi;
    this.signInPopup = signInPopup;
    this.signUpPopup = signUpPopup;
    this.successPopup = successPopup;
    this.articlesButton = document.querySelector('.header__item_articles');
    this.buttonMenu = document.querySelector('.button__menu');
    this.page = document.querySelector(('.page'));
    this.popup = document.querySelector('.popup__container');
    this.isLoggedIn = false;
    this.userName = null;
  }

  signUpHandler() {
    this.signUpPopup.render(this.signInHandler.bind(this), this.successHandler.bind(this));
  }

  signInHandler() {
    this.signInPopup.render(this.render.bind(this), this.signUpHandler.bind(this));
  }

  successHandler() {
    this.successPopup.render(this.signInHandler.bind(this));
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
}
