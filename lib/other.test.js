const other = require('./other.js')
const compare = require('./datastructures.js').compare
const is_primitive = require('./other.js').is_primitive

const test = (name, a, b=true) => console.log(name + ' ' + (
  (is_primitive(a) && is_primitive(b) ? a === b : compare(a, b)) ? 'passed' : `failed ( ${a} !== ${b})`
))

test('other.isNode', other.isNode)
test('other.round', other.round(Math.PI, 3), 3.142)
test('other.range', other.range(5), [0, 1, 2, 3, 4])
test('other.clean', other.clean({a: () => {}, b: 2}), {b: 2})
test('other.proxy', other.proxy({a: 1}), {a: 1})
test('other.replace_all', other.replace_all('abcdefg', ['a', 'b', 'c'], ['A', 'B', 'C']), 'ABCdefg')
test('other.is_primitive 1', other.is_primitive(1), true)
test('other.is_primitive "1"', other.is_primitive('1'), true)
test('other.is_primitive new Number(1)', other.is_primitive(new Number(1)), false)
