import axios from 'axios'

/* utils */
const stringify = (data: { [key: string]: string }) =>
  Object.keys(data)
    .map(
      (key: string) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
    )
    .join('&')

const loadParams = () => {
  const {
    USERNAME: username,
    PASSWORD: password,
    TARGET_URL: url,
  } = process.env
  if (!username || !password || !url) throw Error('invalid env vars')
  return { username, password, url }
}
export async function request() {
  console.log('[requset]', process.env)
  const { username, password, url } = loadParams()
  const requestBody = {
    password,
    act: 'procMemberLogin',
    ruleset: '@login',
    user_id: username,
    error_return_url: '/',
    mid: 'index',
    success_return_url: '/best',
    vid: '',
  }

  try {
    const r2 = await axios(url, {
      method: 'post',
      data: stringify(requestBody),
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    })
    console.log(r2.status)
  } catch (error) {
    console.log(error.response.status)
  }
}
