import { server } from '@pixelpony/server'
import { pixelPonyClientConfig } from '@pixelpony/client'

let app = server({
   client: pixelPonyClientConfig,
})

const PORT = 4000

app.listen(PORT, () => {
   console.log(`🚀 Listening on port ${PORT}`)
})
