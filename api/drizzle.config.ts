import type { Config } from 'drizzle-kit';
import * as dotenv from 'dotenv';
dotenv.config();

export default {
  dialect:'sqlite',
  schema: './db/schema',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DATABASE_URL || './data/db/sqlite.db',
  },
} satisfies Config;