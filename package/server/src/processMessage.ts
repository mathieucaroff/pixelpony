// Type
import { Pony, Share, ErrorGift } from '@pixelpony/shared'
import { Registry } from './registry'
import { WsGift } from '../type'

export interface ProcessMessageParam {
   sender: unknown
   registry: Registry<unknown, Pony>
   wsError: (context: ErrorGift['context']) => WsGift
}

export type ProcessMessage = (
   share: Share,
   param: ProcessMessageParam,
) => WsGift

export const processMessage: ProcessMessage = (share, param) => {
   let { sender: owner, registry, wsError } = param
   if (share.kind === 'ping') {
      let { payload } = share
      return {
         cast: 'uni',
         gift: {
            kind: 'pong',
            payload,
         },
      }
   } else if (share.kind === 'chat' || share.kind === 'move') {
      return {
         cast: 'broad',
         gift: share,
      }
   } else if (share.kind === 'registerPony') {
      let ponyToken = registry.create(owner, share.pony)
      return {
         cast: 'uni',
         gift: {
            kind: 'ponyToken',
            ponyToken,
         },
      }
   } else if (share.kind === 'getPony') {
      let { ponyToken } = share
      let pony = registry.read(ponyToken)
      if (pony) {
         return {
            cast: 'uni',
            gift: {
               kind: 'pony',
               pony,
            },
         }
      } else {
         return wsError({
            ponyToken,
         })
      }
   } else {
      return wsError({
         share,
      })
   }
}
