## lib/datastructures.js

### array_last, array.last
last item in array
```js
last([1, 2, 3]) // -> 3
```

### array_flatten, array.flatten
flatten the given array
```js
array_flatten([1, 2, [3, 4]]) // -> [1, 2, 3, 4]
```

### array_flatten_deep, array.flatten_deep
flatten the given array recursively
```js
array_flatten_deep([1, [2, [3, [4]]]]) // -> [1, 2, 3, 4]
```

### array_update, array.update
return a copy of the array `arr` with the item at the given index `i` changed to `value`
```js
array_update([1, 2, 4, 4], 2, 3) // -> [1, 2, 3, 4]
```

### array_delete, array.delete
return a copy of the array `arr` with the item at the given index `i` removed
```js
array_delete([1, 2, 4, 3], 2) // -> [1, 2, 3]
```

### array_insert, array.insert
insert the `value` item at the given index `i` into the array `arr`
```js
array_insert([1, 2, 4], 2, 3) // -> [1, 2, 3, 4]
```

### object_update, object.update
set the n-th key (given by `i`) to `key` and change the associated item to `value` in the given object `obj` (the original object is not being modified)
```js
object_update({ a:1, b:3}, 0, 'c', 2) // -> {c:2, b:3}
```

### object_delete, object.delete
delete the key-value pair at the given index `i` from the object `obj` (the original object is not being modified)
```js
object_delete({a:1, b:2}, 1) // -> {a:1}
```

### object_insert, object.insert
insert a key-value pair at the given index `i` into the object `obj` (the original object is not being modified)
```js
object_insert({a:1}, 1, 'b', 2)
```

### arraysToObject

```js
arraysToObject(['a', 'b'], [1, 2]) // -> {a:1, b:2}
```

### compare

```js
compare({a:1}, {a:1}) // true
```

### destructure
array contains keys, those keys are what is to be extracted from the object (including the values)
```js
destructure({a:1, b:2, c:3}, ['a', 'b']) // -> {a:1, b:2}
```


## lib/other.js

### isNode
checks if the current execution environment is node.js or not
```js
isNode() ? use_database:use_localStorage
```

### range
create an array with incrementing values with a given length (zero based)
```js
range(5) // -> [0, 1, 2, 3, 4]
```

### clean
clean array or object of anything that is not permitted in JSON (like functions or circular datastructures)

### Alphabet
Array containing all letters of the alphabet in upper case

### alphabet
Array containing all letters of the alphabet in lower case

### replace_all
takes an input string and 2 arrays of strings. All occurrences of strings from the first array are replaced with the strings from the second array at the same index as the string from the first array
```js
replace_all('abcdefg', ['a', 'b', 'c'], ['A', 'B', 'C']) // -> 'ABCdefg'
```
