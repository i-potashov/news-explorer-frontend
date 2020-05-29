// NewsApi. Отвечает за взаимодействие с NewsAPI.
// У класса есть конструктор, принимающий опции, и единственный обязательный метод getNews.
// getNews возвращает список новостей на основе запроса.

// Разобраться с датами

export default class NewsApi {
  constructor(config) {
    this.serverUrl = config.SERVER_URL;
    this.userKey = config.KEY;
    this.requestName = config.REQUEST_NAME;
    this.language = config.LANGUAGE;
    this.newsCount = config.NEWS_COUNT;
    this.sortBy = config.SORT_BY;
  }

  _getDateFrom() {
    // Date.prototype.toISOString()
  }

  _getDateTo() {

  }

  getNews(keyWord) {
    console.log(keyWord);
    return fetch(`${this.serverUrl}?${this.requestName}=${keyWord}&language=${this.language}&pageSize=${this.newsCount}&sortBy=${this.sortBy}`,
      {
        method: 'GET',
        headers: {
          'X-Api-Key': this.userKey
        }
      })
      .then(res => {
        if (res.ok) {
          console.log(`Получение новостей с сервера: ${res.status} - Ok`);
          return res.json();
        } else {
          return Promise.reject(res.status);
        }
      })
      .then(value => {
        this.cardsArr = value;
        return value;
      })
      .catch(error => console.log('Ошибка соединения с сервером', error));
  }

}
