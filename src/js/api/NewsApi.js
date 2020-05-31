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
          'X-Api-Key': this.userKey,
        },
      })
      .then((res) => {
        if (res.ok) {
          console.log(`Получение новостей с сервера: ${res.status} - Ok`);
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((value) => value.articles)
      .catch((error) => console.log('Ошибка соединения с сервером', error));
  }
}
