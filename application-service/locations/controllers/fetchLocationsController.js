'use strict';

const Location = require('../models/location');
const localization = require('../../localization');

const fetchLocationsController = function(req, res) {

    Location.fetchAll().then(function(locations) {
        const localizedLocations = locations.map(location => {
            return { 
                name: localization.localizedString(req, localization.strings.Canton[location.get('name')]),
                image: `${process.env.IMAGES_BASE_URL}locations/${location.get('name')}.png`
            };
        });

        res.status(200).json({ locations: localizedLocations });
    });
};

module.exports = fetchLocationsController;
