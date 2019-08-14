// Type
import { ErrorGift, Pony } from '@pixelpony/shared'
import { ProcessMessage } from './processMessage'
import { Registry } from './registry'
import { Validate } from './validate'
import { WsGift } from '../type'

export interface HandleMessageParam {
   sender: unknown
   processMessage: ProcessMessage
   registry: Registry<unknown, Pony>
   validate: Validate
}

export let wsError = (context): WsGift => {
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
   let { sender, processMessage, registry, validate } = param

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
   try {
      response = processMessage(share, { sender, registry, wsError })
   } catch (e) {
      return wsError({ share })
   }
   return response
}
