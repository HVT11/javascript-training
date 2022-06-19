export default class Template {
    constructor() {
        this.defautTemplate
        = `<tr class="table-row" id="row-{{id}}">
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
        if(status) return "user-status--active"
        else return ""
    }

    checkAvatar(url, username) {
        if(url !== '') return `<img src="${url}" alt="" class="avatar">`
        else return `<div class="avatar">${username.charAt(0).toUpperCase()}</div>`
    }

    renderListUser(data) {
        var i, l
        var view = ''
        for(i = 0, l = data.length; i < l; i++){
            var template = this.defautTemplate
            template = template.replace('{{id}}', data[i].id)
            template = template.replace('{{avatar}}', this.checkAvatar(data[i].avatar, data[i].username))
            template = template.replace('{{email}}', data[i].email)
            template = template.replace('{{username}}', data[i].username)
            template = template.replace('{{status}}', this.checkStatusText(data[i].status))
            template = template.replace('{{status-color}}', this.checkStatusColor(data[i].status))
            view = view + template
        }
        return view
    }
}

