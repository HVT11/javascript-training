import * as helper from "../helpers/helper"
import * as variables from "../variables"

export default class View {
    constructor(template) {
        this.template = template
        
        this.detailStatus = helper.getElement('#detail-status')
        this.detailName = helper.getElement('#detail-name')
        this.detailAvatar = helper.getElement('#detail-avatar')
        this.detailEmail = helper.getElement('#detail-email')

        this.appMain = helper.getElement('#app-main')
        this.appSub = helper.getElement('#app-sub')

        this.title = helper.getElement('#title')
        this.search = helper.getElement('#search')

        this.infoView = helper.getElement('#info-view')
        this.infoEdit = helper.getElement('#info-edit')

        this.listUser = helper.getElement('#list-user')
        this.inputUsername = helper.getElement('#input-username')
        this.inputSearch = helper.getElement('#input-search')

        this.editName = helper.getElement('#edit-name')
        this.editEmail = helper.getElement('#edit-email')
        this.editAvatarImg = helper.getElement('#edit-avatar-img')
        this.editAvatarUrl = helper.getElement('#edit-avatar-url')
        this.editName = helper.getElement('#edit-name')
        this.editCheckStatus = helper.getElement('#edit-check-status')
        this.editStatus = helper.getElement('#edit-status')

        this.btnSearch = helper.getElement('#btn-search')
        this.btnCancelSearch = helper.getElement('#btn-cancel-search')
        this.btnDelete = helper.getElement('#btn-delete')
        this.btnSave = helper.getElement('#btn-save')
        this.btnEdit = helper.getElement('#btn-edit')
        this.btnBack = helper.getElement('#btn-back')
        this.btnAddUser = helper.getElement('#btn-add-user')
        this.btnOpenFormAdd = helper.getElement('#btn-open-form-add')
        this.btnCloseFormAdd = helper.getElement('#btn-close-form-add')
        
        this.modal = helper.getElement('#modal')
    }

    openModal() {
        this.modal.classList.add(variables.MODAL_ACTIVE)
    }

    closeModal() {
        this.modal.classList.remove(variables.MODAL_ACTIVE)
    }

    enableSub() {
        this.appMain.className = 'grid__column-7'
        this.appSub.className = 'grid__column-3'
        this.appSub.style.display = 'block'
    }

    openFormEdit() {
        this.infoView.classList.remove(variables.INFO_ACTIVE)
        this.infoEdit.classList.add(variables.INFO_ACTIVE)
    }

    closeFormEdit() {
        this.infoEdit.classList.remove(variables.INFO_ACTIVE)
        this.infoView.classList.add(variables.INFO_ACTIVE)
    }

    openSearch() {
        this.title.style.display = 'none'
        this.search.style.display = 'flex'
    }

    closeSearch() {
        this.title.style.display = 'flex'
        this.search.style.display = 'none'
    }

    onToggleStatus(element) {
        if(this.editCheckStatus.checked) {
            element.innerHTML = 'Active'
            element.classList.add(variables.USER_STATUS_ACTIVE)
        }
        else{
            element.innerHTML = 'Not active'
            element.classList.remove(variables.USER_STATUS_ACTIVE)
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

    renderUsers(users) {
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
        this.inputUsername.addEventListener('keypress', event => {
            if(event.keyCode === 13) {
                event.preventDefault()
                if (this._userNameText !== '') {
                    handler(this._userNameText)
                    this._resetInput()
                    this.closeModal()
                }
            }
        })
    }

    bindOpenModalAddUser() {
        this.btnOpenFormAdd.addEventListener('click', event => {
            this.openModal()
            this.inputUsername.focus()
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

    bindOpenSearch() {
        this.btnSearch.addEventListener('click', event => {
            this.openSearch()
            this.inputSearch.focus()
        })
    }

    bindCloseSearch() {
        this.btnCancelSearch.addEventListener('click', event => {
            this.closeSearch()
            location.reload()
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
        helper.delegate(this.listUser, '.table-body-row', 'click', (event,element) => {
            const id = helper.getId(element)
            const user = users.find(user => user.id === id)
            this.viewDetail(user.username, user.avatar, user.status, user.email)
            this.enableSub()
            helper.getElementAll('.table__row').forEach(element => {
                if(element.classList.contains(variables.TABLE_ROW_ACTIVE)) element.classList.remove(variables.TABLE_ROW_ACTIVE)
            })
            element.classList.add(variables.TABLE_ROW_ACTIVE)
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
        helper.validateStatus(status, this.detailStatus, variables.USER_STATUS_ACTIVE)
        helper.validateStatus(status, this.editStatus, variables.USER_STATUS_ACTIVE)
        helper.toggleStatus(status, this.editCheckStatus)
        

        //Validate email
        helper.validateEmail(email, this.detailEmail)
        this.editEmail.value = email
        
        this.detailName.textContent = username
        this.editName.value = username
    }

    bindEditUser(handler) {
        this.btnSave.addEventListener('click', event => {
            var id = helper.getId(helper.findRowActive(variables.TABLE_ROW_ACTIVE))
            var username =  helper.getInput(this.editName)
            var email =  helper.getInput(this.editEmail)
            var avatar =  helper.getInput(this.editAvatarUrl)
            var status =  helper.getCheckbox(this.editCheckStatus)

            handler(id, username, avatar, status, email)
            this.viewDetail(username, avatar, status, email)
        })
    }

    bindDeleteUser(handler) {
        this.btnDelete.addEventListener('click', event => {
            handler(helper.getId(helper.findRowActive(variables.TABLE_ROW_ACTIVE)))
        })
    }

    bindSearchUser(users) {
        this.inputSearch.addEventListener('input', event => {
            let input = helper.getInput(this.inputSearch)
            let userSeach = users.filter(user => user.username.search(input) >= 0)
            this.renderUsers(userSeach)
            this.bindRowDataUser(userSeach)
        })
    }
}