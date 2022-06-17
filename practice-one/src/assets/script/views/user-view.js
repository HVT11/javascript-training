export default class View {
    constructor(template) {
        this.template = template

        this.listUser = this.getElement('#list-user')
        this.inputUname = this.getElement('#input-username')
        this.btnAddUser = this.getElement('#btn-add-user')
        this.btnOpenFormAdd = this.getElement('#btn-open-form-add')
        this.btnCloseFormAdd = this.getElement('#btn-close-form-add')
        this.modal = this.getElement('#modal')
    }

    getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }

    openModal() {
        this.modal.classList.add('modal--active')
    }

    closeModal() {
        this.modal.classList.remove('modal--active')
    }

    createElement(tag, className) {
        const element = document.createElement(tag)
    
        if (className) element.classList.add(className)
    
        return element
    }

    get _userNameText() {
        return this.inputUname.value
    }
      
    _resetInput() {
        this.inputUname.value = ''
    }

    displayUsers(users) {
        while (this.listUser.firstChild) {
            this.listUser.removeChild(this.listUser.firstChild)
        }

        if (users.length === 0) {
            const p = this.createElement('p')
            p.textContent = 'Not have user! Add a new user ?'
            this.listUser.append(p)
        }
        else {
            this.listUser.innerHTML = this.template.show(users)
            console.log(this.template.show(users))
        }

    }

    bindAddNewUser(handler) {
        this.btnAddUser.addEventListener('click', event => {
            if (this._userNameText !== '') {
                handler(this._userNameText)
                this._resetInput()
                this.closeModal()
            }
        })
    }

    bindOpenModalAddUser() {
        this.btnOpenFormAdd.addEventListener('click', event => {
            this.openModal()
        })
    }

    bindCloseModalAddUser() {
        this.btnCloseFormAdd.addEventListener('click', event => {
            this._resetInput()
            this.closeModal()
        })
    }
}