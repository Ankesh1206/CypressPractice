/// <reference types="cypress" />

const dataJson = require('../../fixtures/createuser') // use this or line 19

describe('Create User by post request', () => {

    let accessToken = 'a47f64e1a56589e679a6beb8073400b7c1a240cda91312ad202389f347b0a825'
    let randomText = ""
    let testEmail = ""

    it('Create User by post request', () => {

        var pattern = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
        for (var i = 0; i < 10; i++) {
            randomText += pattern.charAt(Math.floor(Math.random() * pattern.length))
            testEmail = randomText + "@gmail.com"
        }

        cy.fixture('createuser').then((payload) => { // another way to use fixtures rather than dataJson, pass payload instead of datajson

            cy.request({
                method: 'POST',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'authorization': 'Bearer ' + accessToken
                },
                body: {
                    'name': payload.name,
                    'gender': payload.gender,
                    'email': testEmail,
                    'status': payload.status
                }
            }).then((response) => {
                cy.log(JSON.stringify(response))
                expect(response.status).to.eq(201)
                expect(response.body.data).has.property('email', testEmail)
                expect(response.body.data).has.property('name', dataJson.name)
                expect(response.body.data).has.property('gender', 'female')
                expect(response.body.data).has.property('status', 'active')

            }).then((response) => {
                const userid = response.body.data.id
                cy.log("user id is : " + userid)

                cy.request({
                    method: 'GET',
                    url: 'https://gorest.co.in/public/v1/users/' + userid,
                    headers: {
                        'authorization': 'Bearer ' + accessToken
                    }

                }).then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.data).has.property('id', userid)
                    expect(response.body.data).has.property('name', dataJson.name)
                })
            })
        })
    })
})