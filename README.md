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
object_update({ a: 1, b: 3}, 0, 'c', 2) // -> {c: 2, b: 3}
```

### object_delete, object.delete
delete the key-value pair at the given index `i` from the object `obj` (the original object is not being modified)
```js
object_delete({a: 1, b: 2}, 1) // -> {a: 1}
```

### object_insert, object.insert
insert a key-value pair at the given index `i` into the object `obj` (the original object is not being modified)
```js
object_insert({a: 1}, 1, 'b', 2)
```

### arraysToObject

```js
arraysToObject(['a', 'b'], [1, 2]) // -> {a: 1, b: 2}
```

### compare

```js
compare({a: 1}, {a: 1}) // true
```

### destructure
array contains keys, those keys are what is to be extracted from the object (including the values)
```js
destructure({a: 1, b: 2, c: 3}, ['a', 'b']) // -> {a: 1, b: 2}
```


## lib/other.js

### isNode
checks if the current execution environment is node.js or not
```js
isNode() ? use_database : use_localStorage
```

### range
create an array with incrementing values with a given length (zero based)
```js
range(5) // -> [0, 1, 2, 3, 4]
```

### clean
clean array or object of anything that is not permitted in JSON (like functions or circular datastructures)

### proxy
log a value to the console and return this value
```js
fetchJSON(`/data.json`)
  .then(proxy)
  .then(useJsonData)
```

### Alphabet
array containing all letters of the alphabet in upper case

### alphabet
array containing all letters of the alphabet in lower case

### replace_all
takes an input string and 2 arrays of strings. All occurrences of strings from the first array are replaced with the strings from the second array at the same index as the string from the first array
```js
replace_all('abcdefg', ['a', 'b', 'c'], ['A', 'B', 'C']) // -> 'ABCdefg'
```

### is_primitive
checks if a given value `x` is a primitive datatype or not
```js
is_primitive(1) // -> true
is_primitive("1") // -> true
is_primitive(new Number(1)) // -> false
```


## lib/dates.js

### setTime
creates a new js date object from the given js `date` object and sets the time to the specified values (which are all 0 by default)
```js
setTime(new Date(), 1, 2, 3) // -> some_date
```

### setTimeIgnoreTimezone
just like the setTime function, but ignores the current timezone offset by subtracting it from the minutes (js dates handle negative values kind of well)
```js
setTimeIgnoreTimezone(new Date(), 1, 2, 3) // -> some_date
```

### compareWithoutTime
compares two js date objects ignoring the time (by setting the time of both objects to 0 and comparing their value then)
```js
compareWithoutTime(new Date(), new Date()) // -> true
```

### humanize
the input `time` is a given date, the output is the difference between now and the given date in a human readable form (like '3 hours ago' or '1 year from now'). This is similar to the `fromNow()` function from moment.js. `n` is an optional parameter (which is 0 by default) which controls the number of digits after the comma / dot / whatever.
```js
humanize(new Date()) // -> 'just now'
humanize(Date.parse('04 Dec 1995 00:12:00 GMT')) // -> '22 years ago'
humanize(Date.parse('04 Dec 1995 00:12:00 GMT'), 3) // -> '22.403 years ago'
```


## lib/markdown.js

### remove_markdown
removes markdown artifacts from given string (`md`)
```js
remove_markdown('**foobar** *foo* ***bar***') // -> 'foobar foo bar'
```
