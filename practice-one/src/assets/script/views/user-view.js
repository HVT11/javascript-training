export default class View {
    constructor(template) {
        this.template = template

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
}