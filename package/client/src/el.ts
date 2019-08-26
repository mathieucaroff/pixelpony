export interface ElProp {
   document: Document
}

export const createEl = (prop: ElProp) => {
   let { document: d } = prop
   return <K extends keyof HTMLElementTagNameMap>(
      name: K,
      attribute: Record<string, string> = {},
      children: Element[] = [],
   ) => {
      let elem = d.createElement<K>(name as K)
      Object.entries(attribute).forEach(([name, value]) => {
         if (elem[name] !== undefined) {
            elem[name] = value
         } else {
            elem.setAttribute(name, value)
         }
      })
      children.forEach((child) => {
         elem.appendChild(child)
      })
      return elem
   }
}

export type El = ReturnType<typeof createEl>
