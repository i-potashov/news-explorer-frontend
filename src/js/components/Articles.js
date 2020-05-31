export default class Articles {
  constructor() {
    this.searchInput = document.querySelector('.search__input');
    this.searchButton = document.querySelector('.button__content_search');
  }

  searchHandler(e) {
    e.preventDefault();
    return this.searchInput.value;
  }

  addListener() {
    this.searchButton.addEventListener('click', this.searchHandler.bind(this));
  }
}
