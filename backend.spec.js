/// <reference types="cypress"/>


describe('should test a functional level', () =>{
    // let token

    before(() => {
        cy.getToken('cleytonsantos087@gmail.com', 'cleyton123')
            // .then(tkn => {
            //     token = tkn
            // })
    })

    beforeEach(() => {
        cy.resetRest()
    })
    
    it('should create as account',() => {
        cy.request({
            method: 'POST',
            // headers: {Authorization: `JWT ${token}`},
            url: '/contas',
            body: {
                nome: 'Conta via rest'
            }
        }).as('response')


        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(201)
            expect(res.body).to.have.property('id')
            expect(res.body).to.have.property('nome', 'Conta via rest')
        })
    })

    it('Should update an account',() => {
        cy.request({
            method: 'GET',
            url: '/contas',
            // headers: {Authorization: `JWT ${token}`},
            qs: {
                nome: 'Conta para alterar'
            }
        }).then(res => {
            cy.request({
                method: 'PUT',
                // headers: {Authorization: `JWT ${token}`},
                url: `/contas/${res.body[0].id}`,
                body: {
                    nome: "Conta Alterada Via Rest"
                }
            }).as('response')
        })
        cy.get('@response').its('status').should('be.equal', 200)
        
    })

    it('Should not create an account with same name',() => {
        cy.request({
            method: 'POST',
            // headers: {Authorization: `JWT ${token}`},
            url: '/contas',
            body: {
                nome: 'Conta mesmo nome'
            },
            failOnStatusCode: false,
        }).as('response')


        cy.get('@response').then(res => {
            expect(res.status).to.be.equal(400)
            expect(res.body.error).to.be.equal('Já existe uma conta com esse nome!')
        })
    }),

    it('Should creat a transaction', () => {
        cy.getContaByName('Conta para movimentacoes')
        .then(contaId => {
            cy.request({
                method: 'POST',
                // headers: {Authorization: `JWT ${token}`},
                url: '/transacoes',
                body: {
                    conta_id: contaId,
                    data_pagamento: Cypress.moment().add({days: 1}).format('DD/MM/YYYY'),
                    data_transacao: Cypress.moment().format('DD/MM/YYYY'),
                    descricao: "desc",
                    envolvido: "inter",
                    status: true,
                    tipo: "REC",
                    valor: "123"
                }
            }).as('response')
        })

        cy.get('@response').its('status').should('be.equal', 201)
        cy.get('@response').its('status').should('exist')
        // cy.get('@response').then(res => {
        //     expect(res.status).to.be.equal(201)

        // })

    })

    it('Should get balance',() => {
       cy.request({
            url: '/saldo',
            method: 'GET',
            // headers: {Authorization: `JWT ${token}`},
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo')saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('534.00')
        })


        cy.request({
            method: 'GET',
            url: '/transacoes',
            // headers: {Authorization: `JWT ${token}`},
            qs: {descricao: 'Movimentacao 1, calculo saldo'}
        }).then(res => {
            cy.request({
                url:`/transacoes/${res.body[0].id}`,
                method: 'PUT',
                // headers: {Authorization: `JWT ${token}`},
                body: {
                    status: true,
                    data_transacao: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    data_pagamento: Cypress.moment(res.body[0].data_transacao).format('DD/MM/YYYY'),
                    descricao: res.body[0].descricao,
                    envolvido: res.body[0].envolvido,
                    valor: res.body[0].valor,
                    conta_id: res.body[0].conta_id


                }
            }).its('status').should('be.equal', 200)
        })

        cy.request({
            url: '/saldo',
            method: 'GET',
            // headers: {Authorization: `JWT ${token}`},
        }).then(res => {
            let saldoConta = null
            res.body.forEach(c => {
                if(c.conta === 'Conta para saldo')saldoConta = c.saldo
            })
            expect(saldoConta).to.be.equal('4034.00')
        })

    })

    it('Should remove a transaction', () => {
        cy.request({
            method: 'GET',
            url: '/transacoes',
            // headers: {Authorization: `JWT ${token}`},
            qs: {descricao: 'Movimentacao para exclusao'}
        }).then(res => {
            cy.request({
                url: `/transacoes/${res.body[0].id}`,
                method: 'DELETE',
                // headers: {Authorization: `JWT ${token}`},
            }).its('status').should('be.equal', 204)
        })

    })
})