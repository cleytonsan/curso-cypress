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

    //VISITANDO O SITE E RECONHECENDO TEXTOS NA TELA
    it('Text', () => {
        cy.get('body').should('contain', 'Cuidado')
       //cy.get('body').should('have.text', 'Cuidado')
        cy.get('span').should('contain', 'Cuidado')
        //cy.get('div').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('contain', 'Cuidado')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...')
    })

    // VISITANDO O SITE E ENCONTRANDO LINKS
    it('link', () => {
        cy.get('[href="#"]').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
        
        cy.reload()
        cy.get('#resultado').should('have.not.text', 'Voltou!')
        cy.contains('Voltar').click()
        cy.get('#resultado').should('have.text', 'Voltou!')
    })

    //VISITANDO O SITE E ESCREVENDO NOS CAMPOS DE TEXTO
    it('TextFilds', () => {
        cy.get('#formNome').type('Cleyton')
        cy.get('#formNome').should('have.value', 'Cleyton')

        cy.get('#elementosForm\\:sugestoes')
            .type('Bem vindo!')
            .should('have.value', 'Bem vindo!')

        cy.get('#tabelaUsuarios > :nth-child(2) > :nth-child(1) > :nth-child(6) > input')
            .type('???')

        //ESCREVENDO E APAGANDO AS DUAS ULTIMAS LETRAS DE ACORDO O BACKSPACE COLOCADO
        cy.get('[data-cy=dataSobrenome]')
            .type('Santosss{backspace}{backspace}')
            .should('have.value', 'Santos')
        
        // APAGANDO E ESCREVENDO OUTRO TEXTO
        cy.get('#elementosForm\\:sugestoes')
            .clear()
            .type('Erro{selectall}acerto', {delay:100})
            .should('have.value', 'acerto')
    })

    //ACESSANDO O SITE E SELECIONANDO O RADIO BUTTON
    it('RadioButton', () =>{
        cy.get('#formSexoFem')
            .click()
            .should('be.checked')
        
        cy.get('#formSexoMasc').should('be.not.checked')

        cy.get("[name='formSexo']").should('have.length', 2)
        cy.get("[name=formSexo]").should('have.length', 2)
    })

    //ACESSANDO O SITE E SELECIONANDO O CHECKBOX
    it('CHECKBOX', () => {
        cy.get('#formComidaPizza').click()
            .should('be.checked')

        //ACESSANDO O SITE E SELECIONANDO MAIS DE UM CHECKBOX
        cy.get("[name='formComidaFavorita']").click({multiple: true})
        cy.get('#formComidaPizza').should('not.be.checked')
        cy.get('#formComidaVegetariana').should('be.checked')
    })

    //ACESSANDO O SITE E SELECIONANDO O COMBOBOX
    it('COMBOBOX', () => {
        cy.get('[data-test=dataEscolaridade]')
            .select('Superior')
            .should('have.value', 'superior')

        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo')
            .should('have.value', '2graucomp')
        
        cy.get('[data-test=dataEscolaridade]')
            .select('2o grau completo')
            .should('be', '2o grau completo')
        
        //TODO validar as opções do combo
        cy.get('[data-test=dataEscolaridade] option').should('have.length', 8)
        cy.get('[data-test=dataEscolaridade] option').then($arr => {
            const values = []
            $arr.each(function() {
                values.push(this.innerHTML)
            })
            expect(values).to.include.members(["Superior", "Mestrado"])
        })

    })

    //ACESSANDO O SITE E SELECIONANDO MULTIPLO COMBO
    it.only('Combo Multiplo', () => {
        cy.get('[data-testid=dataEsportes]')
            .select(['natacao', 'futebol', 'Corrida'])
        
        //TODO validar opções selecionadas do combo multiplo
        /* cy.get('[data-testid=dataEsportes]').should('have.value', ["natacao", "corrida", "nada"]) */
        cy.get('[data-testid=dataEsportes]').then($el => {
           expect($el.val()).to.be.deep.equal(['natacao', 'futebol', 'Corrida'])
           expect($el.val()).to.have.length(3)
        })
        cy.get('[data-testid=dataEsportes]').invoke('val').should('eql', ['natacao', 'futebol', 'Corrida'])
    })

})