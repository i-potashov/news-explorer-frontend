const userName = document.querySelector('.user__name');
const articlesCount = document.querySelector('.user__count');
const keyWords = document.querySelector('.user__keywords_list');

const setUserInfo = (mainApi) => {
  mainApi.getUserData()
    .then((res) => {
      userName.textContent = res.data.name[0].toUpperCase() + res.data.name.substr(1).toLowerCase();
    });
  mainApi.getArticles()
    .then((res) => {
      articlesCount.textContent = res.length;
      const keywordArray = res.map((value) => value.keyword);
      keyWords.textContent = Array.from(new Set(keywordArray));
    });
};

export default setUserInfo;
