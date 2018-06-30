/*
name: array_last, array.last
description: last item in array
usage: last([1, 2, 3]) // -> 3
*/
const array_last = x => x[x.length-1]

/*
name: array_flatten, array.flatten
description: flatten the given array
usage: array_flatten([1, 2, [3, 4]]) // -> [1, 2, 3, 4]
*/
const array_flatten = (arr) => [].concat(...arr)

/*
name: array_flatten_deep, array.flatten_deep
description: flatten the given array recursively
usage: array_flatten_deep([1, [2, [3, [4]]]]) // -> [1, 2, 3, 4]
*/
const array_flatten_deep = (arr) => array_flatten(arr.map(x => Array.isArray(x) ? array_flatten_deep(x) : x))

/*
name: array_update, array.update
description: return a copy of the array `arr` with the item at the given index `i` changed to `value`
usage: array_update([1, 2, 4, 4], 2, 3) // -> [1, 2, 3, 4]
*/
const array_update = (arr, i, value) => [...arr.slice(0, i), value, ...arr.slice(i+1)]

/*
name: array_delete, array.delete
description: return a copy of the array `arr` with the item at the given index `i` removed
usage: array_delete([1, 2, 4, 3], 2) // -> [1, 2, 3]
*/
const array_delete = (arr, i) => [...arr.slice(0, i), ...arr.slice(i+1)]

/*
name: array_insert, array.insert
description: insert the `value` item at the given index `i` into the array `arr`
usage: array_insert([1, 2, 4], 2, 3) // -> [1, 2, 3, 4]
*/
const array_insert = (arr, i, value) => [...arr.slice(0, i), value, ...arr.slice(i)]

/*
name: object_update, object.update
description: set the n-th key (given by `i`) to `key` and change the associated item to `value` in the given object `obj` (the original object is not being modified)
usage: object_update({ a: 1, b: 3}, 0, 'c', 2) // -> {c: 2, b: 3}
*/
const object_update = (obj, i, key, value) => arraysToObject(
  array_update(Object.keys(obj), i, key),
  array_update(Object.values(obj), i, value)
)

/*
name: object_delete, object.delete
description: delete the key-value pair at the given index `i` from the object `obj` (the original object is not being modified)
usage: object_delete({a: 1, b: 2}, 1) // -> {a: 1}
*/
const object_delete = (obj, i) => arraysToObject(
  array_delete(Object.keys(obj), i),
  array_delete(Object.values(obj), i)
)

/*
name: object_insert, object.insert
description: insert a key-value pair at the given index `i` into the object `obj` (the original object is not being modified)
usage: object_insert({a: 1}, 1, 'b', 2)
*/
const object_insert = (obj, i, key, value) => arraysToObject(
  array_insert(Object.keys(obj), i, key),
  array_insert(Object.values(obj), i, value)
)

// const _object_filter = (obj, fn) => keys => arraysToObject(keys.filter(x => x), keys.map(key => key ? obj[key] : null).filter(x => x))

// const object_filter = (obj, fn) => _object_filter(Object.keys(obj).map((key, i) => fn(key, obj[key], i) ? key : null))

/*
name: arraysToObject
description:
usage: arraysToObject(['a', 'b'], [1, 2]) // -> {a: 1, b: 2}
*/
const arraysToObject = (arr_key, arr_value) =>
  Object.assign({}, ...arr_value.map((item, i) => ({[arr_key[i]]: item})))

/*
name: compare
description:
usage: compare({a: 1}, {a: 1}) // true
*/
const compare = (old_obj, new_obj) =>
  (convert =>
    ((old_arr, new_arr) =>
      Array.isArray(old_obj) === Array.isArray(new_obj)
        ? old_arr.length === new_arr.length
          ? Array.isArray(old_obj) || compare(Object.keys(old_obj), Object.keys(new_obj))
            ? old_arr.map((x, i) => Object(x) === x
              ? compare(x, new_arr[i])
              : x === new_arr[i]
            ).filter(x => !x).length === 0
            : false
          : false
        : false
    )(convert(old_obj), convert(new_obj))
  )(x => Array.isArray(x) ? x : Object.values(x))

/*
name: destructure
description: array contains keys, those keys are what is to be extracted from the object (including the values)
usage: destructure({a: 1, b: 2, c: 3}, ['a', 'b']) // -> {a: 1, b: 2}
*/
const destructure = (obj, template) => {
  let _obj = {}
  if(Array.isArray(template)) {
    template.forEach(key => _obj[key] = obj[key])
  } else {
    Object.keys(template).forEach(key => _obj[template[key]] = obj[key])
  }
  return _obj
}

const array = {
  last: array_last,
  flatten: array_flatten,
  flatten_deep: array_flatten_deep,
  update: array_update,
  delete: array_delete,
  insert: array_insert
}

const object = {
  update: object_update,
  delete: object_delete,
  insert: object_insert,
  _filter: _object_filter,
  filter: object_filter
}

module.exports = {
  array,
  array_last,
  array_flatten,
  array_flatten_deep,
  array_update,
  array_delete,
  array_insert,

  object,
  object_update,
  object_delete,
  object_insert,
//  _object_filter,
//  object_filter,

  arraysToObject,
  compare,
  destructure,
}
