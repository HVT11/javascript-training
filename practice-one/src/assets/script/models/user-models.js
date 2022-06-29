import {fetchUsers, createUser, removeUser, updateUser, uploadAvatar} from '../data/users'

export default class Model {
    constructor() {
        this.users = fetchUsers()
    }

    /**
     * @desc Add new user
     * @param {string} name username of user that you want to add
     * @return {Promise} Return Promise
     */
    addNewUser = async (name)=>{
        const user = {
            name: name
        }
        await createUser(user)
        return fetchUsers()
    }

    /**
     * @desc Edit user
     * @param {object} user user data that you have changed
     * @return {Array} Return Array of users
     */
    editUser = async(id, user) =>{
        await updateUser(id, user)
        return fetchUsers()
    }

    /**
     * @desc Edit user
     * @param {number} id Id of user
     * @param {FormData} file 
     */
    uploadImg = async (id, file) => {
        const result = await uploadAvatar(id, file)
        return result
    }

    /**
     * @desc Delete user
     * @param {int} id Id of user that you want to delete
     * @return {Promise} Return Promise
     */
    deleteUser = async(id) =>{
        await removeUser(id)
        return fetchUsers()
    }

    /**
     * @desc Find user
     * @param {int} id Id of user that you want to find
     * @return {Promise} Return Promise
     */
    findUser = (id) => {
        const userFinded = fetchUsers().then(data => {
            const user = data.find(user => user.id === id)
            return user
        })
        return userFinded
    }

    /**
     * @desc Search users
     * @param {string} input Keyword to search
     * @return {Promise} Return Promise
     */
    searchUser = (input) => {
        const users = fetchUsers().then(data => {
            const userSearch = data.filter(user => user.name.search(input) >= 0)
            return userSearch
        })
        return users
    }
}