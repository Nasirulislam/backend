'use strict';

const Location = require('../models/location');
const localization = require('../../localization');

const fetchLocationsController = function(req, res) {

    Location.fetchAll().then(function(locations) {
        const localizedLocations = locations.map(location => {
            return {
                id: location.get('id'),
                name: localization.localizedString(req, localization.strings.Canton[location.get('name')]),
                image: `${process.env.IMAGES_BASE_URL}locations/${location.get('name')}.png`
            };
        });

        res.status(200).json({
            all: {
                name: localization.localizedString(req, localization.strings.Canton['all']),
                image: `${process.env.IMAGES_BASE_URL}locations/all.png`
            },
            locations: localizedLocations
        });
    });
};

module.exports = fetchLocationsController;
