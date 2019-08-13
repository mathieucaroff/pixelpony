// JS
import Ajv from 'ajv'
import { readFileSync } from 'fs'
import { location, jsonSchema } from '@pixelpony/shared'

// Type
import { Share } from '@pixelpony/shared'

let ajv = new Ajv()

let schemaToValidator = <T>(schema: () => object | boolean) => {
   let validFunc: Ajv.ValidateFunction | undefined
   let validator = (input: unknown) => {
      if (!validFunc) {
         validFunc = ajv.compile(schema)
      }
      let ok = validFunc(input) as boolean
      let data = input as T
      return ok ? { data } : { errors: validFunc.errors }
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

export type Validate = typeof validate
