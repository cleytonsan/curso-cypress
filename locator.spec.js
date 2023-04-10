/// <reference types="cypress"/>


// VISITANDO O SITE E ENCONTRANDO UM TEXTO
describe('Work with basic locator', () =>{
    //BEFORE ALL EXECULTARA TUDO QUE ESTÁ DENTRO DELE ANTES DE COMEÇAR OS TESTES
    before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
    })

    //BEFORE EACH EXECULTAR O TESTE, MAS ANTES DE COMEÇAR O OUTRO DARÁ REALOAD 
    beforeEach(() => {
        cy.reload()
    })

    it('Using jquery selector', () => {
        cy.get(':nth-child(2) > :nth-child(3) > [type="button"]')
        cy.get('table#tabelaUsuarios tbody > tr:eq(0) td:nth-child(3) > input')
        cy.get('[onclick*="Francisco"]')
        cy.get('table#tabelaUsuarios td:contains("Doutorado"):eq(0) ~ td:eq(3) > input')
        cy.get('table#tabelaUsuarios tr:contains("Doutorado"):eq(0) td:eq(6) input')
    })

    it('Using xpath', () => {
        cy.xpath('//input[contains(@onclick, "Francisco")]')
        cy.xpath('//table[@id="tabelaUsuarios"]//td[contains(., "Francisco")]/following-sibling::td/input')
        cy.xpath('//table[@id="tabelaUsuarios"]//td[contains(., "Francisco")]/..//input')
        cy.xpath('//table[@id="tabelaUsuarios"]//td[contains(., "Francisco")]/..//input[@type="text"]')
        cy.xpath('(//table[@id="tabelaUsuarios"]//td[contains(., "Doutorado")])[2]/..//input[@type="radio"]')
        cy.xpath('(//table[@id="tabelaUsuarios"]//td[contains(., "Doutorado")])[2]/..//input[@type="checkbox"]')
        cy.xpath('//*[@data-test="data2"]')

        cy.xpath('//td[contains(., "Usuario A")]/following-sibling::td[contains(., "Mestrado")]/..//input[@type="text"]').type('Funciona')

    })
    
})

