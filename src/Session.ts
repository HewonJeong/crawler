import { stringify } from 'querystring'
import axios from 'axios'

export default class Session {
  private readonly username: string
  private readonly password: string
  private session?: string
  private static readonly HOST = 'http://rgo4.com'

  constructor(username: string, password: string) {
    this.username = username
    this.password = password
    this.create()
  }

  async create() {
    await this.prepare()
    await this.signin()
    return this.session
  }

  get(): string {
    return this.session || ''
  }

  setSession(session: string) {
    this.session = session
  }

  private async prepare() {
    if (!this.session) {
      const res = await axios.get(Session.HOST)
      const session: string = res.headers['set-cookie']
        .find((cookie: string) => cookie.startsWith('PHPSESSID'))
        .replace(' path=/', '')
      this.setSession(session)
    }
    return this
  }

  private async signin() {
    const requestBody = this.getLoginData()
    await axios(Session.HOST, {
      method: 'post',
      data: stringify(requestBody),
      headers: { Cookie: this.session, Referer: 'http://rgo4.com/index' },
    })
    return this
  }

  private getLoginData = () => ({
    password: this.password,
    user_id: this.username,
    success_return_url: Session.HOST,
    act: 'procMemberLogin',
    ruleset: '@login',
    error_return_url: '/',
    mid: 'index',
  })
}
