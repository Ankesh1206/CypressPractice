/// <reference types="cypress" />

describe('Get Users Test', () => {
    let accesstoken = 'a47f64e1a56589e679a6beb8073400b7c1a240cda91312ad202389f347b0a825'
    it.only('Get Users Test', () => { // only runs this test
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v1/users',
            headers: {
                'authorization' : 'Bearer ' + accesstoken
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.meta.pagination.limit).to.eq(20)
        })
    })

    it('Get Users by id Test', () => {
        cy.request({
            method: 'GET',
            url: 'https://gorest.co.in/public/v1/users/4',
            headers: {
                'authorization' : 'Bearer ' + accesstoken
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            expect(response.body.data.name).to.eq('Anjaneya Adiga PhD')
        })
    })
})