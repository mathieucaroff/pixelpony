import { RegisterComm } from './comm'
import { Autoreload } from './autoreload'
import { update } from './util/update'

export interface LoadParam {
   autoreload: Autoreload
   registerComm: RegisterComm
}

export const load = async (param: LoadParam) => {
   let { autoreload, registerComm } = param
   autoreload.on(registerComm.ws)
   let ponyComm = await registerComm.register()
   console.log(ponyComm)
   update(window as any).with({ ponyComm, w: window })
}
