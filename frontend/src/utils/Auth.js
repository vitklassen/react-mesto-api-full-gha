import {authSettings} from './utils'
class Auth {
  constructor({ baseUrl, header }) {
    this._baseurl = baseUrl;
    this._header = header;
  }

  _sendRequest(url, options) {
    return fetch(url, options).then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error("Что-то пошло не так...");
    });
  }

  register(password, email) {
    return this._sendRequest(`${this._baseurl}signup`, {
      method: "POST",
      headers: {
        "Content-Type": this._header,
      },
      body: JSON.stringify({ password: password, email: email }),
    });
  }

  authorize(password, email) {
    return this._sendRequest(`${this._baseurl}signin`, {
      method: "POST",
      headers: {
        "Content-Type": this._header,
      },
      body: JSON.stringify({ password: password, email: email }),
    });
  }

  tokenCheck(token) {
    return this._sendRequest(`${this._baseurl}users/me`, {
      method: "GET",
      headers: {
        "Content-Type": this._header,
        Authorization: `Bearer ${token}`,
      },
    });
  }
}

const auth = new Auth(authSettings);

export default auth;
