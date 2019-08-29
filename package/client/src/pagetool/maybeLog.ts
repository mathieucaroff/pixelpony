import { ifEnabled } from './ifEnabled'
import { log } from './log'

export const maybeLog = (name, value?, callback?: () => any) => {
   ifEnabled(name).do(() => {
      let output = value
      if (callback) {
         output = callback()
      }
      log(`${name}:`, output)
   })
}
