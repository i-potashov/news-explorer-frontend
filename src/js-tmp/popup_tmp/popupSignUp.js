import Popup from './popup';

export default class SignUp extends Popup {
  constructor() {
    super();
    // this.submit = this.submit.bind(this);
    this.template = `
            <h3 class="popup__title">Регистрация</h3>
                <form class="popup__form" name="auth">
                    <p class="popup__subtitle">Email</p>
                    <input type="email" name="email" class="popup__input popup__input_type_email" placeholder="Введите почту">
                    <span class="popup__error popup__error_data_email popup__error_invalid"></span>
                    <p class="popup__subtitle">Пароль</p>
                    <input type="password" name="password" class="popup__input popup__input_type_password"
                        placeholder="Введите пароль">
                    <span class="popup__error popup__error_data_password popup__error_invalid"></span>
                    <p class="popup__subtitle">Имя</p>
                    <input type="text" name="name" class="popup__input popup__input_type_name"
                        placeholder="Введите своё имя">
                    <span class="popup__error popup__error_data_name popup__error_invalid"></span>
                    <span class="popup__error popup__error_data_sign-up popup__error_invalid"></span>
                    <button type="submit" class="button button__popup button__popup_sign-up">Зарегистрироваться</button>
                    <div class="popup__bottom">
                        <p class="popup__text">или</p>
                        <a class="popup__link">Войти</a>
                    </div>
                </form>`;
  }

  render(funcName) {
    this.container.insertAdjacentHTML('beforeend', this.template.trim());
    super.validate(this.container.querySelectorAll('.popup__input'),
      this.container.querySelector('.button__popup_sign-up'));
    this.container.querySelector('.popup__link')
      .addEventListener('click', () => super.togglePopup(funcName));
    this.open();
  }

  // submit(e) {
  //   // e.preventDefault();
  // }
}
