// Share:
// client -> server
import { Vec2D } from '../algebra'
import { Pony } from '../pony'

export type Share = PingShare | RegisterPonyShare | MoveShare | ChatShare

export interface PingShare {
   kind: 'ping'
   payload: string
}

export interface MoveShare {
   kind: 'move'
   ponyToken: string
   pos: Vec2D
   speed: Vec2D
   time: string
}

export interface ChatShare {
   kind: 'chat'
   ponyToken: string
   content: string
}

export interface RegisterPonyShare {
   kind: 'registerPony'
   pony: Pony
}
