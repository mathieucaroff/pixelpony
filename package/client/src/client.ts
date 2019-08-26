import { createRegisterComm } from './misc/comm'
import { load } from './step/load'
import { createAutoreload } from './pagetool/autoreload'
import { createRandom } from './misc/random'
import { createChatbox } from './component/chatbox'
import { createEl } from './dom/el'

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
