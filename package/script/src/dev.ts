import { default as express } from 'express'
import { default as webpack } from 'webpack'

import { server } from '@pixelpony/server'
import {
   pixelPonyClientConfig,
   pixelPonyWebpackDevConfig,
} from '@pixelpony/client'

let common: Partial<webpack.Configuration> = {
   devtool: 'inline-source-map',
   mode: 'development',
   resolve: {
      extensions: ['.ts', '.js'],
   },
   module: {
      rules: [{ test: /\.tsx?$/, loader: 'ts-loader' }],
   },
}

const PORT = 3000

let app = express()

let webpackConfig = pixelPonyWebpackDevConfig
let compiler = webpack(webpackConfig)
app.use(new WebpackDevServer(compiler, webpackConfig.devServer))

let ewsapp = server({
   client: pixelPonyClientConfig,
})

ewsapp.listen(PORT, () => {
   console.log(`🚀 Listening on port ${PORT}`)
})
