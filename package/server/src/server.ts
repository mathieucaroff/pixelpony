// JS
import { resolve } from 'path'

import { default as express } from 'express'
import { default as expressWs } from 'express-ws'
import { default as serveFavicon } from 'serve-favicon'

import { processMessage } from './processMessage'
import { validate } from './validate'

// Types
import { Express } from 'express'
import { Client, ErrorGift, Pony } from '@pixelpony/shared'
import { WsGift } from '../type'
import { handleMessage } from './handleMessage'
import { Registry } from './registry'

export interface ServerParam {
   client: Client
   app?: Express
}

export type Server = (param: ServerParam) => expressWs.Application

export const server: Server = (param) => {
   let { client, app } = param
   app = app || express()

   let { location } = client
   let faviconPath = resolve(location, client.favicon)
   let htmlRootPath = resolve(location, client.htmlRoot)
   let publicPath = resolve(location, client.public)

   let ews = expressWs(app)
   let wss = ews.getWss()
   // let { app } = ews

   // Favicon
   app.use(
      serveFavicon(faviconPath, {
         redirect: false,
      }),
   )

   let broadcast = (txt) => {
      wss.clients.forEach((ws) => {
         ws.send(txt)
      })
   }

   // Known ponies
   let registry = new Registry<Pony>()

   // Ws Routes
   ews.app.ws('/websocket', (ws, req) => {
      let castingMethod = {
         uni: ws.send.bind(ws),
         broad: broadcast,
      }

      ws.onmessage = (event) => {
         let { data, type } = event
         console.log(event)

         if (type === 'message') {
            // ^ Maybe unecessary verification - idk ox

            let text = `${data}`

            let response: WsGift = handleMessage(text, {
               processMessage,
               registry,
            })
            // -- //
            if (response.cast !== 'no') {
               let { cast, gift: downMessage } = response

               let caster = castingMethod[cast]

               caster(JSON.stringify(downMessage))
            }
         } else {
            console.log('type !== "message"')
         }
      }
   })

   // Static Routes
   app.get('/', (req, res) => {
      res.sendFile(htmlRootPath)
   })
   app.get('/favicon', (req, res) => {
      res.sendFile(faviconPath)
   })
   app.use(
      express.static(publicPath, {
         redirect: false,
      }),
   )

   return ews.app
}
