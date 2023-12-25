import {serverSettings} from './utils'
class Api {
    constructor({url, header}) {
        this._url = url;
        this._header = header;
    }   

    _sendRequest(url, options) {
        return fetch(url, options)
        .then((response) => {
            if(response.ok) {
                return response.json();
            }
            throw new Error('Что-то пошло не так...');
        })
        .catch((err) => {
            console.log(err);
        })
    }
    getAllCards() {
        return this._sendRequest(`${this._url}cards`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': this._header
            }
        })
    }

    getUserInfo() {
        return this._sendRequest(`${this._url}users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': this._header
            }
        })
    }

    getAllData() {
        return Promise.all([this.getUserInfo(), this.getAllCards()]);
    }

    setUserInfo(userInfo) {
        return this._sendRequest(`${this._url}users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': this._header
            },
            body: JSON.stringify({
                name: userInfo.name,
                about: userInfo.about
            })
        })
    }

    addNewCard(newCard) {
        return this._sendRequest(`${this._url}cards`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': this._header
            }, 
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link
            })
        })
    }

    deleteCard(id) {
        return this._sendRequest(`${this._url}cards/${id}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': this._header
            }
        })
    }

    addLike(id) {
        return this._sendRequest(`${this._url}cards/${id}/likes`, {
            method: 'PUT',
            headers: {
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': this._header
            }
        })
    }

    deleteLike(id) {
        return this._sendRequest(`${this._url}cards/${id}/likes`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': this._header
            }
        })
    }

    changeLikeCardStatus(id, isNoLiked) {
        if(isNoLiked) {
            return this.addLike(id);
        }
        else {
            return this.deleteLike(id);
        }
    }
    editAvatar(avatar) {
       return this._sendRequest(`${this._url}users/me/avatar`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem("jwt")}`,
                'Content-Type': this._header
            },
            body: JSON.stringify({
                avatar: avatar
            })
        })
    }

}
const api = new Api(serverSettings);

export default api;