import { ifEnabled } from './ifEnabled'

export let createAutoreload = () => {
   return {
      on: (ws: WebSocket) => {
         ws.addEventListener('close', () => {
            ifEnabled('autoreload', 'ar').do(() => {
               location.reload()
            })
         })
      },
   }
}

export type Autoreload = ReturnType<typeof createAutoreload>
