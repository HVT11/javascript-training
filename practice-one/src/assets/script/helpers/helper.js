const getElement = (selector) => {
    const element = document.querySelector(selector)

    return element
}

const getElementAll = (selector) =>{
    const elements = document.querySelectorAll(selector)

    return elements
}

const createElement = (tag, className) =>{
    const element = document.createElement(tag)

    if (className) element.classList.add(className)

    return element
}

//Validate
const validateAvatarUrl = (url, element) =>{
    element.style.backgroundImage = 'none'
    element.innerHTML = ''
    if(url !== '') {
        return true
    }
    return false
}

const validateStatus = (status, element, className) =>{
    if(status) {
        element.textContent = 'Active'
        element.classList.add(className)
    }
    else {
        element.textContent = 'Not active'
        if(element.classList.contains(className)) element.classList.remove(className)
    }
}

const validateEmail = (email, element) =>{
    if(email !== '') element.textContent = email
    else element.textContent = 'Unknown'
}

const toggleStatus = (status, element) =>{
    element.checked = status
}

const getInput = (element) =>{
    return element.value
}

const getCheckbox = (element) =>{
    return element.checked
}

const getId = (element) =>{
    return parseInt(element.id)
}

const findParent = (element) =>{
    return element.parentElement
}

const findRowActive = (className) => {
    return getElement('.'+className)
}

//Event
const on = (target, type, callback) => {
    target.addEventListener(type, callback)
}

const delegate = (target, selector, type, handler) =>{
    const dispatchEvent = event => {
        const targetElement = event.target
        const parentTargetElement = findParent(targetElement)
        const potentialElements = target.querySelectorAll(selector)
        let i = potentialElements.length
        while (i--) {
            if((potentialElements[i] === targetElement)) {
                handler(event, targetElement)
                break;
            }
            else if((potentialElements[i] === parentTargetElement)) {
                handler(event, parentTargetElement)
                break;
            }
        }
    }
    on(target, type, dispatchEvent)
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
    getCheckbox,
    getId,
    findRowActive,
    on,
    delegate
}