export const select = <TObj, TK extends keyof TObj>(
   obj: TObj,
   ...keyArray: TK[]
) => {
   let selection: Pick<TObj, TK> = {} as any
   keyArray.forEach((key) => {
      if (key in obj) {
         selection[key] = obj[key]
      } else {
         console.error(`key ${key}, not in selected object`, new Error().stack)
      }
   })
   return selection
}
