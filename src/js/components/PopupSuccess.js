import Popup from './Popup';

export default class Success extends Popup {
  constructor() {
    super();
    this.template = `
            <h3 class="popup__title">Пользователь успешно зарегистрирован!</h3>
                        <a class="popup__link popup__link_success">Выполнить вход</a>
        `;
  }

  render(handlerPopup) {
    this.container.insertAdjacentHTML('beforeend', this.template.trim());
    this.container.querySelector('.popup__link')
      .addEventListener('click', () => super.togglePopup(handlerPopup));
    this.open();
  }
}
