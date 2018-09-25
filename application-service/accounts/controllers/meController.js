
const Account = require('../models/account');

const meController = async function(req, res) {

    const accountById = await Account.where('id', req.user.id).fetch();
    if (!accountById) {
        return res.status(400).json({ code: 4 });
    }

    res.status(200).json({ 
        account: {
            id: accountById.get('id'),
            username: accountById.get('username'),
            email: accountById.get('email')
        }
    });
};

module.exports = meController;
