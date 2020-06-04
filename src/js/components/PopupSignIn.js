import Popup from './Popup';
import Validate from'./Form';

export default class SignIn extends Popup {
  constructor(mainApi) {
    super();
    this.mainApi = mainApi;
    this.form = null;
    this.values = {};
    this.submit = this.submit.bind(this);
    this.errorSignIn = null;
    this.headerRender = null;
    this.errorHandler = null;
    this.template = `
            <h3 class="popup__title">Вход</h3>
            <form class="popup__form" name="auth">
                <label class="popup__subtitle">Email</label>
                <input type="email" name="email" class="popup__input popup__input_type_email" placeholder="Введите почту" required pattern="^[A-Za-z0-9\\.\\-]{2,}@[A-Za-z0-9\\-]+(\\.[A-Za-z0-9\\-]{2,6})+$">
                <span class="popup__error popup__error_data_email"></span>
                <label class="popup__subtitle">Пароль</label>
                <input type="password" name="password" class="popup__input popup__input_type_password" placeholder="Введите пароль" required minlength="8">
                <span class="popup__error popup__error_data_password"></span>
                <span class="popup__error popup__error_data_sign-in"></span>
                    <button type="submit" class="button button__popup button__popup_sign-in" name="submit">Войти</button>
                <div class="popup__bottom">
                    <p class="popup__text">или</p>
                    <a class="popup__link">Зарегистрироваться</a>
                </div>
            </form>`;
  }

  render(headerRender, handlerPopup) {
    this.headerRender = headerRender;
    this.container.insertAdjacentHTML('beforeend', this.template.trim());
    this.form = document.querySelector('.popup__form');
    this.submitButton = this.container.querySelector('.button__popup_sign-in');
    this.errorSignIn = this.container.querySelector('.popup__error_data_sign-in');
    const validatePopup = new Validate(this.form, this.submitButton);
    this.errorHandler = validatePopup.errorHandler;
    this.addInputsListeners(validatePopup.handleValidate);
    this.submitButton.addEventListener('click', this.submit);
    this.container.querySelector('.popup__link')
      .addEventListener('click', () => super.togglePopup(handlerPopup));
    this.open();
    validatePopup.checkSubmit();
  }

  getInputValues() {
    Array.from(this.form.elements).forEach((elem) => {
      if (elem.name !== 'submit') this.values[elem.name] = elem.value;
    });
    return this.values;
  }

  addInputsListeners(handleValidate) {
    Array.from(this.form.elements).forEach((elem) => elem.addEventListener('input', handleValidate));
  }

  submit(e) {
    e.preventDefault();
    this.mainApi.signin(this.getInputValues())
      .then((data) => localStorage.setItem('token', data.token))
      .then(() => {
        this.headerRender();
        this.close();
      })
      .catch((err)=> {
        this.errorSignIn.textContent = this.errorHandler(err.status);
      });
  }
}
