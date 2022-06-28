import {fetchUsers} from '../data/users'

export default class Model {
    constructor() {
        // this.users = JSON.parse(localStorage.getItem('users')) || []
        this.users = fetchUsers()
        console.log(this.users)
    }

    /**
     * @desc Save data change
     * @param {Array} users array of data user
     */
    save(users) {
        localStorage.setItem('users', JSON.stringify(users))
    }

    /**
     * @desc Save data change
     * @param {string} username username of user that you want to add
     */
    addNewUser(username) {
        const user = {
            id: this.users.length > 0 ? this.users[this.users.length - 1].id + 1 : 1,
            avatar: '',
            username: username,
            email: '',
            status: false
        }
        this.users.push(user)
        this.save(this.users)
        return this.users
    }

    /**
     * @desc Save data change
     * @param {object} user user data that you have changed
     * @return {Array} Return Array of users
     */
    editUser(user) {
        this.users = this.users.map(element => {
            if(element.id === user.id) return user
            else return element
        })

        this.save(this.users)
        return this.users
    }

    /**
     * @desc Save data change
     * @param {int} id Id of user that you want to delete
     * @return {Array} Return Array of users
     */
    deleteUser(id) {
        this.users = this.users.filter(user => user.id !== id) 
        this.save(this.users)
        return this.users
    }

    /**
     * @desc Find user
     * @param {int} id Id of user that you want to find
     * @return {object} Return user
     */
    findUser(id) {
        const user = this.users.find(user => user.id === id)
        return user
    }

    /**
     * @desc Search users
     * @param {string} input Keyword to search
     * @return {Array} Return Array of users
     */
    searchUser(input) {
        const users = this.users.filter(user => user.username.search(input) >= 0)
        return users
    }
}