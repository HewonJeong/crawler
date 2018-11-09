import Session from './Session'
import cheerio from 'cheerio'
import axios from 'axios'
import Post, { PostFactory } from './Post'

export default class PostsService {
  private static session?: string
  private static readonly HOST = 'http://rgo4.com'
  private static readonly BOARD_URL = `${PostsService.HOST}/best`

  static async init() {
    PostsService.session = await new Session(
      process.env.USERNAME || '',
      process.env.PASSWORD || ''
    ).create()
    console.log(PostsService.session)
  }

  static getPosts = async () => {
    const { data: html } = await axios.get<string>(PostsService.BOARD_URL)
    const $ = cheerio.load(html, { decodeEntities: false })
    const trs = $('.list_normal tbody tr:not(.normal_notice)')
    const posts: Post[] = trs.toArray().map(tr => {
      const dom = $(tr)
      const title = dom.find('.title a:first-child').text()
      const link = dom.find('.title a').attr('href')
      const hits = parseInt(dom.find('.read_num.num').text(), 10)
      const likes = parseInt(dom.find('.vote_num.num').text(), 10)

      return PostFactory.createPost(title, link, hits, likes)
    })
    return posts
  }

  static getContent = async (url: string) => {
    if (!PostsService.session) await PostsService.init()
    const { data: html } = await axios(url, {
      method: 'get',
      headers: { Cookie: PostsService.session },
    })
    const $ = cheerio.load(html, { decodeEntities: false })
    const article = $('.article_body .xe_content')
    return article.html() || ''
  }
}
