import '../style/articles.css';

import setUserInfo from '../js/utils/user-info';
import MainApi from '../js/api/MainApi';
import Header from '../js/components/Header';
import PopupSignIn from '../js/components/PopupSignIn';
import PopupSignUp from '../js/components/PopupSignUp';
import PopupSuccess from '../js/components/PopupSuccess';
import NewsCardList from '../js/components/NewsCardList';
import serverApiConfig from '../js/constants/main-api-config';

const mainApi = new MainApi(serverApiConfig);
const signUpPopup = new PopupSignUp(mainApi);
const signInPopup = new PopupSignIn(mainApi);
const successPopup = new PopupSuccess();

const savedCardList = new NewsCardList(mainApi);
const header = new Header(mainApi, signUpPopup, signInPopup, successPopup);

setUserInfo(mainApi);


mainApi.getArticles()
  .then((res) => {
    console.log('!!!!', res[0]);
    for (let i = 0; i < res.length; i++) {
      savedCardList.cardTemplateSaved(res[i]);
    }
  });

document.querySelector('.articles__container').style.display = 'flex';

header.addLogoutListener();
header.render();
header.getUserName();


const copyrightDate = document.querySelector('.footer__date');
const todayDate = new Date().getFullYear();
copyrightDate.insertAdjacentHTML('afterBegin', todayDate);
