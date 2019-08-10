// JS
import Ajv from 'ajv'
import { readFileSync } from 'fs'
import { location, jsonSchema } from '@pixelpony/shared'

// Type
import { Share } from '@pixelpony/shared'

let ajv = new Ajv()

let schemaToValidator = <T>(schema: () => object | boolean) => {
   let vf: Ajv.ValidateFunction | undefined
   let validator = (input: unknown) => {
      if (!vf) {
         vf = ajv.compile(schema)
      }
      let ok = vf(input) as boolean
      let data = input as T
      return ok ? { data } : { errors: vf.errors }
   }
   return validator
}

let schemaReader = (name: string) => () => {
   return JSON.parse(
      readFileSync(`${location}/${jsonSchema}/${name}.json`, 'utf-8'),
   )
}

export const validate = {
   Share: schemaToValidator<Share>(schemaReader('Share')),
}
