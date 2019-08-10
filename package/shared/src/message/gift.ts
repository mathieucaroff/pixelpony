// Gift:
// server -> client
import { ChatShare, MoveShare } from './share'

export type Gift = PongGift | ErrorGift | MoveGift | ChatGift | PonyTokenGift
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
      validation?: unknown
   }
}

export type MoveGift = MoveShare

export type ChatGift = ChatShare

export interface PonyTokenGift {
   kind: 'ponyToken'
   ponyToken: string
}
