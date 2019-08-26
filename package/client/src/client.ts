import { createRegisterComm } from './comm'
import { load } from './load'
import { createAutoreload } from './autoreload'
import { createRandom } from './random'
import { createChatbox } from './chatbox'
import { createEl } from './el'

let autoreload = createAutoreload()

let random = createRandom({
   random: Math.random,
})

let registerComm = ((window as any).c = createRegisterComm({
   pony: random.pony(),
}))

let el = createEl({
   document,
})

let chatbox = createChatbox({
   el,
   parent: document.body,
})

load({
   autoreload,
   chatbox,
   registerComm,
})
