import { createOn } from './on'

describe('on', () => {
   test('on emits function calls', () => {
      let on = createOn()
      let f = jest.fn()
      let data = Symbol('test data')
      on('event').do(f)
      on('event').emit(data)
      expect(f).toHaveBeenCalledTimes(1)
      expect(f).toHaveBeenCalledWith(data)
   })
})
