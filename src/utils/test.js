const Fuse  = require("fuse.js");

// const trueCondition = true;
// const falseCondition = false;
// let arr = ["teacher"];
// const obj = {
//   ...(trueCondition && { student: 10 }),
//   ...(arr.includes("p") && { teacher: 2 }),
// };

// console.log(obj);

// // Create Objects Array

// var arrayCarObjects = [
//   { brand: "Honda", topSpeed: 45 },
//   { brand: "Ford", topSpeed: 6 },
//   { brand: "Toyota", topSpeed: 240 },
//   { brand: "Chevrolet", topSpeed: 120 },
//   { brand: "Ferrari", topSpeed: 1000 },
// ];

// arrayCarObjects.sort((a, b) => (a.brand > b.brand ? 1 : -1));

// console.log(arrayCarObjects);


// 1. List of items to search in
const books = [
  {
    title: "Old Man's War",
    author: {
      firstName: 'John',
      lastName: 'Scalzi'
    }
  },
  {
    title: 'The Lock Artist',
    author: {
      firstName: 'Steve',
      lastName: 'Hamilton'
    }
  }
]

// 2. Set up the Fuse instance
const fuse = new Fuse(books, {
  keys: ['title', 'author.firstName', 'author.lastName']
})

// 3. Now search!
console.log(fuse.search('ham'))