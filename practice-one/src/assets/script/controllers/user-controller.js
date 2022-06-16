export default class Controllers {
    constructor(model, view) {
        this.model = model
        this.view = view

        this.model.bindUserListChanged(this.onUserListChanged)

        this.onUserListChanged(this.model.users)
    }

    onUserListChanged = users => {
        this.view.displayUsers(users)
    }

    handleAddTodo = todoText => {
        this.model.addUser(todoText)
    }
}