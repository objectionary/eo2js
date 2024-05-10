const path = require('path');
const fs = require('fs');

const dest = path.resolve('src/objects/org/eolang')
const atoms = [
  'as_phi',
  'bytes$concat',
  'bytes$eq',
  'bytes$not',
  'bytes$or',
  'bytes$right',
  'bytes$size',
  'bytes$slice',
  'bytes$xor',
  'seq',
  'string$length',
  'string$slice'
]


// if (fs.existsSync(dest)) {
//   fs.rmSync(dest, {recursive: true, force: true})
// }
// fs.mkdirSync(dest, {recursive: true})
const text = fs.readFileSync(path.resolve('atom.js')).toString()
atoms.forEach((atom) => {
  let rep = atom.replaceAll('$', '.')
  rep = rep.charAt(0).toUpperCase() + rep.slice(1)
  const tx = text
    .replaceAll('atom', atom)
    .replaceAll('ATOM', rep)
  fs.writeFileSync(path.resolve(dest, `${atom}.js`), tx)
})
