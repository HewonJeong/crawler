import PostsService from './PostsService'
import Post, { PricePost } from './Post'
import moment from 'moment'
import StorageService from './StorageService'
import { buildHtml } from '../utils/files'

moment.locale('ko')

export default async function scrap() {
  const date = moment().format('YYYY-MM-DD')
  const isTarget = (p: Post) => p instanceof PricePost && p.date === date
  const posts = (await PostsService.getPosts()).filter(isTarget)
  if (posts.length === 0) return
  const content = await PostsService.getContent(posts[0].link)
  const output = `${date}.html`
  const key = await StorageService.store(output, buildHtml(date, content))
  return key
}
