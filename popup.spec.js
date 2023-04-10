/// <reference types="cypress"/>


describe('Work with popup', () =>{ 
   it('Deve testar o popup diretamente', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')
        cy.get('#otherButton').click()
        cy.on('window:alert', msg => {
            expect(msg).to.be.equal('Click OK!')
        })
    })

    it('Deve verificar se o popup foi invocado', () => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
        cy.window().then(win => {
            cy.stub(win, 'open').as('winOpen')
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should('be.called')
    })

    describe('With Links....', () => {
        beforeEach(() => {
            cy.visit('https://wcaquino.me/cypress/componentes.html')
        })

        it('check popUp url', () => {
            cy.contains('Popup2')
                .should('have.prop', 'href')
                .and('equal', 'https://wcaquino.me/cypress/frame.html')
        })

        //ESSA ESTRATEGIA É MUITO UTIL QUANDO O LINK NÃO É FIXO OU QUANDO EU NÃO SEI QUAL É O LINK NO MOMENTO
        it('Should access popup dinacally', () => {
            cy.contains('Popup2').then($a => {
                const href = $a.prop('href')
                cy.visit(href)
                cy.get('#tfield').type('funciona')
            })
        })

        it('Should force link on same page',() => {
            cy.contains('Popup2')
                .invoke('removeAttr', 'target').click()
            cy.get('#tfield').type('funciona')
        })
    })
 
})