export const createOnEntry = () => {
   let callbackList: ((data) => void)[] = []

   let entry = {
      do: (callback: (data) => void) => {
         callbackList.push(callback)
      },
      emit: (data) => {
         callbackList.forEach((callback) => {
            callback(data)
         })
      },
      remove: (callback: (data) => void) => {
         callbackList.splice(
            0,
            callbackList.length,
            ...callbackList.filter((f) => {
               return f !== callback
            }),
         )
      },
      callbackList,
   }
   return entry
}

export type OnEntry = ReturnType<typeof createOnEntry>

export const createOn = () => {
   let register: Record<string, OnEntry> = {}

   let on = (name: string) => {
      let entry = register[name]
      if (entry === undefined) {
         entry = createOnEntry()
         register[name] = entry
      }
      return entry
   }

   return on
}
