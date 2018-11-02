'use strict';

const localizedString = function (req, string) {

    if (req.acceptsLanguages('en')) {
        return string.en;
    }
    else if (req.acceptsLanguages('it')) {
        return string.it;
    }
    else if (req.acceptsLanguages('fr')) {
        return string.fr;
    }
    else if (req.acceptsLanguages('de')) {
        return string.de;
    }
    
    return string.en;
};

module.exports = localizedString;
