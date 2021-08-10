// let arr1 =  [];

// function foo(){
//     return [1, 2, 3]
// }
// for(i = 0; i<2; i++){
//     ;
//     arr1.push(...foo())
// }

// console.log(arr1)

let occupations = [
    {
        name: "A"
    },
    {
        name: "B"
    },
    {
        name: "C"
    },
    {
      
    }
]

let letters = occupations.reduce((letters, letterOb) =>{
    letterLabel = letterOb.name? letterOb.name + '; ' : ''
    return letters + letterLabel
}, '')

console.log(letters)