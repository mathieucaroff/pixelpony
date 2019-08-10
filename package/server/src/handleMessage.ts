// JS
import { validate } from './validate'

// Type
import { ErrorGift, Pony } from '@pixelpony/shared'
import { ProcessMessage } from './processMessage'
import { Registry } from './registry'
import { WsGift } from '../type'

export interface HandleMessageParam {
   processMessage: ProcessMessage
   registry: Registry<Pony>
}

let wsError = (context): WsGift => {
   return {
      cast: 'uni',
      gift: {
         kind: 'error',
         context,
      },
   }
}

export const handleMessage = (
   text: string,
   param: HandleMessageParam,
): WsGift => {
   let { processMessage, registry } = param

   let json: any
   let response: WsGift
   let valid: ReturnType<typeof validate.Share> | undefined
   let context: ErrorGift['context']
   try {
      json = JSON.parse(text)
   } catch (e) {
      return wsError({ text })
   }

   valid = validate.Share(json)
   if (!valid.data) {
      return wsError({ json, validation: valid.errors })
   }
   let share = valid.data
   let owner = 'everycreature'
   try {
      response = processMessage(share, { owner, registry, wsError })
   } catch (e) {
      return wsError({ share })
   }
   return response
}
