export default class Controllers {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.model.bindUserListChanged(this.onUserListChanged)
        
        this.view.bindOpenModalAddUser()        
        this.view.bindCloseModalAddUser()
        this.view.bindOpenFormEdit()
        this.view.bindCloseFormEdit()
        this.view.bindToggleStatus()
        this.view.bindChangeImg()
        
        this.view.bindAddNewUser(this.handleAddNewUser)
        this.view.bindEditUser(this.handleEditUser)
        
        this.onUserListChanged(this.model.users) 

        this.view.bindRowDataUser(this.model.users)
    }

    onUserListChanged = users => {
        this.view.displayUsers(users)
        this.view.bindRowDataUser(this.model.users)
    }

    handleAddNewUser = userNameText => {
        this.model.addNewUser(userNameText)
    }

    handleEditUser = (id, username, avatar, status, email) => {
        this.model.editUser(id, username, avatar, status, email)
    }
}

