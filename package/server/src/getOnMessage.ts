// JS
import { processMessage } from './processMessage'
import { validate } from './validate'

// Type
import { default as WebSocket, Server } from 'ws'
import { Pony } from '@pixelpony/shared'
import { handleMessage } from './handleMessage'
import { Registry } from './registry'
import { WsGift } from '../type'

export interface OnMessageProp {
   registry: Registry<unknown, Pony>
   ws: WebSocket
   wss: Server
}

export const getOnMessage = (prop: OnMessageProp) => {
   let { registry, ws, wss } = prop

   let castingFunction = {
      uni: (x) => ws.send(x),
      broad: (txt) => {
         wss.clients.forEach((clientWs) => {
            clientWs.send(txt)
         })
      },
   }

   let onmessage = (event) => {
      try {
         let { data } = event

         let text = `${data}`

         let response: WsGift = handleMessage(text, {
            sender: ws as unknown,
            processMessage,
            registry,
            validate,
         })

         // -- //
         if (response.cast !== 'no') {
            let { cast, gift: downMessage } = response

            let caster = castingFunction[cast]

            caster(JSON.stringify(downMessage))
         }
      } catch (e) {
         console.error(e)
      }
   }

   return {
      onmessage,
   }
}
