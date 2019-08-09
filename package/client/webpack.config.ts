import { resolve } from 'path'
import * as webpack from 'webpack'
import {} from 'webpack-dev-server'
import { default as CopyPlugin } from 'copy-webpack-plugin'

export default (env, argv): webpack.Configuration[] => {
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

   let dist = resolve(__dirname, 'dist')

   return [
      {
         name: 'client',
         ...common,
         entry: './src/client.ts',
         output: {
            filename: 'public/pixelpony-client.js',
            path: dist,
         },
         devServer: {
            publicPath: '/dist/',
            watchContentBase: true,
            overlay: true,
            port: 9123,
         },
         plugins: [
            new webpack.DefinePlugin({
               DEBUG: JSON.stringify(argv.mode === 'development'),
            }),
            new CopyPlugin([
               {
                  context: __dirname,
                  from: 'src/root.html',
               },
               {
                  context: __dirname,
                  from: 'asset/favicon.ico',
               },
               // {
               //    context: __dirname,
               //    from: 'src/public',
               //    to: 'public',
               // },
            ]),
         ],
      },
      {
         name: 'config',
         ...common,
         entry: './src/config.ts',
         output: {
            filename: 'config.js',
            path: dist,
            libraryTarget: 'commonjs2',
         },
         node: {
            __filename: false,
            __dirname: false,
         },
         target: 'node',
         externals: [
            // https://webpack.js.org/configuration/externals/#externals
            // See ^ for documentation
            // https://github.com/liady/webpack-node-externals/blob/master/index.js
            // See ^ for other example of using a function for `externals`
            (context, request, callback) => {
               if (/[\\/]node_modules[\\/]/.test(context)) {
                  // We are bundling for node. Let's not bundle external
                  // dependencies, but just use commonjs-style include to get
                  // them.
                  return callback(null, `commonjs ${request}`)
               }
               console.log(`Bundling for node: ${context} ::${request}`)
               ;(callback as any)()
            },
         ],
      },
   ]
}
