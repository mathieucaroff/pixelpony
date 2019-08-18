export interface RegistryProp {
   autoClean: boolean
   autoCleaningPeriod: number
   expirationPeriodMs: number
   totalCreates: number
}

export class Registry<TOwner = unknown, TContent = unknown> {
   prop: RegistryProp
   data: Record<
      string,
      {
         owner: TOwner
         content: TContent
         lastInteraction: number
      }
   >
   constructor(prop: Partial<RegistryProp> = {}) {
      this.prop = {
         autoClean: true,
         autoCleaningPeriod: 10, // Registry cleaned after 10 creates
         expirationPeriodMs: 5000,
         totalCreates: 0,
         ...prop,
      }
      this.data = {}
   }
   autoClean() {
      let { prop: p } = this
      if (p.autoClean && p.totalCreates % p.autoCleaningPeriod === 0) {
         this.clean()
      }
   }
   clean() {
      let { expirationPeriodMs } = this.prop
      let now = Date.now()
      Object.entries(this.data).forEach(([k, v]) => {
         if (now - v.lastInteraction > expirationPeriodMs) {
            delete this.data[k]
         }
      })
   }
   create(owner: TOwner, content: TContent): string {
      let token = this.token()
      this.data[token] = {
         owner,
         content,
         lastInteraction: Date.now(),
      }
      this.prop.totalCreates += 1
      this.autoClean()
      return token
   }
   delete(owner: TOwner, token: string) {
      let valid = this.validate(owner, token)
      if (valid.ok) {
         delete this.data[token]
      }
      return valid
   }
   read(token: string): TContent | null {
      let piece = this.data[token]
      if (piece) {
         piece.lastInteraction = Date.now()
         return piece.content
      } else {
         return null
      }
   }
   validate(owner: TOwner, token: string) {
      let piece = this.data[token]
      if (piece) {
         if (piece.owner === owner) {
            return { ok: true }
         } else {
            return { error: 'owner' }
         }
      } else {
         return { error: 'token' }
      }
   }
   token(): string {
      let token: string
      do {
         token = Math.random()
            .toString(16)
            .slice(2)
      } while (this.data[token])
      return token
   }
   update(owner: TOwner, token: string, content: TContent) {
      let valid = this.validate(owner, token)
      if (valid.ok) {
         this.data[token] = {
            owner,
            content,
            lastInteraction: Date.now(),
         }
      }
      return valid
   }
   size() {
      return Object.keys(this.data).length
   }
}
