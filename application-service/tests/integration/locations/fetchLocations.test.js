'use strict';

const request = require('supertest');
const knex = require('../../../db/knex');

let server;
describe('/v1/locations', () => {
    
    beforeEach(async () => {
        await knex.migrate.latest();
        await knex.seed.run();
        server = require('../../../app.js');
    });

    afterEach(() => {
        server.close();
    });

    describe('GET /', () => {

        it('should return the locations in english by default', async () => {
            // When
            const res = await request(server).get('/v1/locations');

            // Then
            expect(res.status).toBe(200);
            expect(res.body.locations.length).toEqual(26);
            
            const locationAll = res.body.all.name;
            expect(locationAll).toEqual('Switzerland');

            const locationNames = res.body.locations.map(location => location.name);
            expect(locationNames).toEqual([
                'Aargau', 'Appenzell Ausserrhoden', 'Appenzell Innerrhoden', 'Basel-Landschaft',
                'Basel-Stadt', 'Bern', 'Fribourg', 'Geneva', 'Glarus', 'Grisons', 'Jura', 'Luzern',
                'Neuchâtel', 'Nidwalden', 'Obwalden', 'Schaffhausen', 'Schwyz', 'Solothurn',
                'St. Gallen', 'Ticino', 'Thurgau', 'Uri', 'Valais', 'Vaud', 'Zürich', 'Zug']);
        });

        it('should return the locations localized when receiving Accept-Language', async () => {
            // When
            const res = await request(server)
                .get('/v1/locations')
                .set('Accept-Language', 'it');

            // Then
            expect(res.status).toBe(200);
            expect(res.body.locations.length).toEqual(26);
           
            const locationAll = res.body.all.name;
            expect(locationAll).toEqual('Svizzera');

            const locationNames = res.body.locations.map(location => location.name);
            expect(locationNames).toEqual(['Argovia', 'Appenzello Esterno', 'Appenzello Interno',
                'Basilea Campagna', 'Basilea Città', 'Berna', 'Friburgo', 'Ginevra', 'Glarona',
                'Grigioni', 'Giura', 'Lucerna', 'Neuchâtel', 'Nidvaldo', 'Obvaldo', 'Sciaffusa',
                'Svitto', 'Soletta', 'San Gallo', 'Ticino', 'Turgovia', 'Uri', 'Vallese', 'Vaud',
                'Zurigo', 'Zugo']);
        });
    });
});
