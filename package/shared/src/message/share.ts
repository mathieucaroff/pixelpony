// Share:
// client -> server
import { Vec2D } from '../algebra'
import { Pony } from '../pony'

export type Share =
   | PingShare
   | ChatShare
   | GetPonyShare
   | MoveShare
   | RegisterPonyShare

export interface PingShare {
   kind: 'ping'
   payload: string
}

export interface ChatShare {
   kind: 'chat'
   ponyToken: string
   content: string
}

export interface GetPonyShare {
   kind: 'getPony'
   ponyToken: string
}

export interface MoveShare {
   kind: 'move'
   ponyToken: string
   pos: Vec2D
   speed: Vec2D
   time: string
}

export interface RegisterPonyShare {
   kind: 'registerPony'
   pony: Pony
}
