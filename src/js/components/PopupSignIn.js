import Popup from './Popup';

export default class SignIn extends Popup {
  constructor(mainApi) {
    super();
    this.mainApi = mainApi;
    this.userEmail = null;
    this.userPassword = null;
    this._element = null;
    this.values = {};
    this.submit = this.submit.bind(this);
    // this.submit = this.submit.bind(this);
    this.template = `
            <h3 class="popup__title">Вход</h3>
            <form class="popup__form" name="auth">
                <p class="popup__subtitle">Email</p>
                <input type="email" name="email" class="popup__input popup__input_type_email" placeholder="Введите почту">
                <span class="popup__error popup__error_data_email popup__error_invalid"></span>
                <p class="popup__subtitle">Пароль</p>
                <input type="password" name="password" class="popup__input popup__input_type_password"
                       placeholder="Введите пароль">
                <span class="popup__error popup__error_data_password popup__error_invalid"></span>
                <span class="popup__error popup__error_data_sign-up popup__error_invalid"></span>
                    <button type="submit" class="button button__popup button__popup_sign-in">Войти</button>
                <div class="popup__bottom">
                    <p class="popup__text">или</p>
                    <a class="popup__link">Зарегистрироваться</a>
                </div>
            </form>`;
  }

  render(funcName) {
    this.container.insertAdjacentHTML('beforeend', this.template.trim());
    this.userEmail = document.querySelector('.popup__input_type_email');
    this.userPassword = document.querySelector('.popup__input_type_password');
    this.submitButton = this.container.querySelector('.button__popup_sign-in');
    this.submitButton.addEventListener('click', this.submit);
    this._element = document.querySelector('.popup__form');
    this.container.querySelector('.popup__link')
      .addEventListener('click', () => super.togglePopup(funcName));
    this.open();
  }

  getInputValues() {
    Array.from(this._element.elements).forEach(elem => {
      if (elem.name !== 'submit')this.values[elem.name] = elem.value;
    });
    return this.values;
  }

  submit(e) {
    e.preventDefault();
    this.mainApi.signin(this.getInputValues())
      .then((data) => {
        console.log('data.token=============',data.token);
        localStorage.setItem('token', data.token);
        }
      );
  }
}
