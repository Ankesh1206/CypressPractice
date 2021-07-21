/// <reference types="cypress" />


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

            // 1. POST request to create user
            cy.request({
                method: 'POST',
                url: 'https://gorest.co.in/public/v1/users',
                headers: {
                    'authorization': 'Bearer ' + accessToken
                },
                body: {
                    
                        "name":"AnkeshAutomation Labs",
                        "gender":"male",
                        "email":testEmail,
                        "status":"active"
                    
                }
            }).then((response) => {
                cy.log(JSON.stringify(response))
                expect(response.status).to.eq(201)
                expect(response.body.data).has.property('email', testEmail)
                expect(response.body.data).has.property('name', 'AnkeshAutomation Labs')
                expect(response.body.data).has.property('gender', 'male')
                expect(response.body.data).has.property('status', 'active')

            }).then((response) => {
                const userid = response.body.data.id
                cy.log("user id is : " + userid)

                // 2. PUT request to update user
                cy.request({
                    method: 'PUT',
                    url: 'https://gorest.co.in/public/v1/users/' + userid,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    },
                    body: {
                    
                        "name":"AnkeshAutomationLabs",
                        "gender":"male",
                        "email": "a"+testEmail,
                        "status":"inactive"
                    
                }
                }).then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.data).has.property('email', "a"+testEmail)
                    expect(response.body.data).has.property('name', 'AnkeshAutomationLabs')
                    expect(response.body.data).has.property('gender', 'male')
                    expect(response.body.data).has.property('status', 'inactive')
                })
            }).then((response) => {
                const userid = response.body.data.id
                cy.log("user id is : " + userid)

                // 3. GET request to get user
                cy.request({
                    method: 'GET',
                    url: 'https://gorest.co.in/public/v1/users/' + userid,
                    headers: {
                        'Authorization': 'Bearer ' + accessToken
                    }
                }).then((response) => {
                    expect(response.status).to.eq(200)
                    expect(response.body.data).has.property('email', "a"+testEmail)
                    expect(response.body.data).has.property('name', 'AnkeshAutomationLabs')
                    expect(response.body.data).has.property('gender', 'male')
                    expect(response.body.data).has.property('status', 'inactive')
                })
            })
        })

})