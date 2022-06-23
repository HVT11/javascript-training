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

        this.userID = 0
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
            this.userID = parseInt(helper.getId(element))
            console.log(this.userID)
            const user = users.find(user => user.id === this.userID)
            this.viewDetail(user.username, user.avatar, user.status, user.email)
            this.enableSub()
            helper.getElementAll('.table-row').forEach(element => {
                if(element.classList.contains(helper.TABLE_ROW_ACTIVE)) element.classList.remove(helper.TABLE_ROW_ACTIVE)
            })
            element.classList.add(helper.TABLE_ROW_ACTIVE)
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
        helper.validateStatus(status, this.detailStatus, helper.USER_STATUS_ACTIVE)
        helper.validateStatus(status, this.editStatus, helper.USER_STATUS_ACTIVE)
        helper.toggleStatus(status, this.editCheckStatus)
        

        //Validate email
        helper.validateEmail(email, this.detailEmail)
        this.editEmail.value = email
        
        this.detailName.textContent = username
        this.editName.value = username
        console.log(this.userID)
    }

    bindEditUser(handler) {
        this.btnSave.addEventListener('click', event => {
            var id = this.userID
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
            handler(this.userID)
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