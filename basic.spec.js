/// <reference types="cypress"/>


// VISITANDO UMA PAGINA E BUSCANDO UM TITULO
describe('cypress', () => {
    it.only('Should visit a page and assert title', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')

        /* const title = cy.title()
        console.log(title) */

        cy.title().should('be.equal', 'Campo de Treinamento')
        cy.title().should('contain', 'Campo')

        cy.title()
            .should('be.equal', 'Campo de Treinamento')
            .should('contain', 'Campo')

        let syncTitle

        //TODO imprimir o logo no console
        cy.title().then(title => {
            console.log(title)
        })

        cy.title().should(title => {
            console.log(title)
        })

        //TODO escrever o log em um campo de texto
        cy.title().then(title => {
            console.log(title)

            cy.get('#formNome').type(title)

            syncTitle = title
        })

        cy.get('[data-cy=dataSobrenome]').then($el => {
            $el.val(syncTitle)
        })

        cy.get('#elementosForm\\:sugestoes').then($el => {
            cy.wrap($el).type(syncTitle)
        })
    })

    // VISITANDO A PAGINA E INTERAGINDO COM UM ELEMENTO
    it('Should find and interact with an element', () =>{
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        
        cy.get('#buttonSimple')
            .click()
            .should('have.value', 'Obrigado!')
    })


})
