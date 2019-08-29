import { ifEnabled } from './ifEnabled'

let stringify = (val) =>
   typeof val === 'string' ? val : JSON.stringify(val, null, 2)

export const log = (...argList) => {
   console.log(...argList)
   ifEnabled('mobile').do(() => {
      let pre = document.createElement('pre')
      pre.innerText = argList.map(stringify).join(' ')
      document.body.appendChild(pre)
   })
}
