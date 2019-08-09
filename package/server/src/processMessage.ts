import { Share } from '@pixelpony/shared'

import { WsGift } from '../type'

export const processMessage = (share: Share): WsGift => {
   if (share.kind === 'ping') {
      let { payload } = share
      return {
         cast: 'uni',
         gift: {
            kind: 'pong',
            payload,
         },
      }
   }

   if (share.kind === 'chat' || share.kind === 'move') {
      return {
         cast: 'broad',
         gift: share,
      }
   }

   if (share.kind === 'registerPony') {
   }
}
