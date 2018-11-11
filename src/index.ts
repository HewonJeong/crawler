import dotenv from 'dotenv'
import PostsService from './PostsService'
import Post, { PricePost } from './Post'
dotenv.config({ path: '.env.local' })

async function main() {
  const isTarget = (p: Post) => p instanceof PricePost
  const posts = (await PostsService.getPosts()).filter(isTarget)
  console.log(posts)
}
main()
