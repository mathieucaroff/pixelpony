// JS
import { handleMessage } from '@pixelpony/server/src/handleMessage'
import { Registry } from '@pixelpony/server/src/registry'

// Type
import { default as WebSocket, Server } from 'ws'
import { Pony, Share } from '@pixelpony/shared'
import { getOnMessage } from '@pixelpony/server/src/getOnMessage'

describe('on message', () => {
   let milkyWay: Pony = {
      name: 'Milky Way',
      body: {
         coat: {
            color: '#feea94',
         },
         eye: {
            color: '#008b58',
         },
         mane: {
            color: '#3e77cb',
            shape: 'stylish',
         },
         tail: {
            color: '#3e77cb',
            shape: 'rarity',
         },
      },
   }

   test('onmessage unicast works', () => {
      let registry = new Registry<unknown, Pony>({})

      let ws = { send: jest.fn() } as any
      let cli0 = { send: jest.fn() }
      let cli1 = { send: jest.fn() }

      let { onmessage } = getOnMessage({
         registry,
         ws,
         wss: {
            clients: [cli0, cli1],
         } as any,
      })

      let share: Share = {
         kind: 'registerPony',
         pony: milkyWay,
      }

      onmessage({ data: JSON.stringify(share) })

      expect(ws.send).toHaveBeenCalledTimes(1)
      expect(cli0.send).toHaveBeenCalledTimes(0)
      expect(cli1.send).toHaveBeenCalledTimes(0)

      let send = ws.send as jest.Mock
      let txt = send.mock.calls[0][0]
      let response = JSON.parse(txt)

      expect(response.kind).toBe('ponyToken')
      expect(typeof response.ponyToken).toBe('string')
   })

   test('onmessage broadcast works', () => {
      let registry = new Registry<unknown, Pony>({})
      let ponyToken = registry.create('ox', milkyWay)

      let ws = { send: jest.fn() } as any
      let cli0 = { send: jest.fn() }
      let cli1 = { send: jest.fn() }

      let { onmessage } = getOnMessage({
         registry,
         ws,
         wss: {
            clients: [cli0, cli1],
         } as any,
      })

      let share: Share = {
         kind: 'move',
         pos: { x: 0, y: 0 },
         speed: { x: 0, y: 0 },
         time: new Date().toJSON(),
         ponyToken,
      }

      onmessage({ data: JSON.stringify(share) })

      expect(ws.send).toHaveBeenCalledTimes(1)
      expect(cli0.send).toHaveBeenCalledTimes(0)
      expect(cli1.send).toHaveBeenCalledTimes(0)

      let send = ws.send as jest.Mock
      let txt = send.mock.calls[0][0]
      let response = JSON.parse(txt)

      expect(response.kind).toBe('ponyToken')
      expect(typeof response.ponyToken).toBe('string')
   })
})
