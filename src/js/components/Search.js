export default class Search {
  constructor(newsApi, newsCardList) {
    this.newsApi = newsApi;
    this.newsCardList = newsCardList;
    this.searchInput = document.querySelector('.search__input');
    this.searchButton = document.querySelector('.button__content_search');
    this.loaderContainer = document.querySelector('.articles__loader');
    this.errorContainer = document.querySelector('.articles__not-found');
    this.resultContainer = document.querySelector('.articles__cards');
    this.titleContainer = document.querySelector('.articles__title');
    this.keyWord = null;
    this.checkResult = false;
    this.lastNewsCount = 0;
  }

  clearSearchResult() {
    while (this.resultContainer.firstChild) {
      this.resultContainer.removeChild(this.resultContainer.firstChild);
    }
    // this.checkResult = false;
  }

  getSearchResult(articles) {

    this.newsCardList.setArticlesArray(articles.map(val=>val), this.keyWord, this.lastNewsCount);
    this.newsCardList.showMainContainer();
    this.newsCardList.renderResults();
    console.log('!!!!',!!this.resultContainer.firstChild);
    if (this.checkResult === false) {
      this.newsCardList.addListener();
    }
    this.checkResult = true;
  }

  // getSearchNews(keyWord) {
  //   return this.newsApi.getNews(keyWord);
  // }

  searchHandler(e) {
    e.preventDefault();
    if(this.checkResult === true) {
      this.clearSearchResult();
      this.titleContainer.style.display = 'flex';
      this.errorContainer.style.display = 'none';
    }
    this.loaderContainer.style.display = 'flex';
    this.newsApi.getNews(this.searchInput.value)
      .then((value) => {
        this.keyWord = this.searchInput.value;
        this.loaderContainer.style.display = 'none';
        if (value.length === 0) {
          this.titleContainer.style.display = 'none';
          this.errorContainer.style.display = 'flex';
        }
        return this.getSearchResult(value);
      });
  }

  addListener() {
    this.searchButton.addEventListener('click', this.searchHandler.bind(this));
  }
}
