import * as helper from "../helpers/helper"
import * as variables from "../constants/classname"

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

    disableSub() {
        this.appMain.className = 'grid__column-max'
        this.appSub.style.display = 'none'
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
      
    resetInput() {
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
        helper.on(this.btnAddUser, 'click', event => {
            if (helper.getInput(this.inputUsername) !== '') {
                handler(helper.getInput(this.inputUsername))
                this.resetInput()
                this.closeModal()
            }
        })
        helper.on(this.inputUsername, 'keypress', event => {
            if(event.keyCode === 13) {
                event.preventDefault()
                if (helper.getInput(this.inputUsername) !== '') {
                    handler(helper.getInput(this.inputUsername))
                    this.resetInput()
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
            this.resetInput()
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

    bindRowDataUser(handler) {
        helper.delegate(this.listUser, '.table-body-row', 'click', (event,element) => {
            const id = helper.getId(element)
            this.enableSub()
            helper.getElementAll('.table__row').forEach(element => {
                if(element.classList.contains(variables.TABLE_ROW_ACTIVE)) element.classList.remove(variables.TABLE_ROW_ACTIVE)
            })
            element.classList.add(variables.TABLE_ROW_ACTIVE)
            handler(id)
        })
    }

    viewDetail(user) {
        //Validate avatar url
        if(helper.validateAvatarUrl(user.avatar, this.detailAvatar)) {
            this.detailAvatar.style.backgroundImage = `url('${user.avatar}')`
        }
        else {
            this.detailAvatar.innerHTML = user.name.charAt(0).toUpperCase()
        }

        if(helper.validateAvatarUrl(user.avatar, this.editAvatarImg)) {
            this.editAvatarImg.style.backgroundImage = `url('${user.avatar}')`
        }
        else {
            this.editAvatarImg.innerHTML = user.name.charAt(0).toUpperCase()
        }
        
        this.editAvatarUrl.value = user.avatar

        //Validate status
        helper.validateStatus(user.status, this.detailStatus, variables.USER_STATUS_ACTIVE)
        helper.validateStatus(user.status, this.editStatus, variables.USER_STATUS_ACTIVE)
        helper.toggleStatus(user.status, this.editCheckStatus)
        

        //Validate email
        helper.validateEmail(user.email, this.detailEmail)
        this.editEmail.value = user.email
        
        this.detailName.textContent = user.name
        this.editName.value = user.name
    }

    bindEditUser(handler) {
        this.btnSave.addEventListener('click', event => {
            const id = helper.getId(helper.findRowActive(variables.TABLE_ROW_ACTIVE))
            const user = {
                name :  helper.getInput(this.editName),
                email :  helper.getInput(this.editEmail),
                avatar :  helper.getInput(this.editAvatarUrl),
                status :  helper.getCheckbox(this.editCheckStatus) === true ? 1 : 0
            }
            handler(id, user)
        })
    }

    bindDeleteUser(handler) {
        this.btnDelete.addEventListener('click', event => {
            handler(helper.getId(helper.findRowActive(variables.TABLE_ROW_ACTIVE)))
        })
    }

    bindSearchUser(handler) {
        this.inputSearch.addEventListener('input', event => {
            let input = helper.getInput(this.inputSearch)
            handler(input)
        })
    }
}