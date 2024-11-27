import * as schema from "@/db/schema"
import { env } from "@/env.mjs"
import { neon, neonConfig } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

neonConfig.fetchConnectionCache = true

// const sql = neon(env.DATABASE_URL)
const sql = neon("postgres://neondb_owner:d8gMaHPQrF3q@ep-withered-sea-a4zlabsi-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require")

export const db = drizzle(sql, { schema })
