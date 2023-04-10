it('sem teste ainda', () => {})

/* 1º EXEMPLO */
/* const getSomething = () => 10;

const system = () => {
    console.log('init');
    const something = getSomething();
    console.log(`something is ${something}`)
    console.log('end')
}
system(); */

/* 2º EXEMPLO */
/* const getSomething = () => {
    setTimeout(() =>{
        console.log('Respondendo agora ...')
        return 11;
    }, 1000)
};

const system = () => {
    console.log('init');
    const something = getSomething();
    console.log(`something is ${something}`)
    console.log('end')
}
system();
 */

/* 3º EXEMPLO */
/* const getSomething = Callback => {
    setTimeout(() =>{
        Callback(12);
    }, 1000)
};

const system = () => {
    console.log('init');
    getSomething(some => console.log(`Something is ${some}`));
    console.log('end')   
}
system();
 */


/* 4º EXEMPLO */
/* const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(13);
        }, 1000)
    })
}

const system = () => {
    console.log('init');
    const prom =  getSomething();
    prom.then(some =>{
        console.log(`something is ${some}`)
    })
    console.log('end')
}
system(); */

/* 5º EXEMPLO */
const getSomething = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(13);
        }, 1000)
    })
}

const system = async () => {
    console.log('init');
    const some = await  getSomething();
    console.log(`Something is ${some}`)
    console.log('end')
}
system();

