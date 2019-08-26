import { El } from '../dom/el'
import { maybeLog } from '../pagetool/maybeLog'
import { select } from '../util/select'

export interface ChatboxProp {
   el: El
   parent: HTMLElement
}

export interface ChatboxAddProp {
   send: (s: string) => void
}

export const createChatbox = (prop: ChatboxProp) => {
   let send: (s: string) => void = () => undefined

   let { el, parent } = prop
   let box = el('textarea')
   let form = el('form', {}, [box])

   box.addEventListener('keydown', (ev) => {
      maybeLog('keydown', select(ev, 'code', 'key', 'type'))
      if (ev.key === 'Enter') {
         send(box.value)
      }
   })

   return {
      add: (prop: ChatboxAddProp) => {
         send = prop.send
         parent.appendChild(form)
      },
      remove: () => {
         send = () => undefined
         parent.removeChild(form)
      },
   }
}

export type Chatbox = ReturnType<typeof createChatbox>
