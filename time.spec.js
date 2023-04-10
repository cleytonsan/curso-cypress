/// <reference types="cypress"/>

// VISITANDO O SITE E ENCONTRANDO UM TEXTO
describe('Work with alert', () =>{
    //BEFORE ALL EXECULTARA TUDO QUE ESTÁ DENTRO DELE ANTES DE COMEÇAR OS TESTES
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    it('Going back to the past', () => {
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '23/02/2023')

        // cy.clock()
        // cy.get('#buttonNow').click()
        // cy.get('#resultado > span').should('contain', '31/12/1969')

        const  dt = new Date(2012, 3, 10, 15, 23, 50)
        cy.clock(dt.getTime())
        cy.get('#buttonNow').click()
        cy.get('#resultado > span').should('contain', '10/04/2012')

    })

    it.only('Goes to the future', () => {
        cy.get('#buttonTimePassed').click()
        // cy.get('#resultado > span').should('contain', '15731')
        cy.get('#resultado > span').invoke('text').should('gt', 1334082230000)

        cy.clock()
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('lte', 0)
        // cy.wait(1000)
        // cy.get('#buttonTimePassed').click()
        // cy.get('#resultado > span').invoke('text').should('lte', 1000)

        cy.tick(5000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('gte', 5000)
        cy.tick(10000)
        cy.get('#buttonTimePassed').click()
        cy.get('#resultado > span').invoke('text').should('gte', 15000)

    })
})
