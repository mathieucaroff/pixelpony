export const ifEnabled = (longName, shortName = '') => {
   let hashhas = (word) => {
      let { hash } = location
      let text = `#${word}`
      return hash.endsWith(text) || hash.includes(`${text}#`)
   }

   let test = () => {
      let result: boolean = window[longName] as any
      if (result === undefined && hashhas(longName)) {
         result = true
      }
      if (result === undefined && shortName && hashhas(shortName)) {
         result = true
      }
      return result
   }

   return {
      do: (callback) => {
         if (test()) {
            callback()
         }
      },
   }
}
