import '../style/articles.css';

import HeaderControl from './header/headerControl';


const copyrightDate = document.querySelector('.footer__date');
const headerController = new HeaderControl('dark');

headerController.addListeners();


const todayDate = new Date().getFullYear();
copyrightDate.insertAdjacentHTML('afterBegin', todayDate);
