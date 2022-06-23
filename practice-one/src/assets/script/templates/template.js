import * as helper from '../helpers/helper'
export default class Template {
    constructor() {
        this.defautTemplate
        = `<tr class="table-row table-body-row" id="{{id}}">
                <td class="table-col">
                    {{avatar}}
                </td>
                <td class="table-col">{{username}}</td>
                <td class="table-col">
                    <div class="user-status {{status-color}}">{{status}}</div>
                </td>
                    <td class="table-col">{{email}}</td>
           </tr>`
    }

    checkStatusText(status) {
        if(status) return "Active"
        else return "Not active"
    }

    checkStatusColor(status) {
        if(status) return helper.USER_STATUS_ACTIVE
        else return ""
    }

    checkAvatar(url, username) {
        if(url !== '') return `<img src="${url}" alt="" class="avatar">`
        else return `<div class="avatar">${username.charAt(0).toUpperCase()}</div>`
    }

    renderListUser(data) {
        let view = ''
        data.forEach(user => {
            let template = this.defautTemplate
            template = template.replace('{{id}}', user.id)
            template = template.replace('{{avatar}}', this.checkAvatar(user.avatar, user.username))
            template = template.replace('{{email}}', user.email)
            template = template.replace('{{username}}', user.username)
            template = template.replace('{{status}}', this.checkStatusText(user.status))
            template = template.replace('{{status-color}}', this.checkStatusColor(user.status))
            view = view + template
        })
        return view
    }
}

