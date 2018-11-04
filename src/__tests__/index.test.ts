import { Greeter } from '..'

test('basic', () => {
  const g = new Greeter('world')
  expect(g.greet()).toEqual('🖖 Hello, world')
})
