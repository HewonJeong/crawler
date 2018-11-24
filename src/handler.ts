import scrapper from './scrapper'
import { Handler, Context, Callback } from 'aws-lambda'

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
