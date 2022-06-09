const demoID = document.querySelector('#demo-id') // same document.getElementById('demo-id')
demoID.textContent = 'Demo ID text updated'

// Modifying Attributes
const img = document.querySelector('img')
img.hasAttribute('src')        // returns true
img.getAttribute('src')        // returns "...shark.png"
img.removeAttribute('src')     // remove the src attribute and value

img.setAttribute('src', 'https://js-tutorials.nyc3.digitaloceanspaces.com/octopus.png')

//Modifying Classes
const firstDiv = document.querySelector('#div1')
firstDiv.className = 'warning'

const activeDiv = document.querySelector('.active')
activeDiv.classList.add('hidden')                // Add the hidden class
activeDiv.classList.contains('hidden')           // Check if hidden class exists
activeDiv.classList.remove('hidden')             // Remove the hidden class
activeDiv.classList.toggle('hidden')             // Switch between hidden true and false
activeDiv.classList.replace('active', 'warning') // Replace active class with warning class

//Modifying Styles
const shape = document.querySelector('#shape')
shape.style.borderRadius = '50%';
shape.style.display = 'flex';
shape.style.justifyContent = 'center';
shape.style.alignItems = 'center';