export let update = <TB, TA extends TB>(oA: TA) => {
   return {
      with: (oB: TB) => {
         Object.entries(oB).forEach(([k, v]) => {
            oA[k] = v
         })
      },
   }
}
