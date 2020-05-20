import '../style/index.css';

import SignIn from './popup/popupSignIn';
import SignUp from './popup/popupSignUp';
import Success from './popup/popupSuccess';
import HeaderControl from './header/headerControl';

const loginButton = document.querySelector('.button__menu_login');
const copyrightDate = document.querySelector('.footer__date');
const successPopup = document.querySelector('.header__link_success');

const headerController = new HeaderControl();

headerController.addListeners();

const todayDate = new Date().getFullYear();
copyrightDate.insertAdjacentHTML('afterBegin', todayDate);

const signUpPopup = new SignUp();
const signInPopup = new SignIn();
const successInPopup = new Success();

function signUpHandler() {
  signUpPopup.render(signInHandler);
  headerController.checkPopupVisible();
  headerController.hideMobileMenuIcon();
  signUpPopup.open(headerController);
}

function signInHandler() {
  signInPopup.render(signUpHandler);
  headerController.checkPopupVisible();
  headerController.hideMobileMenuIcon();
  signInPopup.open(headerController);
}

function successHandler() {
  successInPopup.render(signInHandler);
  successInPopup.open(headerController);
}

loginButton.addEventListener('click', signInHandler);
successPopup.addEventListener('click', successHandler);