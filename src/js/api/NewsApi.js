export default class NewsApi {
  constructor(config) {
    this.serverUrl = config.SERVER_URL;
    this.userKey = config.KEY;
    this.requestName = config.REQUEST_NAME;
    this.newsCount = config.NEWS_COUNT;
    this.sortBy = config.SORT_BY;
    this.date = config.DATE;
  }

  getToDate() {
    const date = new Date();
    return date.toISOString().substring(0, 10);
  }

  getFromDate() {
    const currentDate = new Date();
    const newDate = currentDate.setDate(currentDate.getDate() - this.date);
    const latestNewsDate = new Date(newDate);

    return latestNewsDate.toISOString().substring(0, 10);
  }


  getNews(keyword) {
    return fetch(`${this.serverUrl}?${this.requestName}=${keyword}&apiKey=1c98d96ded7a45c58e8435ca81fa9fb8&from=${this.getFromDate()}&to=${this.getToDate()}&pageSize=${this.newsCount}`,
      {
        headers: {
          'x-api-key': `${this.userKey}`
        }
      }
    ).then((res) => {
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

