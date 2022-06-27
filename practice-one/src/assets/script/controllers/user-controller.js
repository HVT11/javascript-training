export default class Controllers {
    constructor(model, view) {
        this.model = model
        this.view = view
        
        this.view.bindOpenModalAddUser()        
        this.view.bindCloseModalAddUser()
        this.view.bindOpenFormEdit()
        this.view.bindCloseFormEdit()
        this.view.bindOpenSearch()
        this.view.bindCloseSearch()
        this.view.bindToggleStatus()
        this.view.bindChangeImg()
        
        this.view.bindAddNewUser(this.handleAddNewUser)
        this.view.bindEditUser(this.handleEditUser)
        this.view.bindDeleteUser(this.handleDeleteUser)
        this.view.bindSearchUser(this.model.users)
        
        this.onUserListChanged(this.model.users)
        this._activeRoute = ''
    }

    setView(raw) {
        const route = raw.replace(/^#\//, '')
        this._activeRoute = route
    }

    onUserListChanged = users => {
        this.view.renderUsers(users)
        this.view.bindRowDataUser(users)
    }

    handleAddNewUser = userNameText => {
        const result = this.model.addNewUser(userNameText)
        this.onUserListChanged(result)
    }

    handleEditUser = (id, username, avatar, status, email) => {
        const result = this.model.editUser(id, username, avatar, status, email)
        this.onUserListChanged(result)
    }

    handleDeleteUser = id => {
        const result = this.model.deleteUser(id)
        this.onUserListChanged(result)
    }
}
