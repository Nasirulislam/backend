'use strict';

module.exports = {
    registerAccount: require('./registerAccountController'),
    login: require('./loginController'),
    logout: require('./logoutController'),
    me: require('./meController'),
    changePassword: require('./changePasswordController'),
    forgotPassword: require('./forgotPasswordController')
};

