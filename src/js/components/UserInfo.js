export default class UserInfo {
  constructor() {
    this.userName = document.querySelector('.user__name');
    this.articlesCount = document.querySelector('.user__count');
    this.keyWords = document.querySelector('.user__keywords_list');
  }

  setUserName(resUserData) {
    this.userName.textContent = resUserData.data.name[0].toUpperCase() + resUserData.data.name.substr(1).toLowerCase();
    return resUserData;
  }

  setArticlesCount(resArticlesData) {
    this.articlesCount.textContent = this.setSavedArticlesWord(resArticlesData.length);
    return resArticlesData;
  }

  setKeywords(resArticlesData) {
    const keywordArray = resArticlesData.map((value) => value.keyword);
    const keywordCount = {};
    const keywordUnique = [...new Set(keywordArray)];
    keywordArray.forEach((value) => keywordCount[value] = (keywordCount[value] || 0) + 1);
    const keywordFinish = Object.keys(Object.fromEntries(
      Object.entries(keywordCount).sort((a, b) => b[1] - a[1]).filter(([key, value], index) => index < 2),
    ));

    if (Object.keys(keywordCount).length > 3) {
      this.keyWords.textContent = `${this.setUpperCase(keywordFinish[0])}, ${this.setUpperCase(keywordFinish[1])} и ${Object.keys(keywordCount).length - 2} другим`;
    } else if (Object.keys(keywordCount).length === 3) {
      this.keyWords.textContent = `${this.setUpperCase(keywordUnique[0])}, ${this.setUpperCase(keywordUnique[1])}, ${this.setUpperCase(keywordUnique[2])}`;
    } else if (Object.keys(keywordCount).length === 2) {
      this.keyWords.textContent = `${this.setUpperCase(keywordUnique[0])}, ${this.setUpperCase(keywordUnique[1])}`;
    } else if (Object.keys(keywordCount).length === 1) {
      this.keyWords.textContent = `${this.setUpperCase(keywordUnique[0])}`;
    } else {
      this.keyWords.textContent = '';
    }
  }

  setUpperCase(word) {
    return word[0].toUpperCase() + word.substr(1).toLowerCase();
  }

  setSavedArticlesWord(count) {
    const articlesText = ['сохраненная статья', 'сохраненные статьи', 'сохраненных статей'];
    const cases = [2, 0, 1, 1, 1, 2];
    return `${count} ${articlesText[(count % 100 > 4 && count % 100 < 20) ? 2
      : cases[(count % 10 < 5) ? count % 10 : 5]]}`;
  }
}
