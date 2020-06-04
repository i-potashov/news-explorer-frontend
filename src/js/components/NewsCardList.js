export default class NewsCardList {
  constructor(mainApi, userController) {
    this.mainApi = mainApi;
    this.userController = userController || null;
    this.element = null;
    this.articlesArray = null;
    this.keyWord = null;
    this.articlesColumns = 3;
    this.loadButton = document.querySelector('.button__content_load');
    this.mainContainer = document.querySelector('.articles__container');
    this.container = document.querySelector('.articles__cards');
    this.loadButton = document.querySelector('.button__content_load');
  }

  setArticlesArray(articles, keyWord) {
    this.keyWord = keyWord;
    this.articlesArray = articles;
  }

  renderResults() {
    if (this.articlesArray.length > this.articlesColumns) {
      for (let i = 0; i < this.articlesColumns; i++) {
        this.addCard(this.articlesArray[0]);
        this.articlesArray.shift();
      }
      this.showMore();
    } else {
      for (let i = 0; i < this.articlesArray.length; i++) {
        this.addCard(this.articlesArray[0]);
        this.articlesArray.shift();
      }
      this.hideShowMore();
    }
  }

  addCard(article) {
    localStorage.getItem('token')
      ? this.cardTemplateAuthorized(article)
      : this.cardTemplateUnauthorized(article);
  }

  dateConvert(date) {
    const convertDate = new Date(date);
    const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
    return `${convertDate.getDate()} ${months[convertDate.getMonth()]}, ${convertDate.getFullYear()}`;
  }

  cardTemplateUnauthorized(article) {
    const imageUrl = article.urlToImage || 'https://i.pinimg.com/736x/da/e7/49/dae749086624b174cb51b9377839f01f.jpg';
    const date = this.dateConvert(article.publishedAt);
    const linkUrl = article.url;
    const title = article.title || 'Ссылка на источник';
    const text = article.description || 'Описание отсутствует';
    const sourseName = article.source.name || 'Источник';

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
    this.element.querySelector('.articles__image').style.backgroundImage = `url(${imageUrl})`;
    this.element.querySelector('.articles__button_tag').textContent = this.keyWord;
    this.element.querySelector('.articles__button_reg').textContent = 'Войдите, чтобы сохранять статьи';
    this.element.querySelector('.articles__date').textContent = date;
    this.element.querySelector('.articles__card-link').setAttribute('href', linkUrl);
    this.element.querySelector('.articles__card-title').textContent = title;
    this.element.querySelector('.articles__text').textContent = text;
    this.element.querySelector('.articles__link').setAttribute('href', linkUrl);
    this.element.querySelector('.articles__link').textContent = sourseName;
    this.addBookmarkListener();
    this.container.append(this.element.firstChild);
  }

  cardTemplateAuthorized(article) {
    const imageUrl = article.urlToImage || 'https://i.pinimg.com/736x/da/e7/49/dae749086624b174cb51b9377839f01f.jpg';
    const date = this.dateConvert(article.publishedAt);
    const linkUrl = article.url;
    const title = article.title || 'Ссылка на источник';
    const text = article.description || 'Описание отсутствует';
    const sourseName = article.source.name || 'Источник';

    const newsCardTemplate = `
                    <li class="articles__card">
                        <span class="articles__id"></span>
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
    this.element.querySelector('.articles__image').style.backgroundImage = `url(${imageUrl})`;
    this.element.querySelector('.articles__button_tag').textContent = this.keyWord;
    this.element.querySelector('.articles__date').textContent = date;
    this.element.querySelector('.articles__card-link').setAttribute('href', linkUrl);
    this.element.querySelector('.articles__card-title').textContent = title.slice(0, 29);
    this.element.querySelector('.articles__text').textContent = text;
    this.element.querySelector('.articles__link').setAttribute('href', linkUrl);
    this.element.querySelector('.articles__link').textContent = sourseName;
    this.addSaveListener();
    this.container.append(this.element.firstChild);
  }

  getArticleParams(e) {
    const articleContainer = e.target.closest('.articles__card');
    const articleData = {
      keyword: articleContainer.querySelector('.articles__button_tag').textContent,
      title: articleContainer.querySelector('.articles__card-title').textContent,
      text: articleContainer.querySelector('.articles__text').textContent,
      date: articleContainer.querySelector('.articles__date').textContent,
      source: articleContainer.querySelector('.articles__link').textContent,
      link: articleContainer.querySelector('.articles__link').href,
      image: articleContainer.querySelector('.articles__image').style.backgroundImage.slice(5, -2),
    };
    if (e.target.classList.contains('articles__button_bookmark_marked')) {
      this.mainApi.deleteArticle(articleContainer.querySelector('.articles__id').textContent)
        .then(() => {
          e.target.classList.remove('articles__button_bookmark_marked');
          articleContainer.querySelector('.articles__id').textContent = '';
        });
    } else {
      this.mainApi.saveArticle(articleData)
        .then((res) => {
          articleContainer.querySelector('.articles__id').textContent = res._id;
          e.target.classList.add('articles__button_bookmark_marked');
        });
    }
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
    this.element.querySelector('.articles__image').style.backgroundImage = `url(${image})`;
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

  deleteArticle(e) {
    const articleContainer = e.target.closest('.articles__card');
    const articleId = articleContainer.querySelector('.articles__id').textContent;
    this.mainApi.deleteArticle(articleId)
      .then(() => {
        e.target.closest('.articles__card').remove();
        this.mainApi.getUserData()
          .then((res) => this.userController.setUserName(res));
        this.mainApi.getArticles()
          .then((res) => this.userController.setArticlesCount(res))
          .then((res) => this.userController.setKeywords(res));
      });
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

  showMainContainer() {
    this.mainContainer.style.display = 'flex';
  }

  showMore() {
    this.loadButton.style.display = 'block';
    this.loadButton.blur();
  }

  hideShowMore() {
    this.loadButton.style.display = 'none';
    this.removeListener();
  }

  addListener() {
    this.loadButton.addEventListener('click', this.renderResults.bind(this));
  }

  removeListener() {
    this.loadButton.removeEventListener('click', this.renderResults.bind(this));
  }
}
