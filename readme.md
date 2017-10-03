# File System Shopping Cart

This project will require you to be able to read and write to a text file through the `fs` module.

## Instructions

Two functions are already written for you in the `src/main.js` file:

- `addItem` will add an item to the "cart" by transforming an object into a single line on the text file separated by tabs and ending with a `\n` character.
- `getItem` will retrieve a single item from the list based on the number it's given when added to the cart. It transforms this from text into an object.

Your job is to write the `updateItem` function which will replace an item at a certain position with a new item given to it.

For example:

```js
const filePath = '/path/to/a/file'
addItem(filePath, { name: 'Carrot', quantity: 4 })
addItem(filePath, { name: 'Onion', quantity: 6 })
```

Will add the following to the `.txt` file:

```
1 Carrot  4
2 Onion  6
```

Using `getItem` will work like the following:

```js
const item = getItem(filePath, 1)
// item => { name: 'Carrot', quantity: 4 }
```

When you use `updateItem`, it will look like this:

```js
updateItem(filePath, 1, { name: 'Beet', quantity: 8 })
```

And will change the file like so:

```
1 Beet  8
2 Onion  6
```

## Tip

The code to update the file is a combination of `addItem` and `getItem`. It would be worthwhile to look through and understand how that code is working before moving on to `updateItem`.

## Setup

1. Fork and clone this repository
1. Run `npm install` or `yarn`
1. Run the tests with `npm test`
