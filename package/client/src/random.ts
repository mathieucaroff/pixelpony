import { Pony } from '@pixelpony/shared'

export interface RandomProp {
   random: () => number
}

export const createRandom = (prop: RandomProp) => {
   let { random } = prop

   let choice = (arr) => {
      return arr[Math.floor(random() * arr.length)]
   }

   let vowel = () => {
      return choice('aeiou')
   }

   let color = () => {
      return random()
         .toString(16)
         .substr(2, 6)
   }

   let pony = (): Pony => {
      let nameObj = {
         aj: `Apple J*ck`,
         dash: `R**nb*w D*sh`,
         ponk: `P*nky P*e`,
         rarity: `R*r*ty`,
         shy: `Fl*tt*rshy`,
         twi: `Tw*l*ght Sp*rkle`,
      }
      let base = choice(Object.keys(nameObj))
      let name = nameObj[base].replace(/\*/g, vowel)

      let horn: Pony['body']['horn'] = ['rarity', 'twi'].includes(base)
         ? {
              color: color(),
              kind: 'common',
           }
         : undefined

      let wing: Pony['body']['wing'] = ['dash', 'shy', 'twi'].includes(base)
         ? {
              color: color(),
              kind: 'bird',
           }
         : undefined
      return {
         name,
         body: {
            coat: {
               color: color(),
            },
            eye: {
               color: color(),
            },
            horn,
            mane: {
               color: color(),
               shape: base,
            },
            tail: {
               color: color(),
               shape: base,
            },
            wing,
         },
      }
   }
   return {
      choice,
      color,
      pony,
      vowel,
   }
}
