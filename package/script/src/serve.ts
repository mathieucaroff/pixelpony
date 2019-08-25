import { server } from '@pixelpony/server'
import { pixelPonyClientConfig } from '@pixelpony/client'

import isRoot from 'is-root'

let app = server({
   client: pixelPonyClientConfig,
})

let { PORT } = process.env

if (PORT === undefined && isRoot()) {
   PORT = '80'
} else {
   PORT = '4000'
}

app.listen(PORT, () => {
   console.log(`🚀 Listening on port ${PORT} || http://localhost:${PORT}`)
})
