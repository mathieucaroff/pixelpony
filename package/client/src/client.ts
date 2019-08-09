import { Gift, Share } from '@pixelpony/shared'

let ws = new WebSocket(`ws://${location.host}/websocket`)

let sendMessage = (message: Share) => {
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
   } else if (message.kind === 'pong') {
      console.log('pong:', message.payload)
   } else if (message.kind === 'chat') {
      console.log('chat:', message.content)
   } else if (message.kind === 'move') {
      console.log('move:', message)
   }
}
let expo = window as any

expo.ws = ws

expo.registerPony = ({ pony }) => {
   sendMessage({
      kind: 'registerPony',
      pony,
   })
}

expo.chat = ({ content }) => {
   sendMessage({
      kind: 'chat',
      content,
      ponyToken: expo.ponyToken,
   })
}

expo.move = ({ pos, speed }) => {
   sendMessage({
      kind: 'move',
      pos,
      speed,
      time: new Date().toJSON(),
      ponyToken: expo.ponyToken,
   })
}
