import { RegisterComm } from './comm'
import { Autoreload } from './autoreload'
import { update } from './util/update'
import { Chatbox } from './chatbox'
import { maybeLog } from './maybeLog'

export interface LoadParam {
   autoreload: Autoreload
   chatbox: Chatbox
   registerComm: RegisterComm
}

export const load = async (param: LoadParam) => {
   let { autoreload, chatbox, registerComm } = param
   autoreload.on(registerComm.ws)
   let ponyComm = await registerComm.register()
   chatbox.add({
      send: (content) => {
         maybeLog('sending', content)
         ponyComm.chat({ content })
      },
   })
   update(window as any).with({ ...ponyComm, w: window })
}
