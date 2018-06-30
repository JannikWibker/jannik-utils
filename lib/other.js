/*
name: isNode
description: checks if the current execution environment is node.js or not
usage: isNode() ? use_database : use_localStorage
*/
const isNode = Object.prototype.toString.call(typeof process !== 'undefined' ? process : 0) === '[object process]'

/*
name: round
rounds the given number to the given amount of decimal places after the comma / dot (whatever the seperator is in your language; in english it's the dot, in german it's the comma)
usage: round(Math.PI, 3) // -> 3.142
*/
const round = (number, decimals) => Number(Math.round(number + 'e' + decimals) + 'e-' + decimals)

/*
name: range
description: create an array with incrementing values with a given length (zero based)
usage: range(5) // -> [0, 1, 2, 3, 4]
*/
const range = (l) => [...Array(l)].map((x,i) => i)

/*
name: clean
description: clean array or object of anything that is not permitted in JSON (like functions or circular datastructures)
usage: clean({a: 1, b: '2', c: () => 3}) // -> {a: 1, b: '2'}
*/
const clean = x => JSON.parse(JSON.stringify(x))

/*
name: last
description: returns the last element of any given array
usage: last(['A', 'B', 'C']) // -> 'C'
*/
const last = arr => arr[arr.length-1]

/*
name: proxy
description: log a value to the console and return this value
usage: ```
fetchJSON(`/data.json`)
  .then(proxy)
  .then(useJsonData)
```
*/
const proxy = x => {
  console.log('proxy: ', x)
  return x
}

/*
name: Alphabet
description: array containing all letters of the alphabet in upper case
*/
const Alphabet = 'ABCDEFGHIJKLNMOPQRSTUVWXYZ'.split('')

/*
name: alphabet
description: array containing all letters of the alphabet in lower case
*/
const alphabet = 'abcdefghijklnmopqrstuvwxyz'.split('')

/*
name: replace_all
description: takes an input string and 2 arrays of strings. All occurrences of strings from the first array are replaced with the strings from the second array at the same index as the string from the first array
usage: replace_all('abcdefg', ['a', 'b', 'c'], ['A', 'B', 'C']) // -> 'ABCdefg'
*/
const replace_all = (input, find, replace) => {
  find.forEach((item, i) => {
    input = input.replace(new RegExp(item, 'g'), replace[i])
  })
  return input
}

/*
name: is_primitive
description: checks if a given value `x` is a primitive datatype or not
usage: ```
is_primitive(1) // -> true
is_primitive("1") // -> true
is_primitive(new Number(1)) // -> false
```
*/
const is_primitive = x => x !== Object(x)

module.exports = {
  isNode,
  round,
  range,
  clean,
  last,
  proxy,
  Alphabet,
  alphabet,
  replace_all,
  is_primitive,
}
