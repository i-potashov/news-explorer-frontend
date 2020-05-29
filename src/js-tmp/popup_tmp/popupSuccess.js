import Popup from './popup';

export default class Success extends Popup {
  constructor() {
    super();
    this.template = `
            <h3 class="popup__title">Пользователь успешно зарегистрирован!</h3>
                        <a class="popup__link popup__link_success">Выполнить вход</a>
        `;
  }

  render(funcName) {
    this.container.insertAdjacentHTML('beforeend', this.template.trim());
    console.log('popup_tmp opened');
    // super.validate_tmp(this.container.querySelectorAll('.popup__input'),
    //     this.container.querySelector('.popup__button'));
    this.container.querySelector('.popup__link')
      .addEventListener('click', () => super.togglePopup(funcName));
    this.open();
  }

  // submit(e) {
  //   // e.preventDefault();
  // }
}
