export default class View {
    constructor(template) {
        this.template = template
        
        this.detailStatus = this.getElement('#detail-status')
        this.detailName = this.getElement('#detail-name')
        this.detailAvatar = this.getElement('#detail-avatar')
        this.detailEmail = this.getElement('#detail-email')

        this.appMain = this.getElement('#app-main')
        this.appSub = this.getElement('#app-sub')
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

    getElementAll(selector) {
        const elements = document.querySelectorAll(selector)

        return elements
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
            this.listUser.innerHTML = this.template.renderListUser(users)
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

    bindRowDataUser(users) {
        users.forEach(element => {
            var userDataRow = this.getElement('#row-'+element.id)
            userDataRow.addEventListener('click', event => {
                this.enableSub()
                this.viewDetail(element.username, element.avatar, element.status, element.email)
                this.getElementAll('.table-row').forEach(element => {
                    if(element.classList.contains("table-row--active")) element.classList.remove("table-row--active")
                })
                userDataRow.classList.add('table-row--active')
            })
        })
    }

    enableSub() {
        this.appMain.className = 'grid__column-7'
        this.appSub.className = 'grid__column-3'
        this.appSub.style.display = 'block'
    }

    viewDetail(uname, avatar, status, email) {
        //Check avatar url
        if(avatar !== '') this.detailAvatar.backgroundImage = `url(${avatar})`
        else this.detailAvatar.innerHTML = uname.charAt(0).toUpperCase()

        //Check status
        if(status) {
            this.detailStatus.textContent = 'Active'
            this.detailStatus.classList.add('user-status--active')
        }
        else {
            this.detailStatus.textContent = 'Not active'
            if(this.detailStatus.classList.contains('user-status--active')) this.detailStatus.classList.remove('user-status--active')
        }

        this.detailName.textContent = uname

        //Check email
        if(email !== '') this.detailEmail.textContent = email
        else this.detailEmail.textContent = 'Unknown'
    }
}