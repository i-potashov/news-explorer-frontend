export default class MainApi {
  constructor() {
    // this.url = 'http://localhost:3000';
    // this.token = `Bearer ${localStorage.getItem('token')}`;
  }

  getJSONResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res);
  }

  getUserData() {
    return fetch(`https://api.backa.ru/users/me`, {
      method: 'GET',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
  }

  getArticles() {
    return fetch(`https://api.backa.ru/articles`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    }).then(res => res.json());
  }

  signup(userData) {
    const {name, email, password} = userData;
    return fetch(`https://api.backa.ru/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name,
        email,
        password
      }),
    }).then(res => this.getJSONResponse(res))
      .then(res => localeStorage.set(res));
  }

  signin(userData) {
    const {email, password} = userData;
    return fetch(`https://api.backa.ru/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .then(res => this.getJSONResponse(res))

  }


}
