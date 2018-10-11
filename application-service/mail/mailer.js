'use strict';

const nodemailer = require('nodemailer');

const mailer = {

    transporter: nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: process.env.MAIL_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASSWORD
        }
    }),

    sendMail: function(options, callback) {
        let mailOptions = {
            from: process.env.MAIL_FROM || mailOptions.from,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html
        };

        this.transporter.sendMail(mailOptions, (error) => {
            if (error) {
                callback(true);
            }
            else {
                callback(false);
            }
        });
    }
};

module.exports = mailer;
