import fs from 'fs'

export const writeFile = (fileName: string, content: any) => {
  const stream = fs.createWriteStream(fileName)
  stream.once('open', () => stream.end(content))
}

export const buildHtml = (title: string, body: string) => {
  return `
    <!DOCTYPE html>
      <html lang="en">
        <head>
          <title>${title}</title>
          <meta charset="utf-8" />
          <link rel="stylesheet" href="/scrapper-images/main.css">
          <link rel="shortcut icon" href="/scrapper-images/favicon.ico" />
          <link rel="apple-touch-icon" href="/scrapper-images/phone.png">
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />
        </head>
        <body>
          ${body}
        </body>
      </html>
  `
}
