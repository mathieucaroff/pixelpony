import { createRegisterComm } from './comm'
import { load } from './load'
import { createAutoreload } from './autoreload'
import { Pony } from '@pixelpony/shared'

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

let randomPony = (): Pony => {
   let nameObj = {
      aj: () => `Apple J${rv()}ck`,
      dash: () => `R${rv()}${rv()}nb${rv()}w D${rv()}sh`,
      ponk: () => `P${rv()}nky P${rv()}e`,
      rarity: () => `R${rv()}r${rv()}ty`,
      shy: () => `Fl${rv()}tt${rv()}rshy`,
      twi: () => `Tw${rv()}l${rv()}ght Sp${rv()}rkle`,
   }
   let base = randomChoice(Object.keys(nameObj))
   let name = nameObj[base]()

   let horn: Pony['body']['horn'] = ['rarity', 'twi'].includes(base)
      ? {
           color: rc(),
           kind: 'common',
        }
      : undefined

   let wing: Pony['body']['wing'] = ['dash', 'shy', 'twi'].includes(base)
      ? {
           color: rc(),
           kind: 'bird',
        }
      : undefined
   return {
      name,
      body: {
         coat: {
            color: rc(),
         },
         eye: {
            color: rc(),
         },
         horn,
         mane: {
            color: rc(),
            shape: 'twi',
         },
         tail: {
            color: rc(),
            shape: 'twi',
         },
         wing,
      },
   }
}

let autoreload = createAutoreload()

let registerComm = ((window as any).c = createRegisterComm({
   pony: randomPony(),
}))

load({
   autoreload,
   registerComm,
})
