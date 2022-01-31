import dotenv from 'dotenv'
import aws from 'aws-sdk'
import { v4 as uuidv4} from 'uuid'

dotenv.config()

const region = 'coor-xy-files'
const bucketName = 'coorxyfiles'
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new aws.S3({
    reqion,
    accessKeyId,
    secretAccessKey,
    signatureVersion: 'v4'
})

export async function generateUploadURL() {
    const params = ({
        Bucket: bucketName,
        Key: uuidv4(),
        expires: 60
    })

    const uploadURL = await s3.getSignedUrl('putObject', params)
    return uploadURL
}