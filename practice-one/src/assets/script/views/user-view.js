export default class View {
    constructor() {
        this.listUser = this.getElement('#list-user')
    }

    getElement(selector) {
        const element = document.querySelector(selector)

        return element
    }

    createElement(tag, className) {
        const element = document.createElement(tag)
    
        if (className) element.classList.add(className)
    
        return element
    }

    displayUsers(users) {
        while (this.todoList.firstChild) {
            this.todoList.removeChild(this.todoList.firstChild)
        }
        
        if (users.length === 0) {
            const p = this.createElement('p')
            p.textContent = 'Not have user! Add a new user ?'
            this.listUser.append(p)
        }
        else {
            users.forEach(user => {
                const tr = this.createElement('tr', 'table-row')

                const tdImg = this.createElement('td', 'table-col')
                const avatar = this.createElement('div', 'avatar')
                avatar.textContent= 'I'
                tdImg.append(avatar)
                
                const tdName = this.createElement('td', 'table-col')
                tdName.textContent = user.username
                
                const tdStatus = this.createElement('td', 'table-col')
                const status = this.createElement('div', 'user-status')
                status.textContent = 'Not active'
                status.checked = user.status
                tdStatus.append(status)

                const tdEmail = this.createElement('td', 'table-col')
                tdEmail.textContent = user.email

                tr.append(tdImg, tdName, tdStatus, tdEmail)

                this.listUser.append(tr)
            })
        }
    }

}