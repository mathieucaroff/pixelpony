import { createRegisterComm } from './comm'
import { load } from './load'
import { createAutoreload } from './autoreload'

let randomChoice = (arr) => {
   return arr[Math.floor(Math.random() * arr.length)]
}

let rv = () => {
   // random vowel
   return randomChoice('aeiou')
}

let rc = () => {
   return Math.random()
      .toString(16)
      .substr(2, 6)
}

let randomName = () => {
   return randomChoice([
      () => `Apple J${rv()}ck`,
      () => `Fl${rv()}t${rv()}rshy`,
      () => `P${rv()}nky P${rv()}e`,
      () => `R${rv()}${rv()}nb${rv()}w D${rv()}sh`,
      () => `R${rv()}r${rv()}ty`,
      () => `Tw${rv()}l${rv()}ght Sp${rv()}rkle`,
   ])()
}

let autoreload = createAutoreload()

let registerComm = ((window as any).c = createRegisterComm({
   pony: {
      name: randomName(),
      body: {
         coat: {
            color: rc(),
         },
         eye: {
            color: rc(),
         },
         horn: {
            color: rc(),
            kind: 'common',
         },
         mane: {
            color: rc(),
            shape: 'twi',
         },
         tail: {
            color: rc(),
            shape: 'twi',
         },
      },
   },
}))

load({
   autoreload,
   registerComm,
})
