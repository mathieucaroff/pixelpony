// JS
import { resolve } from 'path'

import { default as express } from 'express'
import { default as expressWs } from 'express-ws'
import { default as serveFavicon } from 'serve-favicon'

import { processMessage } from './processMessage'

// Types
import { Express } from 'express'
import { Client } from '@pixelpony/shared'
import { WsGift } from '../type'

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

   // Ws Routes
   ews.app.ws('/websocket', (ws, req) => {
      ws.on
      ws.onmessage = (event) => {
         let { data, type } = event
         console.log(event)
         if (type === 'message') {
            // ^ Maybe unecessary verification - idk ox

            let text = `${data}`

            let json: any
            let response: WsGift
            try {
               json = JSON.parse(text)
               response = processMessage(json)
            } catch (e) {
               let context = {
                  ...(json === undefined ? { text } : { json }),
               }
               response = {
                  cast: 'uni',
                  gift: {
                     kind: 'error',
                     context,
                  },
               }
            }
            if (response.cast === 'no') {
               return
            }

            let { cast, gift: downMessage } = response

            let caster = {
               uni: ws.send.bind(ws),
               broad: broadcast,
            }[cast]

            caster(JSON.stringify(downMessage))
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
