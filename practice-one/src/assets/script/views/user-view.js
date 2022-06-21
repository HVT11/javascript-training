import * as helper from "../helpers/helper"

export default class View {
    constructor(template) {
        this.template = template
        
        this.detailStatus = helper.getElement('#detail-status')
        this.detailName = helper.getElement('#detail-name')
        this.detailAvatar = helper.getElement('#detail-avatar')
        this.detailEmail = helper.getElement('#detail-email')

        this.appMain = helper.getElement('#app-main')
        this.appSub = helper.getElement('#app-sub')

        this.infoView = helper.getElement('#info-view')
        this.infoEdit = helper.getElement('#info-edit')

        this.listUser = helper.getElement('#list-user')
        this.inputUsername = helper.getElement('#input-username')

        this.editName = helper.getElement('#edit-name')
        this.editEmail = helper.getElement('#edit-email')
        this.editAvatarImg = helper.getElement('#edit-avatar-img')
        this.editAvatarUrl = helper.getElement('#edit-avatar-url')
        this.editName = helper.getElement('#edit-name')
        this.editCheckStatus = helper.getElement('#edit-check-status')
        this.editStatus = helper.getElement('#edit-status')

        this.btnSave = helper.getElement('#btn-save')
        this.btnEdit = helper.getElement('#btn-edit')
        this.btnBack = helper.getElement('#btn-back')
        this.btnAddUser = helper.getElement('#btn-add-user')
        this.btnOpenFormAdd = helper.getElement('#btn-open-form-add')
        this.btnCloseFormAdd = helper.getElement('#btn-close-form-add')
        
        this.modal = helper.getElement('#modal')
    }

    openModal() {
        this.modal.classList.add('modal--active')
    }

    closeModal() {
        this.modal.classList.remove('modal--active')
    }

    enableSub() {
        this.appMain.className = 'grid__column-7'
        this.appSub.className = 'grid__column-3'
        this.appSub.style.display = 'block'
    }

    openFormEdit() {
        this.infoView.classList.remove('info--active')
        this.infoEdit.classList.add('info--active')
    }

    closeFormEdit() {
        this.infoEdit.classList.remove('info--active')
        this.infoView.classList.add('info--active')
    }

    onToggleStatus(element) {
        if(this.editCheckStatus.checked) {
            element.innerHTML = 'Active'
            element.classList.add('user-status--active')
        }
        else{
            element.innerHTML = 'Not active'
            element.classList.remove('user-status--active')
        }
    }

    onChangeImg(inputUrl, element) {
        element.innerHTML = ''
        element.style.backgroundImage = `url('${inputUrl.value}')`
    }

    get _userNameText() {
        return this.inputUsername.value
    }
      
    _resetInput() {
        this.inputUsername.value = ''
    }

    displayUsers(users) {
        this.listUser.innerHTML = ''

        if (users.length === 0) {
            const p = helper.createElement('p')
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

    bindOpenFormEdit() {
        this.btnEdit.addEventListener('click', event => {
            this.openFormEdit()
        })
    }

    bindCloseFormEdit() {
        this.btnBack.addEventListener('click', event => {
            this.closeFormEdit()
        })
    }

    bindToggleStatus() {
        this.editCheckStatus.addEventListener('change', event => {
            this.onToggleStatus(this.editStatus)
        })
    }

    bindChangeImg() {
        this.editAvatarUrl.addEventListener('input', event => {
            this.onChangeImg(this.editAvatarUrl, this.editAvatarImg)
        })
    }

    bindRowDataUser(users) {
        users.forEach(element => {
            var userDataRow = helper.getElement('#row-'+element.id)
            userDataRow.addEventListener('click', event => {
                sessionStorage.setItem('userID', element.id)
                this.enableSub()
                this.viewDetail(element.username, element.avatar, element.status, element.email)
                helper.getElementAll('.table-row').forEach(element => {
                    if(element.classList.contains("table-row--active")) element.classList.remove("table-row--active")
                })
                userDataRow.classList.add('table-row--active')
            })
        })
    }

    viewDetail(username, avatar, status, email) {
        //Validate avatar url
        if(helper.validateAvatarUrl(avatar, this.detailAvatar)) {
            this.detailAvatar.style.backgroundImage = `url('${avatar}')`
        }
        else {
            this.detailAvatar.innerHTML = username.charAt(0).toUpperCase()
        }

        if(helper.validateAvatarUrl(avatar, this.editAvatarImg)) {
            this.editAvatarImg.style.backgroundImage = `url('${avatar}')`
        }
        else {
            this.editAvatarImg.innerHTML = username.charAt(0).toUpperCase()
        }
        
        this.editAvatarUrl.value = avatar

        //Validate status
        helper.validateStatus(status, this.detailStatus, 'user-status--active')
        helper.validateStatus(status, this.editStatus, 'user-status--active')
        helper.toggleStatus(status, this.editCheckStatus)
        

        //Validate email
        helper.validateEmail(email, this.detailEmail)
        this.editEmail.value = email
        
        this.detailName.textContent = username
        this.editName.value = username
    }

    bindEditUser(handler) {
        this.btnSave.addEventListener('click', event => {
            var id = parseInt(sessionStorage.getItem('userID'))
            var username =  helper.getInput(this.editName)
            var email =  helper.getInput(this.editEmail)
            var avatar =  helper.getInput(this.editAvatarUrl)
            var status =  helper.getCheckbox(this.editCheckStatus)

            handler(id, username, avatar, status, email)
        })
    }
}