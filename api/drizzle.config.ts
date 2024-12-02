import type { Config } from 'drizzle-kit';

export default {
  dialect:'sqlite',
  schema: './db/schema',
  out: './drizzle',
  dbCredentials: {
    url: './data/db/sqlite.db',
  },
} satisfies Config;