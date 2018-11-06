import dotenv from 'dotenv'
import puppeteer from 'puppeteer'
dotenv.config()
interface Auth {
  username: string
  password: string
}
interface Selecor extends Auth {
  submit: string
}

async function getSession(params: {
  signinPage: string
  auth: Auth
  selector: Selecor
}) {
  const { signinPage, auth, selector } = params
  const browser = await puppeteer.launch()

  const page = await browser.newPage()
  await page.setViewport({ width: 1480, height: 800 })
  console.log('signinPage', signinPage)
  await page.goto(signinPage)
  await page.evaluate(
    (auth, selector) => {
      document.querySelector(selector.username).value = auth.username
      document.querySelector(selector.password).value = auth.password
      document.querySelector(selector.submit).click()
    },
    auth,
    selector
  )
  //const cookies = await page.cookies()
  //console.log('cookies', cookies)
  await page.goto('http://rgo4.com/hot')
  await page.screenshot({ path: 'screenshot.png' })
}

const { USERNAME = '', PASSWORD = '', SIGNIN_PAGE = '' } = process.env
const {
  USERNAME_SELECTOR = '',
  PASSWORD_SELECTOR = '',
  SUBMIT_SELECTOR = '',
} = process.env
const params = {
  signinPage: SIGNIN_PAGE,
  auth: { username: USERNAME, password: PASSWORD },
  selector: {
    username: USERNAME_SELECTOR,
    password: PASSWORD_SELECTOR,
    submit: SUBMIT_SELECTOR,
  },
}

getSession(params)
