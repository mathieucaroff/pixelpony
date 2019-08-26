import { ifEnabled } from './ifEnabled'

export const maybeLog = (name, value?, callback?: () => any) => {
   ifEnabled(name).do(() => {
      let output = value
      if (callback) {
         output = callback()
      }
      console.log(`${name}:`, output)
   })
}
