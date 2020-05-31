export default class NewsCardList {
  constructor(mainApi) {
    this.mainApi = mainApi;
    this.element = null;
    this.articlesArray = null;
    this.articlesArrayLenth = null;
    this.keyWord = null;
    this.loadButton = document.querySelector('.button__content_load');
    this.newElement = null;
    this.lastNewsCount = 0;
    this.mainContainer = document.querySelector('.articles__container');
    this.container = document.querySelector('.articles__cards');
    this.loaderContainer = document.querySelector('.articles__loader');
    this.errorContainer = document.querySelector('.articles__not-found');
    this.loadButton = document.querySelector('.button__content_load');
    this.saveArticle = this.saveArticle.bind(this);
  }

  setArticlesArray(articles, keyWord) {
    this.keyWord = keyWord;
    this.articlesArray = articles;
    this.articlesArrayLenth = articles.length;
  }

  renderResults() {
    this.loaderContainer.style.display = 'block';
    if (this.articlesArrayLenth > 2) {
      for (let i = this.lastNewsCount; i < this.lastNewsCount + 3; i++) {
        this.addCard(this.articlesArray[i]);
        this.showMore();
      }
      this.articlesArrayLenth -= 3;
      this.lastNewsCount += 3;
      this.loaderContainer.style.display = 'none';
    } else {
      for (let i = this.lastNewsCount; i < this.lastNewsCount + (this.articlesArrayLenth); i++) {
        this.addCard(this.articlesArray[i]);
        this.showMore();
      }
      this.loaderContainer.style.display = 'none';
    }
  }

  addCard({
    urlToImage, publishedAt, url, title, description, author, sourceName,
  }) {
    localStorage.getItem('token')
      ? this.cardTemplateAuthorized({
        urlToImage, publishedAt, url, title, description, author, sourceName,
      })
      : this.cardTemplateUnauthorized({
        urlToImage, publishedAt, url, title, description, author, sourceName,
      });
  }

  cardTemplateUnauthorized({
    urlToImage, publishedAt, url, title, description, author, sourceName,
  }) {
    const newsCardTemplate = `
                    <li class="articles__card">
                        <div class="articles__image">
                            <button class="articles__button articles__button_tag"></button>
                            <button class="articles__button articles__button_reg"></button>
                            <button class="articles__button articles__button_bookmark"></button>
                        </div>
                        <div class="articles__wrap">
                            <div class="articles__date"></div>
                            <a class="articles__card-link" href="">
                                <h3 class="articles__card-title"></h3>
                            </a>
                            <div class="articles__text"></div>
                            <a class="articles__link page__link page__link_animation" href=""></a>
                        </div>
                    </li>
            `;
    this.element = document.createElement('div');
    this.element.insertAdjacentHTML('beforeend', newsCardTemplate.trim());
    this.element.querySelector('.articles__image').style.backgroundImage = `url(${urlToImage || null})`;
    this.element.querySelector('.articles__button_tag').textContent = this.keyWord;
    this.element.querySelector('.articles__button_reg').textContent = 'Войдите, чтобы сохранять статьи';
    this.element.querySelector('.articles__date').textContent = publishedAt;
    this.element.querySelector('.articles__card-link').setAttribute('href', url);
    this.element.querySelector('.articles__card-title').textContent = title;
    this.element.querySelector('.articles__text').textContent = description;
    this.element.querySelector('.articles__link').setAttribute('href', sourceName);
    this.element.querySelector('.articles__link').textContent = author;
    this.addBookmarkListener();
    this.container.append(this.element.firstChild);
  }

  cardTemplateAuthorized({
    urlToImage, publishedAt, url, title, description, author, sourceName,
  }) {
    const newsCardTemplate = `
                    <li class="articles__card">
                        <div class="articles__image">
                            <button class="articles__button articles__button_tag"></button>
                            <button class="articles__button articles__button_bookmark"></button>
                        </div>
                        <div class="articles__wrap">
                            <div class="articles__date"></div>
                            <a class="articles__card-link" href="">
                                <h3 class="articles__card-title"></h3>
                            </a>
                            <div class="articles__text"></div>
                            <a class="articles__link page__link page__link_animation" href=""></a>
                        </div>
                    </li>
            `;
    this.element = document.createElement('div');
    this.element.insertAdjacentHTML('beforeend', newsCardTemplate.trim());
    this.element.querySelector('.articles__image').style.backgroundImage = `url(${urlToImage || null})`;
    this.element.querySelector('.articles__button_tag').textContent = this.keyWord;
    this.element.querySelector('.articles__date').textContent = publishedAt;
    this.element.querySelector('.articles__card-link').setAttribute('href', url);
    this.element.querySelector('.articles__card-title').textContent = title.slice(0, 29);
    this.element.querySelector('.articles__text').textContent = description;
    this.element.querySelector('.articles__link').setAttribute('href', sourceName);
    this.element.querySelector('.articles__link').textContent = author;
    this.addSaveListener();
    this.container.append(this.element.firstChild);
  }

  cardTemplateSaved({
    _id, date, image, keyword, link, source, text, title,
  }) {
    const newsCardTemplate = `
                    <li class="articles__card">
                        <span class="articles__id"></span>
                        <div class="articles__image">
                            <button class="articles__button articles__button_tag"></button>
                            <button class="articles__button articles__button_unsave"></button>
                            <button class="articles__button articles__button_delete"></button>
                        </div>
                        <div class="articles__wrap">
                            <div class="articles__date"></div>
                            <a class="articles__card-link" href="">
                                <h3 class="articles__card-title"></h3>
                            </a>
                            <div class="articles__text"></div>
                            <a class="articles__link page__link page__link_animation" href=""></a>
                        </div>
                    </li>
            `;
    this.element = document.createElement('div');
    this.element.insertAdjacentHTML('beforeend', newsCardTemplate.trim());
    this.element.querySelector('.articles__id').textContent = _id;
    this.element.querySelector('.articles__image').style.backgroundImage = `url(${image || null})`;
    this.element.querySelector('.articles__button_tag').textContent = keyword;
    this.element.querySelector('.articles__button_unsave').textContent = 'Убрать из сохранённых';
    this.element.querySelector('.articles__date').textContent = date;
    this.element.querySelector('.articles__card-link').setAttribute('href', link);
    this.element.querySelector('.articles__card-title').textContent = title;
    this.element.querySelector('.articles__text').textContent = text;
    this.element.querySelector('.articles__link').setAttribute('href', link);
    this.element.querySelector('.articles__link').textContent = source;
    this.element.querySelector('.articles__button_tag').style.display = 'block';
    this.addUnsaveListener();
    this.addDeleteListener();
    this.container.append(this.element.firstChild);
  }

  getArticleParams(e) {
    const articleContainer = e.target.closest('.articles__card');
    e.target.classList.add('articles__button_bookmark_marked');
    const articleData = {
      keyword: articleContainer.querySelector('.articles__button_tag').textContent,
      title: articleContainer.querySelector('.articles__card-title').textContent,
      text: articleContainer.querySelector('.articles__text').textContent,
      date: articleContainer.querySelector('.articles__date').textContent,
      source: articleContainer.querySelector('.articles__link').href,
      link: articleContainer.querySelector('.articles__link').href,
      image: articleContainer.querySelector('.articles__image').style.backgroundImage.slice(5, -2),
    };
    this.saveArticle(articleData);
  }

  saveArticle(articleData) {
    this.mainApi.saveArticle(articleData);
  }

  showNeedReg(e) {
    if (e.target.classList.contains('articles__button_bookmark')) {
      e.target.previousElementSibling.style.display = 'block';
    }
  }

  hideNeedReg(e) {
    if (e.target.classList.contains('articles__button_bookmark')) {
      e.target.previousElementSibling.style.display = 'none';
    }
  }

  showUnsave(e) {
    if (e.target.classList.contains('articles__button_delete')) {
      e.target.previousElementSibling.style.display = 'block';
    }
  }

  hideUnsave(e) {
    if (e.target.classList.contains('articles__button_delete')) {
      e.target.previousElementSibling.style.display = 'none';
    }
  }

  deleteArticle(e) {
    const articleContainer = e.target.closest('.articles__card');
    const articleId = articleContainer.querySelector('.articles__id').textContent;
    this.mainApi.deleteArticle(articleId)
      .then(() => document.location.reload());
  }

  addDeleteListener() {
    this.element.firstChild.querySelector('.articles__button_delete').addEventListener('click', this.deleteArticle.bind(this));
  }


  addSaveListener() {
    this.element.firstChild.querySelector('.articles__button_bookmark').addEventListener('click', this.getArticleParams.bind(this));
  }

  addBookmarkListener() {
    this.element.firstChild.querySelector('.articles__button_bookmark').addEventListener('mouseover', this.showNeedReg);
    this.element.firstChild.querySelector('.articles__button_bookmark').addEventListener('mouseout', this.hideNeedReg);
  }

  addUnsaveListener() {
    this.element.firstChild.querySelector('.articles__button_delete').addEventListener('mouseover', this.showUnsave);
    this.element.firstChild.querySelector('.articles__button_delete').addEventListener('mouseout', this.hideUnsave);
  }

  renderLoader() {
    this.loaderContainer.style.display = 'block';
  }

  removeLoader() {
    this.loaderContainer.style.display = 'none';
  }

  renderError() {
    this.errorContainer.style.display = 'block';
  }

  removeError() {
    this.errorContainer.style.display = 'none';
  }

  showMainContainer() {
    this.mainContainer.style.display = 'flex';
  }

  hideMainContainer() {
    this.mainContainer.style.display = 'none';
  }

  showMore() {
    if (this.articlesArrayLenth > 3) {
      this.loadButton.style.display = 'block';
      this.loadButton.blur();
    } else {
      this.loadButton.style.display = 'none';
    }
  }

  addListener() {
    this.loadButton.addEventListener('click', this.renderResults.bind(this));
  }

  removeListener() {
    this.loadButton.removeEventListener('click', this.renderResults.bind(this));
  }
}
