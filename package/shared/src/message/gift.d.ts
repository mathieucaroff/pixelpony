// Gift:
// server -> client
import { Pony } from '../pony'
import { ChatShare, MoveShare, Share } from './share'

export type Gift =
   | PongGift
   | ErrorGift
   | ChatGift
   | MoveGift
   | PonyGift
   | PonyTokenGift
export type GiftKind = Gift['kind']

export interface PongGift {
   kind: 'pong'
   payload: string
}

export interface ErrorGift {
   kind: 'error'
   context: {
      text?: string
      json?: unknown
      note?: string
      ponyToken?: string
      share?: Share
      validation?: unknown
   }
}

export type ChatGift = ChatShare

export type MoveGift = MoveShare

export interface PonyGift {
   kind: 'pony'
   pony: Pony
}

export interface PonyTokenGift {
   kind: 'ponyToken'
   ponyToken: string
}
