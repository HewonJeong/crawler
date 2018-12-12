import Session from './Session'
import cheerio from 'cheerio'
import axios from 'axios'
import Post, { PostFactory } from './Post'
import api from '../constants/api'
import moment = require('moment')

const toDate = (date: string) => moment(date, 'YY.MM.DD').format('YYYY-MM-DD')

export default class PostsService {
  private static session?: string
  private static readonly boardUrl = api('board')

  static async init() {
    PostsService.session = await new Session(
      process.env.USERNAME || '',
      process.env.PASSWORD || ''
    ).create()
  }

  static getPosts = async () => {
    const { data: html } = await axios.get<string>(PostsService.boardUrl)
    const $ = cheerio.load(html, { decodeEntities: false })
    const trs = $('.list_normal tbody tr:not(.normal_notice)')
    const posts: Post[] = trs.toArray().map(tr => {
      const dom = $(tr)
      const title = dom.find('.title a:first-child').text()
      const link = dom.find('.title a').attr('href')
      const hits = parseInt(dom.find('.read_num.num').text(), 10)
      const likes = parseInt(dom.find('.vote_num.num').text(), 10)
      const date = toDate(dom.find('.time.num').text())

      return PostFactory.createPost(title, link, hits, likes, date)
    })
    return posts
  }

  static getContent = async (url: string) => {
    if (!PostsService.session) await PostsService.init()
    const { data: html } = await axios(url, {
      method: 'get',
      headers: { Cookie: PostsService.session },
    })
    const $ = cheerio.load(html)
    const article = $('.article_body .xe_content')
    return article.html() || ''
  }
}
