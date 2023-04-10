/// <reference types="cypress"/>

// VISITANDO O SITE E ENCONTRANDO UM TEXTO
describe('Work with basic elements', () =>{
    //BEFORE ALL EXECULTARA TUDO QUE ESTÁ DENTRO DELE ANTES DE COMEÇAR OS TESTES
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    //BEFORE EACH EXECULTAR O TESTE, MAS ANTES DE COMEÇAR O OUTRO DARÁ REALOAD 
    beforeEach(() => {
        cy.reload()
    })

    //VISITANDO O SITE CLICAR NO BOTÃO E ESPERAR O ELEMENTE ESTÁ DISPONIVEL
    it('Deve aguardar o elemento estar disponivel', () => {
        cy.get('#novoCampo').should('not.exist')
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo').should('not.exist')
        cy.get('#novoCampo').should('exist')
        cy.get('#novoCampo').type('funciona')

    })

    //VISITANDO O SITE CLICAR NO BOTÃO E FAZER TENTATIVAS ATÉ O ELEMENTE ESTÁ DISPONIVEL
    it('Deve aguardar o elemento estar disponivel', () => {
        cy.get('#buttonDelay').click()
        cy.get('#novoCampo')
            .should('exist')
            .type('funciona')

    })

    //VISITANDO O SITE CLICAR NO BOTAO LISTA E ENCONTRANDO O ITEM
    it('Uso do Find', () => {
        cy.get('#buttonListDOM').click()
        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1')
            
        /* cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 2') */
        
        cy.get('#lista li span')
            .should('contain', 'Item 2')
        
    })

    //VISITANDO O SITE E UTILIZANDO O TIMEOUT
    it('Uso do timeout ', () => {
        /* cy.get('#buttonDelay').click()
        cy.get('#novoCampo', {timeout: 1000}).should('exist') */

      /*   cy.get('#buttonListDOM').click()
        cy.wait(1000)
        cy.get('#lista li span', {timeout: 3000})
            .should('contain', 'Item 2') */

        cy.get('#buttonListDOM').click()
        cy.get('#lista li span')
            .should('have.length', 1)
        cy.get('#lista li span')
            .should('have.length', 2)
            
    })

    //VISITANDO O SITE E VERIFICANDO QUE NEM TODO ELEMENTO TEM RETRY
    it('click retry', () => {
        cy.get('#buttonCount').click()
            .should('have.value', '11')
    })

    it.only('Should vs Then', () => {
        cy.get('#buttonListDOM').then($el => {
            /* .should('gave.length', 1) */
            /* console.log($el)*/
            expect($el).to.have.length(1)
            cy.get('#buttonList')
        })
    })

})