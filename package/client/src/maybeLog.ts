import { ifEnabled } from './ifEnabled'

export const maybeLog = (name, value?, callback?: () => any) => {
   ifEnabled(name).do(() => {
      let output = value
      if (callback) {
         output = callback()
      }
      console.log(`${name}:`, output)
      if (true) {
         if (typeof output !== 'string') {
            output = JSON.stringify(output, null, 2)
         }
         let pre = document.createElement('pre')
         pre.innerText = `${name}: ${output}`
         document.body.appendChild(pre)
      }
   })
}
