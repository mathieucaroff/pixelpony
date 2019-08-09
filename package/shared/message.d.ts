import { Vec2D } from './algebra'
import { Pony } from './pony'

export type Share =
   | PingShare
   | RegisterPonyShare
   | WithPonyToken & (MoveShare | ChatShare)
export type Gift = PongGift | ErrorGift | WithPonyToken & (MoveGift | ChatGift)

export interface PingShare {
   kind: 'ping'
   payload: string
}

export interface PongGift {
   kind: 'pong'
   payload: string
}

export interface ErrorGift {
   kind: 'error'
   context: {
      text?: string
      json?: unknown
   }
}

export interface MoveShare {
   kind: 'move'
   pos: Vec2D
   speed: Vec2D
   time: string
}
export type MoveGift = ChatGift

export interface ChatShare {
   kind: 'chat'
   content: string
}
export type ChatGift = ChatShare

export interface RegisterPonyShare {
   kind: 'registerPony'
   pony: Pony
}
