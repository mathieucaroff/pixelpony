import { Chatbox } from '../component/chatbox'
import { RegisterComm } from '../misc/comm'
import { Autoreload } from '../pagetool/autoreload'
import { maybeLog } from '../pagetool/maybeLog'
import { update } from '../util/update'

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
