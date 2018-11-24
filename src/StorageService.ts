import { Config, S3 } from 'aws-sdk'
import { Bucket } from 'aws-sdk/clients/cloudsearchdomain'

export default class StorageService {
  static store(key: string, data: string) {
    S3Client.put(key, data)
  }
}

class S3Client {
  static AWS_USER_KEY = process.env.AWS_USER_KEY || ''
  static AWS_USER_SECRET = process.env.AWS_USER_SECRET || ''
  static AWS_REGION = process.env.AWS_REGION || ''
  static BUCKET_NAME = 'scrapper-images'
  static client = S3Client.getClient()

  static getClient() {
    const { AWS_USER_KEY, AWS_USER_SECRET, AWS_REGION, BUCKET_NAME } = S3Client
    return new S3({
      accessKeyId: AWS_USER_KEY,
      secretAccessKey: AWS_USER_SECRET,
      region: AWS_REGION,
    })
  }
  static getKey(fileName: string) {
    const { AWS_REGION, BUCKET_NAME } = S3Client
    return `https://s3.${AWS_REGION}.amazonaws.com/${BUCKET_NAME}/${fileName}`
  }
  static async put(fileName: string, data: string) {
    const params: S3.PutObjectRequest = {
      Bucket: S3Client.BUCKET_NAME,
      Key: fileName,
      Body: data,
      ACL: 'public-read',
    }
    try {
      await S3Client.client.putObject(params).promise()
      return S3Client.getKey(fileName)
    } catch (error) {
      console.error(error)
      return error
    }
  }
}
