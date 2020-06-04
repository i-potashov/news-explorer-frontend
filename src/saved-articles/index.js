import '../style/articles.css';

import MainApi from '../js/api/MainApi';
import UserInfo from '../js/components/UserInfo';
import Header from '../js/components/Header';
import PopupSignIn from '../js/components/PopupSignIn';
import PopupSignUp from '../js/components/PopupSignUp';
import PopupSuccess from '../js/components/PopupSuccess';
import NewsCardList from '../js/components/NewsCardList';
import MobileMenu from '../js/components/MobileMenu';
import serverApiConfig from '../js/constants/main-api-config';

if (!localStorage.getItem('token')) window.location = './';

const copyrightDate = document.querySelector('.footer__date');

const mainApi = new MainApi(serverApiConfig);
const userInfo = new UserInfo();
const mobileMenu = new MobileMenu('dark');
const signUpPopup = new PopupSignUp(mainApi);
const signInPopup = new PopupSignIn(mainApi);
const successPopup = new PopupSuccess();
const savedCardList = new NewsCardList(mainApi, userInfo);
const header = new Header(mainApi, signUpPopup, signInPopup, successPopup);
const todayDate = new Date().getFullYear();

document.querySelector('.articles__container').style.display = 'flex';
mainApi.getUserData()
  .then((res) => userInfo.setUserName(res));

mainApi.getArticles()
  .then((res) => {
    for (let i = 0; i < res.length; i++) savedCardList.cardTemplateSaved(res[i]);
    return res;
  })
  .then((res) => userInfo.setArticlesCount(res))
  .then((res) => userInfo.setKeywords(res));


copyrightDate.insertAdjacentHTML('afterBegin', todayDate);
header.addLogoutListener();
header.render();
header.getUserName();
mobileMenu.addListeners();
