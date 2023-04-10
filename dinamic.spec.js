/// <reference types="cypress"/>



// VISITANDO O SITE E ENCONTRANDO UM TEXTO
describe('Dinamic test', () => {
    //BEFORE ALL EXECULTARA TUDO QUE ESTÁ DENTRO DELE ANTES DE COMEÇAR OS TESTES
    beforeEach(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    const foods = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
    foods.forEach(food => {
        it(`Cadastro com comida Variada ${food}`, () => {
            cy.get('#formNome').type('Cleyton')
                cy.get('#formSobrenome').type('Santos')
                cy.get(`[name=formSexo][value=M]`).click()
                cy.xpath(`//label[contains(., "${food}")]/preceding-sibling::input`).click()
                cy.get('#formEscolaridade').select('Doutorado')
                cy.get('#formEsportes').select('Futebol')
                cy.get('#formCadastrar').click()
                cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado')
        })
    })

    it.only('Deve selecionar todos usando o each', () => {
        cy.get('#formNome').type('Cleyton')
            cy.get('#formSobrenome').type('Santos')
            cy.get(`[name=formSexo][value=M]`).click()

            cy.get('[name=formComidaFavorita]').each($el => {
                if($el.val() != 'vegetariano')
                    cy.wrap($el).click()
            })

            cy.get('#formEscolaridade').select('Doutorado')
            cy.get('#formEsportes').select('Futebol')
            cy.get('#formCadastrar').click()
            cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')

    })
  
})