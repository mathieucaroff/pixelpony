import { getOnMessage } from './getOnMessage'
import { Registry } from './registry'

describe('on message', () => {
   let registry = new Registry<unknown, string>({})

   let ws = { send: jest.fn() } as any
   let cli0 = { send: jest.fn() }
   let cli1 = { send: jest.fn() }

   let { onmessage } = getOnMessage({
      registry: new Registry(),
      ws,
      wss: {
         clients: [cli0, cli1],
      } as any,
   })
})
