const router = require('express').Router()
module.exports = router
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require('./secrets')

// const dotenv = require('dotenv')
const aws = require('aws-sdk')
const { v4 : uuidv4} = require('uuid')

// dotenv.config()

const region = 'us-east-1'
const bucketName = 'coor-xy-files'
const accessKeyId = AWS_ACCESS_KEY_ID
const secretAccessKey = AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
    region,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

async function generateUploadURL() {
    const params = ({
        Bucket: bucketName,
        Key: 'file4',
        Expires: 60
    })

    const uploadURL = await s3.getSignedUrlPromise('putObject', params)
    return uploadURL
}

router.get('/', async (req, res, next) => {
    try {
        const url = await generateUploadURL()
        res.send(url)
    } catch (error) {
        next(error)
    }
})