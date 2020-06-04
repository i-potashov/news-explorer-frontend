import './style/index.css';

import NewsApi from './js/api/NewsApi';
import MainApi from './js/api/MainApi';
import Header from './js/components/Header';
import PopupSignIn from './js/components/PopupSignIn';
import PopupSignUp from './js/components/PopupSignUp';
import PopupSuccess from './js/components/PopupSuccess';
import NewsCardList from './js/components/NewsCardList';
import Search from './js/components/Search';
import Validate from './js/components/Form';
import MobileMenu from './js/components/MobileMenu';
import serverConfig from './js/constants/news-api-config';
import serverApiConfig from './js/constants/main-api-config';

const form = document.querySelector('.search__form');
const searchButton = document.querySelector('.button__content_search');
const searchInput = document.querySelector('.search__input');
const copyrightDate = document.querySelector('.footer__date');

const newsApi = new NewsApi(serverConfig);
const mainApi = new MainApi(serverApiConfig);
const mobileMenu = new MobileMenu('white');
const signUpPopup = new PopupSignUp(mainApi);
const signInPopup = new PopupSignIn(mainApi);
const successPopup = new PopupSuccess();
const validate = new Validate(form, searchButton);
const newsCardList = new NewsCardList(mainApi);
const header = new Header(mainApi, signUpPopup, signInPopup, successPopup);
const search = new Search(newsApi, newsCardList);
const todayDate = new Date().getFullYear();

header.checkToken();
header.render();
validate.checkSubmit();
copyrightDate.insertAdjacentHTML('afterBegin', todayDate);
mobileMenu.addListeners();
search.addListener();

searchInput.addEventListener('input', validate.checkSubmit);
