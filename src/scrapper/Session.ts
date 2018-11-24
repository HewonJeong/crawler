import { stringify } from 'querystring'
import axios from 'axios'
import api, { host } from '../constants/api'

export default class Session {
  private readonly username: string
  private readonly password: string
  private session?: string

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
      const res = await axios.get(host)
      const session: string = res.headers['set-cookie']
        .find((cookie: string) => cookie.startsWith('PHPSESSID'))
        .replace(' path=/', '')
      this.setSession(session)
    }
    return this
  }

  private async signin() {
    const requestBody = this.getLoginData()
    await axios(host, {
      method: 'post',
      data: stringify(requestBody),
      headers: { Cookie: this.session, Referer: api('home') },
    })
    return this
  }

  private getLoginData = () => ({
    password: this.password,
    user_id: this.username,
    success_return_url: host,
    act: 'procMemberLogin',
    ruleset: '@login',
    error_return_url: '/',
  })
}
