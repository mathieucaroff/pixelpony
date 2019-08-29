import { createChatbox } from './component/chatbox'
import { createEl } from './dom/el'
import { createRegisterComm } from './misc/comm'
import { createRandom } from './misc/random'
import { createAutoreload } from './pagetool/autoreload'
import { load } from './step/load'

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
