import fs from 'fs'

export const writeFile = (fileName: string, content: any) => {
  const stream = fs.createWriteStream(fileName)
  stream.once('open', () => stream.end(content))
}

export const buildHtml = (body: string) => {
  return `
    <!DOCTYPE html>
      <html>
        <head></head>
        <body>${body}</body>
      </html>
  `
}
