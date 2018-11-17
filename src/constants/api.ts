export const host = 'http://rgo4.com'

const paths = {
  home: '/index',
  board: '/best',
}

export default (key: keyof typeof paths) => `${host}${paths[key]}`
