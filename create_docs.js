'use strict';

const {readFile, writeFile} = require('fs')

const files = [
  'lib/datastructures.js',
  'lib/other.js'
]

const read = (file) => new Promise((resolve, reject) =>
  readFile(file, 'utf8', (err, data) => err ? reject(err, data) : resolve(data))
)

const write = (file, str) => new Promise((resolve, reject) =>
  writeFile(file, str, (err) => err ? reject(err) : resolve())
)


const get_code_comments = file => read(file)
  //.then(str => str.match(/\/\*\n(\w*:\s?((.*\n*)|(```\n(.*\n)*```))){1,3}\n\*\//g))
  //.then(str => str.match(/\/\*\n(?:\w*:\s?(?:(?:.*\n*)|(?:```\n(?:\s*.*\n)*```))){1,3}\n\*\//g))
  .then(str => str.match(/\/\*\n(?:\w*:\s?(?:(?:.*\n*)|(?:```\n(?:(?!```).*\n)*```))){1,3}\n\*\//g))
  .then(x => x.map(y => y.split('\n')))
  .then(x => x.map(x => x.slice(1, x.length-1)))
  .then(x => x.map(transform))
  .then(x => x.map(create_md))
  .then(x => x.join('\n'))
  .catch(err => console.log('something went wrong', err))

/*
input: [
  'name: abc',
  'description: blub',
  'usage: ```',
  'is_primitive(1) // -> true',
  '```'
]

wanted output: [
  ['name', 'abc'],
  ['description', 'blub'],
  ['usage', '```\nis_primitive(1) // -> true\n```']
]

or: {
  name: 'abc'
  description: 'blub'
  usage: '```\nis_primitive(1) // -> true\n```'
}
*/

const transform = str_arr => {
  const obj = {}
  let is_multiline = false
  let curr_key = null
  str_arr.forEach(str => {

    if(is_multiline && !str.includes('```')) obj[curr_key] += str + '\n'

    const _line = str.split(':')
    const line = [_line[0], _line.slice(1).join(':')]

    if(str.endsWith('```') && !str.startsWith('```')) {
      is_multiline = true
      curr_key = line[0]
      obj[curr_key] = ''
    } else if(!is_multiline && !str.startsWith('```')) {
      obj[line[0]] = line[1].trim()
    }

    if(str.startsWith('```')) {
      is_multiline = false
      curr_key = null
    }
  })
  return obj
}

const create_md = obj =>
  '### ' + obj.name + '\n' + obj.description + (obj.usage ? ('\n```js\n' + obj.usage.trim() + '\n```\n') : '\n')


Promise.all(files.map(file => get_code_comments(file)))
  .then(arr_md => arr_md.map((md, i) => `## ${files[i]}\n\n${md}`))
  .then(arr_md => arr_md.join('\n\n').trim())
  .then(console.log)
