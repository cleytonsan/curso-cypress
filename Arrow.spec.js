it('nada agora', function () {
    cy.get('path')
})

/*function soma(a , b){
   return a + b;
}*/

/* const soma = function (a, b) {
    return a + b
} */

/* const soma = (a, b) => {
    return a + b
} */

/* const soma = (a, b) => a + b */

/* const soma = (a) => a + a */

/* const soma = a => a + a */

const soma = () =>  5 + 6
 
console.log(soma(1,4))

it('a function teste...', function () {
    console.log('function', this)
})

it('an arrow test ...', () => {
    console.log('arrow', this)
})


console.log(soma(1,4))