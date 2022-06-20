export default class Controllers {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.model.bindUserListChanged(this.onUserListChanged)
        
        this.view.bindOpenModalAddUser()        
        this.view.bindCloseModalAddUser()
        
        this.view.bindAddNewUser(this.handleAddNewUser)
        
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

}

