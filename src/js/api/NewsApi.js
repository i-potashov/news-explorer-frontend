export default class NewsApi {
  constructor(config) {
    this.serverUrl = config.SERVER_URL;
    this.userKey = config.KEY;
    this.requestName = config.REQUEST_NAME;
    this.language = config.LANGUAGE;
    this.newsCount = config.NEWS_COUNT;
    this.sortBy = config.SORT_BY;
  }

  getNews(keyword) {
    return fetch(`https://newsapi.org/v2/everything?q=${keyword}&apiKey=1c98d96ded7a45c58e8435ca81fa9fb8&pageSize=30`,
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

