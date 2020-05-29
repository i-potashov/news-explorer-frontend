export default {
  POPUP_SIGN_IN: `
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
            </form>`,
  POPUP_SIGN_UP: `
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
                </form>`,
  POPUP_SIGN_SUCCESS: `
            <h3 class="popup__title">Пользователь успешно зарегистрирован!</h3>
                        <a class="popup__link popup__link_success">Выполнить вход</a>
        `,
};
