/// <reference types="cypress" />

describe('OAuth 2.0 feature apis', () => {


    let access_token = '';
    let user_id = '';

    before('generate token', () => {
        //to get the token
        cy.request({
            method: 'POST',
            url: 'http://coop.apps.symfonycasts.com/token',
            form: true,
            body: {

                'client_id': 'CyAPIApp',
                'client_secret': '2cf86dc2a85111127f314081950519d4',
                'grant_type': 'client_credentials'

            }
        }).then((response) => {
            cy.log(JSON.stringify(response));
            //cy.log(response.body.access_token);
            access_token = response.body.access_token;
            cy.log(access_token)
            //get the user id
            cy.request({
                method: 'GET',
                url: 'http://coop.apps.symfonycasts.com/api/me',
                headers: {
                    'Authorization': 'Bearer ' + access_token

                }

            }).then((response) => {
                cy.log(JSON.stringify(response));
                user_id = response.body.id;
                cy.log("user_id : " + user_id);
            })
        })
    })
    it.only('Unlock the barn Test', () => {


        cy.request({
            method: 'POST',
            url: 'http://coop.apps.symfonycasts.com/api/' + user_id + 'barn-unlock',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then((response) => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.equal(200);
            //expect(response.id).to.satisfy(/^\d+$/);
        })
    })

    it('Put the Toilet seat down Test', () => {


        cy.request({
            method: 'POST',
            url: 'http://coop.apps.symfonycasts.com/api/' + user_id + 'toiletseat-down',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then((response) => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.equal(200);
            //expect(response.id).to.satisfy(/^\d+$/);
        })
    })

    it('Chicken Feeds Test', () => {


        cy.request({
            method: 'POST',
            url: 'http://coop.apps.symfonycasts.com/api/' + user_id + 'chickens-feed',
            headers: {
                'Authorization': 'Bearer ' + access_token
            }
        }).then((response) => {
            cy.log(JSON.stringify(response));
            expect(response.status).to.equal(200);
            //expect(response.id).to.satisfy(/^\d+$/);
        })
    })
})

