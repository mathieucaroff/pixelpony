import { Gift } from '@pixelpony/shared'

export type WsGift = WsGiftBroadcast | WsGiftUnicast | WsGiftNocast

export interface WsGiftBroadcast {
   cast: 'broad'
   gift: Gift
}

export interface WsGiftUnicast {
   cast: 'uni'
   gift: Gift
}

export interface WsGiftNocast {
   cast: 'no'
}
