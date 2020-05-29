// NewsCardList. Класс списка карточек новостей.
// Конструктор принимает массив карточек, которые должны быть в списке при первой отрисовке. Методы:
// renderResults принимает массив экземпляров карточек и отрисовывает их;
// renderLoader отвечает за отрисовку лоудера;
// renderError принимает объект ошибки и показывает ошибку в интерфейсе;
// showMore отвечает за функциональность кнопки «Показать ещё»;
// addCard принимает экземпляр карточки и добавляет её в список.

export default class NewsCardList {
  constructor(articlesArray, loadButton) {

    this.element = null;
    // this.urlToImage = cardData.urlToImage;
    // this.publishedAt = cardData.publishedAt;
    // this.url = cardData.url;
    // this.title = cardData.title;
    // this.description = cardData.description;
    // this.author = cardData.author || cardData.url.match(/https?:\/\/(?:[-\w]+\.)?([-\w]+)\.\w+(?:\.\w+)?\/?.*/i)[1];
    // this.sourceName = cardData.source.name;

    this.articlesArray = articlesArray;
    this.articlesArrayLenth = articlesArray.length;
    this.loadButton = loadButton;

    this.newElement = null;
    // this.newsArrayLenth = null;
    this.lastNewsCount = 0;
    this.container = document.querySelector('.articles__cards');
    this.loaderContainer = document.querySelector('.articles__loader');
    this.errorContainer = document.querySelector('.articles__not-found');
    this.loadButton = document.querySelector('.button__content_load');
    this.newsCardTemplate = `
                    <li class="articles__card">
                        <div class="articles__image"
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

  }

  renderResults() {

    if (this.articlesArrayLenth > 2) {
      for (let i = this.lastNewsCount; i < this.lastNewsCount + 3; i++) {
        this.renderNewsCard(this.articlesArray[i]);
        this.showMore();
      }
      this.articlesArrayLenth -= 3;
      this.lastNewsCount += 3;
    } else {
      for (let i = this.lastNewsCount; i < this.lastNewsCount + (this.articlesArrayLenth); i++) {
        this.renderNewsCard(this.articlesArray[i]);
        this.showMore();
      }
    }
  }

  renderNewsCard({urlToImage, publishedAt, url, title, description, author, sourceName}) {
    this.element = document.createElement('div');
    this.element.insertAdjacentHTML('beforeend', this.newsCardTemplate.trim());
    this.element.querySelector('.articles__image').style.backgroundImage = `url(${urlToImage||null})`;
    this.element.querySelector('.articles__date').textContent = publishedAt;
    this.element.querySelector('.articles__card-link').setAttribute('href', url);
    this.element.querySelector('.articles__card-title').textContent = title;
    this.element.querySelector('.articles__text').textContent = description;
    this.element.querySelector('.articles__link').setAttribute('href', sourceName);
    this.element.querySelector('.articles__link').textContent = author;
    this.container.append(this.element.firstChild);
  }

  renderLoader() {
    // this.loaderContainer.setAttribute('display', 'block');
  }

  removeLoader() {

  }

  renderError() {
    // this.errorContainer.setAttribute('display', 'block');
  }

  removeError() {
    // this.errorContainer.setAttribute('display', 'block');
  }

  showMore() {
    if (this.articlesArrayLenth > 3) {
      this.loadButton.style.display = 'block';
      this.loadButton.blur();
    } else {
      this.loadButton.style.display = 'none';
    }
    // console.log(this.lastNewsCount,this.articlesArrayLenth);
  }

  showMoreHandler() {
    this.loadButton.addEventListener('click', this.renderResults.bind(this));
  }

  addCard() {

  }
}
