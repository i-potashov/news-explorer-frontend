export default class Search {
  constructor(newsApi, newsCardList) {
    this.newsApi = newsApi;
    this.newsCardList = newsCardList;
    this.searchInput = document.querySelector('.search__input');
    this.searchButton = document.querySelector('.button__content_search');
    this.loaderContainer = document.querySelector('.articles__loader');
    this.errorContainer = document.querySelector('.articles__not-found');
    this.keyWord = null;
  }

  getSearchResult(articles) {
    this.newsCardList.setArticlesArray(articles, this.keyWord);
    this.newsCardList.showMainContainer();
    this.newsCardList.renderResults();
    this.newsCardList.addListener();
  }

  getSearchNews(keyWord) {
    return this.newsApi.getNews(keyWord);
  }

  searchHandler(e) {
    e.preventDefault();
    this.loaderContainer.style.display = 'flex';
    this.getSearchNews(this.searchInput.value)
      .then((value) => {
        this.keyWord = this.searchInput.value;
        this.loaderContainer.style.display = 'none';
        return this.getSearchResult(value);
      });
  }

  addListener() {
    this.searchButton.addEventListener('click', this.searchHandler.bind(this));
  }
}
