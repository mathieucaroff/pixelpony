import { Gift, Share, Pony } from '@pixelpony/shared'
import { createOnKind } from './util/onKind'
import { maybeLog } from './maybeLog'

export interface RegisterCommProp {
   pony: Pony
}

export interface PonyCommProp {
   pony: Pony
   ponyToken: string
   sendMessage: (msg: Share) => void
   ws: WebSocket
}

export const createPonyComm = (prop: PonyCommProp) => {
   let { pony, ponyToken, sendMessage, ws } = prop

   return {
      chat: ({ content }) => {
         sendMessage({
            kind: 'chat',
            content,
            ponyToken,
         })
      },

      move: ({ pos, speed }) => {
         sendMessage({
            kind: 'move',
            pos,
            speed,
            time: new Date().toJSON(),
            ponyToken,
         })
      },

      pony,
      ws,
   }
}

export const createRegisterComm = (prop: RegisterCommProp) => {
   let { pony } = prop

   let ws = new WebSocket(`ws://${location.host}/websocket`)

   let { onKind, emit } = createOnKind<Gift>()

   onKind('pong').do((gift) => {
      let { payload } = gift
      console.log('pong', payload)
   })
   onKind('chat').do((msg) => {
      maybeLog('chat', msg)
   })
   onKind('move').do((msg) => {
      maybeLog('move', msg)
   })

   let sendMessage = (message: Share) => {
      maybeLog('share', message)
      ws.send(JSON.stringify(message))
   }

   ws.onmessage = (messageEvent) => {
      let { data } = messageEvent
      let message: Gift = JSON.parse(data)
      if (false) {
      } else if (message.kind === 'error') {
         console.warn(
            'Server signals an error and provides the following context:',
            message.context,
         )
      } else {
         maybeLog('gift', message)
         emit(message)
      }
   }

   return {
      register: async () => {
         await new Promise((resolve) => {
            ws.addEventListener('open', resolve)
         })

         maybeLog('pony', 0, () => JSON.stringify(pony, null, 2))

         sendMessage({
            kind: 'registerPony',
            pony,
         })

         let ponyToken: string = await new Promise((resolve) => {
            let entry = onKind('ponyToken')
            let handler = ({ ponyToken }) => {
               entry.remove(handler)
               resolve(ponyToken)
            }
            entry.do(handler)
         })

         let ponyComm = createPonyComm({
            pony,
            ponyToken,
            sendMessage,
            ws,
         })

         return ponyComm
      },
      ws,
   }
}

export type PonyComm = ReturnType<typeof createPonyComm>
export type RegisterComm = ReturnType<typeof createRegisterComm>
