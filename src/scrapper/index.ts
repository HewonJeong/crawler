import dotenv from 'dotenv'
import PostsService from './PostsService'
import Post, { PricePost } from './Post'
import moment from 'moment'
import StorageService from './StorageService'

dotenv.config({ path: '.env' })
moment.locale('ko')

export default async function scrap() {
  const isTarget = (p: Post) => p instanceof PricePost
  const posts = (await PostsService.getPosts()).filter(isTarget)
  const content = await PostsService.getContent(posts[0].link)
  const date = moment().format('YYYY-MM-DD')
  const output = `${date}.html`
  const key = await StorageService.store(output, content)
  return key
}
