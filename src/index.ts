import puppeteer from 'puppeteer'

async function main() {
  const browser = await puppeteer.launch()

  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 800 })
  await page.goto('https://google.com')

  console.log(await page.content())
  await page.screenshot({ path: 'screenshot.png' })
  await browser.close()
}

main()
