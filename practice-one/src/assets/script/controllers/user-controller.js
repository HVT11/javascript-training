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
        this.view.bindRowDataUser(this.handleViewUserDeTail)
        this.view.bindSearchUser(this.handleSearchUser)
        
        // this.onUserListChanged(this.model.users)
        this._activeRoute = ''
    }

    setView(raw) {
        const route = raw.replace(/^#\//, '')
        this._activeRoute = route
    }

    onUserListChanged = users => {
        this.view.renderUsers(users)
    }

    handleViewUserDeTail = id => {
        const result = this.model.findUser(id)
        this.view.viewDetail(result)
    }

    handleAddNewUser = userNameText => {
        const result = this.model.addNewUser(userNameText)
        this.onUserListChanged(result)
    }

    handleEditUser = (user) => {
        const result = this.model.editUser(user)
        this.onUserListChanged(result)
        this.view.viewDetail(user)
    }

    handleDeleteUser = id => {
        const result = this.model.deleteUser(id)
        this.onUserListChanged(result)
    }

    handleSearchUser = inputText => {
        const result = this.model.searchUser(inputText)
        this.onUserListChanged(result)
    }
}
