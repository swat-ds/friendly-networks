const trueCondition = true;
const falseCondition = false;
let arr = ["teacher"]
const obj = {
  ...(trueCondition && { student: 10 }),
  ...(arr.includes("p") && { teacher: 2 }),
};

console.log(obj)