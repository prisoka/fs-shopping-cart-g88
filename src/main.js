const fs = require('fs')

const addItem = (path, item) => {
  if (!item.name || !item.quantity) return

  const current = fs.readFileSync(path, 'utf-8').match(/\n/g)
  const count = current ? current.length + 1 : 1

  const text = `${count}\t${item.name}\t${item.quantity}\n`
  fs.writeFileSync(path, text, { flag: 'a' })
}

const getItem = (path, idx) => {
  const current = fs.readFileSync(path, 'utf-8').split('\n')
  const item = current[idx - 1]
  if (!item) return null

  const properties = item.split('\t')
  return {
    name: properties[1],
    quantity: parseInt(properties[2])
  }
}

// OUTPUT : updateItem(filePath, 1, { name: 'Beet', quantity: 8 })
const updateItem = (path, idx, item) => {
  // if the item doesn't exist, stop.
  if (!item.name || !item.quantity) return
  if (!getItem(path,idx)) return

  // get the single item assigning getItem to current variable:
  const current = fs.readFileSync(path, 'utf-8').split('\n')
  // Assing output to text variable:
  const text = `${idx}\t${item.name}\t${item.quantity}\n`
  current[idx-1] = text
  // update file: join current using fs.writeFile() method, which replaces the specified file and content:
  fs.writeFileSync(path, current.join('\n'))
}

module.exports = {
  addItem,
  getItem,
  updateItem
}
