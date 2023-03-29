class Api {
    constructor(options) {
        this.options = options
        this._getJSON = (res) => {
            if (res.ok) { // res.status == '200'
                return res.json()
            } else {
                if (res.status === 403 || res.status === 401) {
                    localStorage.removeItem('token')
                }
                return Promise.reject(res.status)
            }
        }
    }

    sendRequest(url, method, payload ) {
        const token = localStorage.getItem('token')
        return fetch(`${this.options.baseUrl}${url}`, {
            method,
            headers: {
                ...this.options.headers,
                'Authorization': `Bearer ${token}`
            },
            body: payload ? JSON.stringify(payload) : undefined
        })
        .then(this._getJSON)
    }
    getInitialCards() {
        return this.sendRequest('/cards', 'GET')
    }

    createNewCard(name, link) {
        return this.sendRequest(`/cards`, 'POST', { name, link })
    }

    removeCard(cardId) {
        return  this.sendRequest(`/cards/${cardId}`, 'DELETE')
    }

    getUser() {
        return this.sendRequest('/users/me', 'GET')
    }

    updateUser(name, about) {
        return this.sendRequest(`/users/me`, 'PATCH', { name, about })
    }

    changeAvatar (avatar) {
        return this.sendRequest(`/users/me/avatar`, 'PATCH', { avatar })
    }

    likeCard(cardId, doLike) {
        return this.sendRequest(`/cards/${cardId}/likes`, doLike ? 'PUT' : 'DELETE')
    }

}
const API_URL = process.env.API_URL
const api = new Api({
    baseUrl: API_URL ?? 'http://localhost:3000',
    headers: {
        'Content-Type': 'application/json'
    }
})
export default api
