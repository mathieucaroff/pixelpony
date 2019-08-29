import isRoot from 'is-root'

import { server } from '@pixelpony/server'
import { pixelPonyClientConfig } from '@pixelpony/client'

let app = server({
   client: pixelPonyClientConfig,
})

let { PORT = isRoot() ? '80' : '4000' } = process.env

app.listen(PORT, () => {
   console.log(`🚀 Listening on port ${PORT} || http://localhost:${PORT}`)
})
