function getElement(selector) {
    const element = document.querySelector(selector)

    return element
}

function getElementAll(selector) {
    const elements = document.querySelectorAll(selector)

    return elements
}

function createElement(tag, className) {
    const element = document.createElement(tag)

    if (className) element.classList.add(className)

    return element
}

//Validate
function validateAvatarUrl(url, element) {
    element.style.backgroundImage = 'none'
    element.innerHTML = ''
    if(url !== '') {
        return true
    }
    return false
}

function validateStatus(status, element, className) {
    if(status) {
        element.textContent = 'Active'
        element.classList.add(className)
    }
    else {
        element.textContent = 'Not active'
        if(element.classList.contains(className)) element.classList.remove(className)
    }
}

function validateEmail(email, element) {
    if(email !== '') element.textContent = email
    else element.textContent = 'Unknown'
}

function toggleStatus(status, element) {
    element.checked = status
}

function getInput(element) {
    return element.value
}

function getCheckbox(element) {
    return element.checked
}

export {
    getElement,
    getElementAll,
    createElement,
    validateAvatarUrl,
    validateStatus,
    validateEmail,
    toggleStatus,
    getInput,
    getCheckbox
}