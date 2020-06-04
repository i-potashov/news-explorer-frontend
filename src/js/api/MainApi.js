export default class MainApi {
  constructor(props) {
    this._token = props.token;
    this._url = props.url;
  }

  getJSONResponse(res) {
    if (res.ok) return res.json();
    return Promise.reject(res);
  }

  getUserData() {
    return fetch('https://api.backa.ru/users/me', {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => this.getJSONResponse(res));
  }

  getArticles() {
    return fetch('https://api.backa.ru/articles', {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => res.json());
  }

  saveArticle(articleData) {
    return fetch('https://api.backa.ru/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify(articleData),
    }).then((res) => this.getJSONResponse(res));
  }

  deleteArticle(articleId) {
    return fetch(`https://api.backa.ru/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then((res) => this.getJSONResponse(res));
  }

  signup(userData) {
    const { name, email, password } = userData;
    return fetch('https://api.backa.ru/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then((res) => this.getJSONResponse(res));
  }

  signin(userData) {
    const { email, password } = userData;
    return fetch('https://api.backa.ru/signin', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then((res) => this.getJSONResponse(res));
  }
}
