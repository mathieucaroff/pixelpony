import { Client } from '@pixelpony/shared'
import { default as webpackConfig } from '../webpack.config'

export const pixelPonyWebpackDevConfig = webpackConfig(null, {
   mode: 'development',
})[0]

export const pixelPonyClientConfig: Client = {
   location: __dirname,
   favicon: 'favicon.ico',
   htmlRoot: 'root.html',
   public: 'public/',
}
