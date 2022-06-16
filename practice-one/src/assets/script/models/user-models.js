export default class Model {
    constructor() {
        this.users = JSON.parse(localStorage.getItem('users')) || []
    }

    bindUserListChanged(callback) {
        this.onUserListChanged = callback
    }

    _commit(users) {
        this.onUserListChanged(users)
        localStorage.setItem('users', JSON.stringify(users))
    }

    addUser(Username) {
        const user = {
            id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
            username: Username,
            email: '',
            status: false,
        }

        this.users.push(user)

        this._commit(this.users)
    }
}