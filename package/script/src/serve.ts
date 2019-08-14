import { server } from '@pixelpony/server'
import { pixelPonyClientConfig } from '@pixelpony/client'

let app = server({
   client: pixelPonyClientConfig,
})

let { PORT } = process.env

app.listen(PORT, () => {
   console.log(`🚀 Listening on port ${PORT}`)
})
