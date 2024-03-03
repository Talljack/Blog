import * as dotenv from 'dotenv'
import type { Config } from 'drizzle-kit'
dotenv.config()

const config: Config = {
  driver: 'mysql2',
  schema: './db/schema.ts',
  out: './db/migrations',
  dbCredentials: { uri: process.env.DATABASE_URL || '' },
}

export default config