const {readFile, writeFile} = require('fs')

const files = [
  './lib/datastructures.js',
  './lib/other.js'
]

const read = (file) => new Promise((resolve, reject) =>
  readFile(file, 'utf8', (err, data) => err ? reject(err, data) : resolve(data))
)

const write = (file, str) => new Promise((resolve, reject) =>
  writeFile(file, str, (err) => err ? reject(err) : resolve())
)

const get_code_comments = file => read(file)
  .then(str => str.match(/\/\*\n(\w*:\s?.*\n?){1,3}\n\*\//g))
  .then(x => x.map(x => x.split('\n')))
  .then(x => x.map(x => x.slice(1, x.length-1)))
  .then(x => x.map(transform))
  .then(x => x.map(create_md))
  .then(x => x.join('\n'))
  .catch(err => console.log('something went wrong', err))

const transform = str_arr => {
  const obj = {}
  str_arr
    .map(str => {
      const line = str.split(':').map(x => x.trim())
      return [line[0], line.slice(1).join(':')]
    })
    .forEach(line => obj[line[0]] = line[1])

  return obj
}

const create_md = obj =>
'### ' + obj.name + '\n' + obj.description + (obj.usage ? ('\n```js\n' + obj.usage + '\n```\n') : '\n')

Promise.all(files.map(file => get_code_comments(file)))
  .then(arr_md => arr_md.map((md, i) => `## ${files[i]}\n\n${md}`))
  .then(arr_md => arr_md.join('\n\n').trim())
  .then(console.log)
