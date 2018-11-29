import dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

import Post, { PricePost } from './scrapper/Post'
import PostsService from './scrapper/PostsService'

export const main = async () => {
  const isTarget = (p: Post) => p instanceof PricePost
  const posts = (await PostsService.getPosts()).filter(isTarget)
  const content = await PostsService.getContent(posts[0].link)
}

main()
