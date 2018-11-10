'use strict';

const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');
const Joi = require('joi');

const setUpAWS = function() {
    const spacesEndpoint = new aws.Endpoint(process.env.AWS_SPACES_ENDPOINT);
    aws.config.accessKeyId = process.env.AWS_ACCESS_KEY_ID;
    aws.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

    const s3 = new aws.S3({ endpoint: spacesEndpoint });
    return s3;
};

const hashCode = function(str) {
    return str.split('').reduce((prevHash, currVal) =>
        (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0);
};

const uploadImageController = function(req, res) {

    const schema = {
        type: Joi.string().valid('item', 'avatar').required()
    };
 
    const uploadImageRequest = {
        type: req.body.type
    };

    Joi.validate(uploadImageRequest, schema, async function(error, value) {
        if(error) {
            return res.status(400).send({ code: 20 });
        }

        let fileName;
        const upload = multer({
            storage: multerS3({
                s3: s3,
                bucket: process.env.AWS_BUCKET_ID,
                acl: 'public-read',
                key: function (request, file, cb) {
                    if (value.type === 'item') {
                        fileName = 'items' + req.user.id + '.' + hashCode(file.originalname) + '.png';
                    }
                    else {
                        fileName = 'accounts' + req.user.id;
                    }

                    cb(null, fileName);
                }
            })
        }).single('image');
    
        upload(req, res, function(error) {
            if (error) {
                return res.status(500).send({ code: 14, error: 'Upload failure' });
            }
            else {
                return res.status(200).send({ identifier: fileName });
            }
        });
    });
};

const s3 = setUpAWS();

module.exports = uploadImageController;
