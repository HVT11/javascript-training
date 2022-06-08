//VARIABLES
const PI = 3.14 //No change value

let a = 0 //Can change value
a = 1

var b = 1

//TYPES
const typeNumber = 12 //Primitive Types

//Object types
const people = {
    name: 'John',
    age: 12
}

//EXPRESSIONS
2
0.02
'something'
true
this
undefined

//OPERATORS
// The assignment operator (=)
let x = 1

// The addition operator (+)
const three = 1 + 2
three + 1 //4
'three' + 1 //three1

// The subtraction operator (-)
const two = 4 - 2 // 2

// The division operator (/)
20 / 5 // 4
1 / 0 //Infinity

// The remainder operator (%)
20 % 5 //result === 0
1 % 0 //NaN

// The multiplication operator (*)
1 * 2 //2

// The exponentiation operator (**)
2 ** 8 //256

// PRECEDENCE
a = 1 * 2 + 5 / 2 % 2 //a = 2.5

//COMPARIONS
a = 2
a >= 1 //true

b = 2
a === b //true

// CONDITIONALS
if (true) {
    //do something
} else {
    //do something
}

//STRINGS
const flavo = 'Flavio'
flavo.length
'My name is ' + flavo //My name is flavo

const stringA = `Hey
this

string
is awesome!`

const stringTest = 'test'
const string1 = `something ${stringTest}`
const string2 = `something ${1 + 2 + 3}`

//ARRAYS
const arrayTest = [] //initialize an empty array
arrayTest.length //get the number of elements in the array

arrayTest.push(1) //add element at the end
arrayTest.push(3)
arrayTest.push(5)
arrayTest.push(7)
arrayTest.unshift(10) //add element at the beginning

arrayTest.pop() //remove an item from the end
arrayTest.shift() //remove an item from the beginning

const arrayTest1 = [1, 2]
const arrayTest2 = [3, 4]
const result1 = arrayTest1.concat(arrayTest2) //[1,2,3,4]
const result2 = [...arrayTest1, ...arrayTest2] //[1,2,3,4]

arrayTest.find(x => x === 5) //5
arrayTest.findIndex(x => x === 5) //2

arrayTest.includes(5,1) //true

//LOOP
const list = ['a', 'b', 'c']
let i = 0
//While loop
while (i < list.length) {
    console.log(list[i], i) //value index
    if(i === 1) continue
    i = i + 1
    if(i === 1) break
}

// Do.. while loop
do {
    console.log(list[i], i) //value index
    i = i + 1
} while (i < list.length)

//For
for (let i = 0; i < list.length; i++) {
    console.log(list[i], i) //value index
}

//For...of
for (const value of list) {
    console.log(value) //value
}

//FUNCTION
function saySomeThing(text) {
    // do something
    return text
}

let say = saySomeThing('Hi!')
console.log(say)

//ARROW FUNCTIONS
const getData = () => {
    //do something
}

//OBJECTS
const car = {
    color: 'blue'
}

//OBJECTS PROPERTIES
car.color = 'white' // update color properties
car.model = 'Mercedes' // add new model properties
delete car.model // delete model properties

//OBJECTS METHODS
car.start = function() {
    console.log('Start')
}
car.start()

//CLASSES
class Person {
    hello() {
        return 'Hello, I am person'
    }
}
const person1 = new Person()
person1.hello()

//INHERITANCE
class Programmer extends Person {
    hello() {
    return super.hello() +
        '. I am also a programmer.'
    }
}
const flavio = new Programmer()
console.log(flavio.hello())

//ASYNCHRONOUS PROGRAMMING AND CALLBACKS
function doSomething(callback){
    //do things
    const result = 'Success'
    callback(result)
}

doSomething(function notifyResult(result){
    console.log(result)
})

