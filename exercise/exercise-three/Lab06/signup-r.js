const email = document.getElementsByName('email')[0]
const uname = document.getElementsByName('uname')[0]
const pswd = document.getElementsByName('pswd')[0]
const pswdr = document.getElementsByName('pswdr')[0]

// Validate Email
function validateEmail(input) {
  const msgEmail = document.getElementById('msg_email')
  if(input.value === '') {
    msgEmail.innerHTML = 'Email is empty'
    return false
  }
  else {
    var validRegex = /^[a-zA-Z0-9.]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    if (input.value.match(validRegex)) {
      msgEmail.innerHTML = ''
      return true
    } else {
      msgEmail.innerHTML = "Email address wrong format. example: username@somewhere.sth"
      return false
    }
  }
}

// Validate Username
function validateUsername(input) {
  const msgUName = document.getElementById('msg_uname')
  if(input.value === '') {
    msgUName.innerHTML = 'Username is empty'
    return false
  }
  else if(input.value.length > 40){
    msgUName.innerHTML = 'Username is too long. Maximum is 40 character'
    return false
  }
  else {
    var validRegex = /^[a-zA-Z0-9_-]*$/;
    if (input.value.match(validRegex)) {
      msgUName.innerHTML = ''
      return true
    } else {
      msgUName.innerHTML = "Username is invalid. Be sure it does not contain strange symbols or extra spaces anywhere"
      return false
    }
  }
}

// Validate Password
function validatePassword(input) {
  const msgPswd = document.getElementById('msg_pswd')
  if(input.value == '') {
    msgPswd.innerHTML = 'Password is empty'
    return false
  }
  else {
    var validRegex = /^[a-zA-Z0-9]*$/;
    if (input.value.match(validRegex)) {
      msgPswd.innerHTML = ''
      return true
    } else {
      msgPswd.innerHTML = "Password is invalid. It must contain letters and at least one digit"
      return false
    }
  }
}

// Validate Re-Password
function validateRePassword(inputPass, inputRePass) {
  const msgPswdr = document.getElementById('msg_pswdr')
  if(pswd.value === pswdr.value) {
    msgPswdr.innerHTML =''
    return true
  }
  else {
    msgPswdr.innerHTML = 'Password and Cofirmation Password do not match'
    return false
  }
}


const validate = (event) => {
  const displayInfo = document.getElementById('display_info')
  event.preventDefault();

  const validEmail = validateEmail(email)
  const validUname = validateUsername(uname)
  const validPswd = validatePassword(pswd)
  const validRePswd = validateRePassword(pswd,pswdr)

  if(validEmail === true && validUname === true && validPswd === true && validRePswd === true) {
    displayInfo.innerHTML = `
      Email: ${email.value} </br>
      Username: ${uname.value} </br>
      Password: ${pswd.value} </br>
      Cofirmation Password: ${pswdr.value}
    `
    displayInfo.style.color = 'green'
  }
  else {
    displayInfo.innerHTML = 'Invalid Data Entered'
    displayInfo.style.color = 'red'
  }
}

const reset = event => {
  location.reload()
}

document.querySelector('#SignUp').addEventListener('submit', validate)

document.querySelector('#SignUp').addEventListener('reset', reset)