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
        
        this.onUserListChanged(this.model.users)
        this._activeRoute = ''
    }

    setView(raw) {
        const route = raw.replace(/^#\//, '')
        this._activeRoute = route
    }

    onUserListChanged = users => {
        users.then(data => this.view.renderUsers(data))
    }

    handleViewUserDeTail = id => {
        const result = this.model.findUser(id)
        result.then(user => this.view.viewDetail(user))
    }

    handleAddNewUser = name => {
        const result = this.model.addNewUser(name)
        this.onUserListChanged(result)
    }

    handleEditUser = (id,user) => {
        console.log(id, user)
        const result = this.model.editUser(id, user)
        this.onUserListChanged(result)
    }

    handleDeleteUser = id => {
        const result = this.model.deleteUser(id)
        this.view.disableSub()
        this.onUserListChanged(result)
    }

    handleSearchUser = inputText => {
        const result = this.model.searchUser(inputText)
        this.onUserListChanged(result)
    }
}
