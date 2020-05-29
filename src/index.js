import './style/index.css';

import serverConfig from './js/constants/news-api-config';
import serverApiConfig from './js/constants/main-api-config';
import NewsApi from './js/api/NewsApi';
import MainApi from './js/api/MainApi';
import NewsCardList from './js/components/NewsCardList';
import SignIn from './js/components/PopupSignIn';
import SignUp from './js/components/PopupSignUp';
import Success from './js/components/PopupSuccess';
import Header from './js/components/Header';

let loadContent = {};
const newsApi = new NewsApi(serverConfig);
const mainApi = new MainApi(serverApiConfig);

const searchContainer = document.querySelector('.search__input');
const searchButton = document.querySelector('.button__content_search');
const showMoreButton = document.querySelector('.button__content_load');
const loginButton = document.querySelector('.button__menu_login');
const copyrightDate = document.querySelector('.footer__date');
const buttonMenu = document.querySelector('.button__menu');

const buttonSuccess = document.querySelector('.header__link_success');
const buttonSuccessArt = document.querySelector('.header__link_successArt');


const headerController = new Header(buttonMenu, mainApi);
const signUpPopup = new SignUp(mainApi);
const signInPopup = new SignIn(mainApi);
const successInPopup = new Success();

headerController.addListeners();

const todayDate = new Date().getFullYear();
copyrightDate.insertAdjacentHTML('afterBegin', todayDate);

// localStorage.removeItem('token');

headerController.checkAuth(signInHandler);

function searchHandler(e) {
  e.preventDefault();

  Promise.resolve()
    .then(res => {
      return newsApi.getNews(searchContainer.value)
    })
    .then(value => {
        loadContent = new NewsCardList(value.articles, showMoreButton);
        loadContent.renderResults();
        loadContent.showMoreHandler();
    })

    .catch(error => console.log('Ошибка при загрузке карточек', error));
}


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
searchButton.addEventListener('click', searchHandler);

buttonSuccess.addEventListener('click', mainApi.getUserData);
buttonSuccessArt.addEventListener('click', mainApi.getArticles);
