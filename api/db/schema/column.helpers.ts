import { sql } from "drizzle-orm";
import { text } from "drizzle-orm/sqlite-core";

export const timestamps = {
    updated_at: text(),
    created_at: text().default(sql`(CURRENT_TIMESTAMP)`).notNull(),
    deleted_at: text(),
}