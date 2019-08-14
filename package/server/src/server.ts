// JS
import { readFileSync } from 'fs'
import { resolve } from 'path'

import { default as express } from 'express'
import { default as expressWs } from 'express-ws'
import { default as serveFavicon } from 'serve-favicon'

import { getOnMessage } from './getOnMessage'

// Types
import { Express } from 'express'
import { Client, Pony } from '@pixelpony/shared'
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

   // Known ponies
   let registry = new Registry<unknown, Pony>()

   // Ws Routes
   ews.app.ws('/websocket', (ws, req) => {
      let { onmessage } = getOnMessage({ registry, ws, wss })

      ws.onmessage = (event) => {
         let { type } = event
         console.log(event)
         if (type === 'message') {
            // ^ Maybe unecessary verification - idk ox
            onmessage(event)
         } else {
            console.log('type !== "message" -- the verification is usefull')
         }
      }
   })

   // Static Routes
   app.get('/', (req, res) => {
      res.sendFile(htmlRootPath)
   })
   let favicon = readFileSync(faviconPath)
   app.get('/favicon', (req, res) => {
      res.send(favicon)
   })
   app.use(
      express.static(publicPath, {
         redirect: false,
      }),
   )

   return ews.app
}
