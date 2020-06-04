import './style/index.css';

import NewsApi from './js/api/NewsApi';
import MainApi from './js/api/MainApi';
import Header from './js/components/Header';
import PopupSignIn from './js/components/PopupSignIn';
import PopupSignUp from './js/components/PopupSignUp';
import PopupSuccess from './js/components/PopupSuccess';
import NewsCardList from './js/components/NewsCardList';
import Search from './js/components/Search';
import serverConfig from './js/constants/news-api-config';
import serverApiConfig from './js/constants/main-api-config';
import Validate from "./js/components/Form";

const newsApi = new NewsApi(serverConfig);
const mainApi = new MainApi(serverApiConfig);

const signUpPopup = new PopupSignUp(mainApi);
const signInPopup = new PopupSignIn(mainApi);
const successPopup = new PopupSuccess();

const form = document.querySelector('.search__form');
const searchButton = document.querySelector('.button__content_search');
const searchInput = document.querySelector('.search__input');

const validate = new Validate(form, searchButton);

const newsCardList = new NewsCardList(mainApi);
const header = new Header(mainApi, signUpPopup, signInPopup, successPopup);
const search = new Search(newsApi, newsCardList);

header.checkToken();
header.render();


validate.checkSubmit();
searchInput.addEventListener('input', validate.checkSubmit);


const copyrightDate = document.querySelector('.footer__date');

search.addListener();

const todayDate = new Date().getFullYear();
copyrightDate.insertAdjacentHTML('afterBegin', todayDate);
