import scrapper from './scrapper'
import { Handler, Context, Callback } from 'aws-lambda'
import StorageService from './scrapper/StorageService'

export const scrap: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  const res = await scrapper()
  const response = {
    statusCode: 200,
    body: JSON.stringify({ key: res }),
  }

  callback(null, response)
}

export const updateLatest: Handler = async (
  event: any,
  context: Context,
  callback: Callback
) => {
  const soruce = decodeURIComponent(
    event.Records[0].s3.object.key.replace(/\+/g, ' ')
  )
  const res = StorageService.copy(soruce, 'latest.html')
  const response = {
    statusCode: 200,
    body: JSON.stringify({ res }),
  }
  callback(null, response)
}
