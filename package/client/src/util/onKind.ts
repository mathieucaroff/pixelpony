import { createOn } from './on'

export interface Kindful {
   kind: string
}

type Filter<T, U> = T extends U ? T : never

export const createOnKind = <TData extends Kindful>() => {
   let on = createOn()

   let onKind = <TKind extends string>(name: TKind) => {
      let entry = on(name)
      return {
         do: (callback: (data: Filter<TData, { kind: TKind }>) => void) => {
            entry.do(callback)
         },
         remove: entry.remove,
         callbackList: entry.callbackList,
      }
   }
   let emit = (data: TData) => {
      on(data.kind).emit(data)
   }

   return { onKind, emit }
}
