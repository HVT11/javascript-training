//Change the body style so it has a font-family of "Arial, sans-serif"
document.querySelector('body').style.fontFamily = 'Arial, sans-serif'

//Replace each of the spans (nickname, favorites, hometown) with your own information.
document.getElementById('nickname').textContent = 'Huynh Viet Tri'
document.getElementById('favorites').textContent = 'Dev'
document.getElementById('hometown').textContent = 'Quang Nam, Viet Nam'

//Iterate through each li and change the class to "listitem". Add a style tag that sets a rule for "listitem" to make the color red.
const li = document.querySelectorAll('li')
li.forEach(element => {
    element.className = 'listitem'
})

//Create a new img element and set its src attribute to a picture of you. Append that element to the page.
const img = document.createElement('img')
img.src = require('./images/avatar.jpg')

document.querySelector('body').appendChild(img)