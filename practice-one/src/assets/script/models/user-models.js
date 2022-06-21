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

    addNewUser(username) {
        const user = {
            id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
            avatar: '',
            username: username,
            email: '',
            status: false
        }

        this.users.push(user)

        this._commit(this.users)
    }

    editUser(id, username, avatar, status, email) {
        const userEdit = {id: id, avatar: avatar, username: username, email: email, status: status}
        console.log(this.users)
        this.users = this.users.map(user => {
            if(user.id === id) return userEdit
            else return user
        })
        console.log(this.users)
        this._commit(this.users)
    }
}