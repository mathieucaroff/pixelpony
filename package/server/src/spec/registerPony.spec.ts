// JS
import { handleMessage, wsError } from '../handleMessage'
import { processMessage } from '../processMessage'
import { Registry } from '../registry'
import { validate } from '../validate'

// Type
import { Pony, Share } from '@pixelpony/shared'

describe('registring process', () => {
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

   let hmParam = {
      sender: 'loxaxs' as unknown,
      processMessage,
      validate,
   }

   test('ponies can be registered', () => {
      let registry = new Registry<unknown, Pony>({})
      let share: Share = {
         kind: 'registerPony',
         pony: milkyWay,
      }
      let response = handleMessage(JSON.stringify(share), {
         ...hmParam,
         registry,
      })

      expect(response.cast).toContain('uni')

      expect(registry.size()).toBe(1)

      if (response.cast !== 'no') {
         expect(response.gift.kind).toBe('ponyToken')
         if (response.gift.kind === 'ponyToken') {
            let {
               gift: { ponyToken },
            } = response
            expect(registry.read(ponyToken)).toEqual(milkyWay)
         }
      }
   })

   test('registered ponies are rejected if invalid name', () => {
      let registry = new Registry<unknown, Pony>({})
      let share: Share = {
         kind: 'registerPony',
         pony: {
            ...milkyWay,
            name: undefined,
         },
      } as any
      let response = handleMessage(JSON.stringify(share), {
         ...hmParam,
         registry,
      })
      expect(response.cast).toBe('uni')
      if (response.cast !== 'no') {
         expect(response.gift.kind).toBe('error')
      }
      expect(registry.size()).toBe(0)
   })
})
