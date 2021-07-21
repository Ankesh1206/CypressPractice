/// <reference types="cypress" />

describe('check weather information', () => {

    it('should get weather information for cities', () => {
        // 1st request : GET location
        cy.request({
            method: 'GET',
            url: 'https://www.metaweather.com/api/location/search/?query=San'

        }).then((response) => {
            expect(response.status).to.equal(200);
            expect(response.body.length).to.be.above(0);
            expect(response.body[0].title).to.be.a('string');
            const city = response.body[0].title;
            return city
        })
            .then((city) => {
                // 2nd request : GET weather for 1st city
                cy.request({
                    method: 'GET',
                    url: 'https://www.metaweather.com/api/location/search/?query=' + city

                }).then((response) => {
                    expect(response.status).to.equal(200);
                    expect(response.body[0]).to.have.property('title', city);
                })
            })
    })

    it('should get weather information for all cities', () => {
        // 1st request : GET location
        cy.request({
            method: 'GET',
            url: 'https://www.metaweather.com/api/location/search/?query=San'

        }).then((response) => {

            const location = response.body;
            return location
        })
            .then((location) => {

                for (let i = 0; i < location.length; i++) {
                    // 2nd request : GET weather for 1st city
                    cy.request({
                        method: 'GET',
                        url: 'https://www.metaweather.com/api/location/search/?query=' + location[i].title

                    }).then((response) => {
                        expect(response.status).to.equal(200);
                        expect(response.body[0]).to.have.property('title', location[i].title);
                    })
                }
            })
    })
})