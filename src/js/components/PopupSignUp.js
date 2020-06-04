import Popup from './Popup';
import Validate from './Form';

export default class SignUp extends Popup {
  constructor(mainApi) {
    super();
    this.mainApi = mainApi;
    this.submit = this.submit.bind(this);
    this.form = null;
    this.values = {};
    this.submit = this.submit.bind(this);
    this.errorSignUp = null;
    this.handlerSuccess = null;
    this.errorHandler = null;
    this.template = `
            <h3 class="popup__title">Регистрация</h3>
                <form class="popup__form" name="auth">
                    <label class="popup__subtitle">Email</label>
                    <input type="email" name="email" class="popup__input popup__input_type_email" placeholder="Введите почту" required pattern="^[A-Za-z0-9\\.\\-]{2,}@[A-Za-z0-9\\-]+(\\.[A-Za-z0-9\\-]{2,6})+$">
                    <span class="popup__error popup__error_data_email"></span>
                    <label class="popup__subtitle">Пароль</label>
                    <input type="password" name="password" class="popup__input popup__input_type_password" placeholder="Введите пароль" required minlength="8">
                    <span class="popup__error popup__error_data_password"></span>
                    <label class="popup__subtitle">Имя</label>
                    <input type="text" name="name" class="popup__input popup__input_type_name" placeholder="Введите своё имя" required pattern="^[А-Яа-я\\D]+((-|–)?[А-Яа-я\\D]+)?$" minlength="2" maxlength="30">
                    <span class="popup__error popup__error_data_name"></span>
                    <span class="popup__error popup__error_data_sign-up"></span>
                    <button type="submit" class="button button__popup button__popup_sign-up" name="submit">Зарегистрироваться</button>
                    <div class="popup__bottom">
                        <p class="popup__text">или</p>
                        <a class="popup__link">Войти</a>
                    </div>
                </form>`;
  }

  render(handlerPopup, handlerSuccess) {
    this.handlerSuccess = handlerSuccess;
    this.container.insertAdjacentHTML('beforeend', this.template.trim());
    this.form = document.querySelector('.popup__form');
    this.submitButton = this.container.querySelector('.button__popup_sign-up');
    this.errorSignUp = this.container.querySelector('.popup__error_data_sign-up');
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
    this.mainApi.signup(this.getInputValues())
      .then(() => {
        this.close();
        this.handlerSuccess();
      }).catch((err) => {
        this.errorSignUp.textContent = this.errorHandler(err.status);
      });
  }
}
