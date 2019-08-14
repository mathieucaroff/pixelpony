/* eslint-disable @typescript-eslint/camelcase */
module.exports = {
   apps: [
      {
         name: 'pixelpony',
         script: 'package/script/dist/serve.js',

         // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
         args: '',
         instances: 1,
         autorestart: true,
         watch: false,
         max_memory_restart: '1G',
         env: {
            NODE_ENV: 'development',
            PORT: 4000,
         },
         env_production: {
            NODE_ENV: 'production',
            PORT: 80,
         },
      },
   ],

   deploy: {
      production: {
         'user': 'ubuntu',
         'host': '35.180.97.213',
         'ref': 'origin/develop',
         'repo': 'https://github.com/everycreature/pixelpony',
         'path': '/var/www/production',
         'post-deploy':
            'yarn install && yarn lerna bootstrap && yarn build:all && pm2 reload ecosystem.config.js --env production',
      },
   },
}
