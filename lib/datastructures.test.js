const ds = require('./datastructures.js')
const compare = require('./datastructures.js').compare
const is_primitive = require('./other.js').is_primitive

const test = (name, a, b) => console.log(name + ' ' + (
  (is_primitive(a) && is_primitive(b) ? a === b : compare(a, b)) ? 'passed' : `failed ( ${a} !== ${b})`
))

test('ds.array.last', ds.array.last([1, 2, 3]), 3)

test('ds.array.flatten', ds.array.flatten([1, 2, [3, 4]]), [1, 2, 3, 4])
test('ds.array.flatten_deep', ds.array.flatten_deep([1, 2, [3, 4]]), [1, 2, 3, 4])

test('ds.array.update', ds.array.update([1, 2, 4, 4], 2, 3), [1, 2, 3, 4])
test('ds.array.delete', ds.array.delete([1, 2, 4, 3], 2), [1, 2, 3])
test('ds.array.insert', ds.array.insert([1, 2, 4], 2, 3), [1, 2, 3, 4])

test('ds.object.update', ds.object.update({ a: 1, b: 3}, 0, 'c', 2), {c: 2, b: 3})
test('ds.object.delete', ds.object.delete({a: 1, b: 2}, 1), {a: 1})
test('ds.object.insert', ds.object.insert({a: 1}, 1, 'b', 2), {a: 1, b: 2})

test('ds.object.filter', ds.object.filter({a: 1, b: 2, c: 4}, (key, value) => key !== 'c' || value !== 4), {a: 1, b: 2})

test('ds.arraysToObject', ds.arraysToObject(['a', 'b'], [1, 2]), {a: 1, b: 2})
test('ds.destructure', ds.destructure({a: 1, b: 2, c: 3}, ['a', 'b']), {a: 1, b: 2})
