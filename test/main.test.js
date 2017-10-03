const { readFileSync:read, writeFileSync: write } = require('fs')
const path = require('path')
const main = require('../src/main')
const expect = require('chai').expect

describe('main', function () {
  describe('#addItem', function () {
    beforeEach(function () {
      this.file = path.join(__dirname, 'cart.test.txt')
    })

    afterEach(function () {
      write(this.file, '', { flag: 'w' })
    })

    it('adds a single item to the cart', function () {
      const item = { name: 'Banana', quantity: 3 }
      main.addItem(this.file, item)

      const actual = read(this.file, 'utf-8')
      const expected = `1\tBanana\t3\n`
      expect(actual).to.equal(expected)
    })

    it('adds multiple items to the cart', function () {
      const items = [
        { name: 'Banana', quantity: 3 },
        { name: 'Apple', quantity: 1 }
      ]
      items.forEach(item => main.addItem(this.file, item))

      const actual = read(this.file, 'utf-8')
      const expected = `1\tBanana\t3\n2\tApple\t1\n`
      expect(actual).to.equal(expected)
    })

    it('will not add anything if it is not in the correct format', function () {
      const item = { name: 'Banana', quantity: 3 }
      main.addItem(this.file, item)

      const expected = `1\tBanana\t3\n`

      main.addItem(this.file, { name: 'Banana' })
      let actual = read(this.file, 'utf-8')
      expect(actual).to.equal(expected)

      main.addItem(this.file, { quantity: 3 })
      actual = read(this.file, 'utf-8')
      expect(actual).to.equal(expected)

      main.addItem(this.file, 'Banana')
      actual = read(this.file, 'utf-8')
      expect(actual).to.equal(expected)
    })
  })

  describe('#getItem', function () {
    beforeEach(function () {
      this.file = path.join(__dirname, 'cart.test.txt')
    })

    afterEach(function () {
      write(this.file, '', { flag: 'w' })
    })

    it('retrieves a single item based on the given number', function () {
      const items = [
        { name: 'Banana', quantity: 3 },
        { name: 'Apple', quantity: 1 }
      ]
      items.forEach(item => main.addItem(this.file, item))

      const actual = main.getItem(this.file, 2)
      const expected = { name: 'Apple', quantity: 1 }
      expect(actual).to.deep.equal(expected)
    })

    it('returns null if the item cannot be found by the given number', function () {
      const items = [
        { name: 'Banana', quantity: 3 },
        { name: 'Apple', quantity: 1 }
      ]
      items.forEach(item => main.addItem(this.file, item))

      const actual = main.getItem(this.file, 3)
      const expected = null
      expect(actual).to.equal(expected)
    })
  })

  describe('#updateItem', function () {
    beforeEach(function () {
      this.file = path.join(__dirname, 'cart.test.txt')
    })

    afterEach(function () {
      write(this.file, '', { flag: 'w' })
    })

    it('updates a single item with new information based on the given number', function () {
      const items = [
        { name: 'Banana', quantity: 3 },
        { name: 'Apple', quantity: 1 }
      ]
      items.forEach(item => main.addItem(this.file, item))
      main.updateItem(this.file, 2, { name: 'Mango', quantity: 4 })

      const actual = main.getItem(this.file, 2)
      const expected = { name: 'Mango', quantity: 4 }
      expect(actual).to.deep.equal(expected)
    })

    it('will not update anything if it is not in the correct format', function () {
      const item = { name: 'Banana', quantity: 3 }
      main.addItem(this.file, item)

      const expected = `1\tBanana\t3\n`

      main.updateItem(this.file, 1, { name: 'Banana' })
      let actual = read(this.file, 'utf-8')
      expect(actual).to.equal(expected)

      main.updateItem(this.file, 1, { quantity: 3 })
      actual = read(this.file, 'utf-8')
      expect(actual).to.equal(expected)

      main.updateItem(this.file, 1, 'Banana')
      actual = read(this.file, 'utf-8')
      expect(actual).to.equal(expected)
    })

    it('will not update anything if the item cannot be found by the given number', function () {
      const item = { name: 'Banana', quantity: 3 }
      main.addItem(this.file, item)

      const expected = `1\tBanana\t3\n`

      main.updateItem(this.file, 2, { name: 'Apple', quantity: 2 })
      let actual = read(this.file, 'utf-8')
      expect(actual).to.equal(expected)
    })
  })
})
