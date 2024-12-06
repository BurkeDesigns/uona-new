import { sql } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { timestamps } from "./column.helpers";

export const users = sqliteTable("users", {
    id: integer().primaryKey({ autoIncrement: true }),
    ...timestamps,
    last_login: text("last_login").default(sql`(CURRENT_TIMESTAMP)`),
    name: text().notNull(),
    email: text().notNull().unique(),
    phone: text(),
    image: text(),
    type: text().$type<"guest" | "student" | "staff" | "faculty" | "admin">(), // student, admin, staff
    group: text(), // the department (Example: IT)
    expires: text(),
    job_title: text(),
    notes: text(),
});

// create index name_project_idx for files.
// export const files = sqliteTable('files', {
//     id: integer('id').primaryKey({ autoIncrement: true }),
//     path: text('path'),
//     name: text('name'),
//     type: text('type'),
//     size: integer('size'),
//     group: text('group'),
//     description: text('description'),
//     created_by: integer('created_by').notNull().references(() => users.id),
//     created_on: text("created_on").default(sql`(CURRENT_TIMESTAMP)`),
//     last_updated: text("last_updated").default(sql`(CURRENT_TIMESTAMP)`),
// });

// export const tuition = sqliteTable('tuition', {
//     id: integer('id').primaryKey({ autoIncrement: true }),
//     uid: integer('uid').notNull().references(() => users.id), // Foreign key to users
//     amount: text('amount'),
//     created_on: text("created_on").default(sql`(CURRENT_TIMESTAMP)`),
// });

// export const comments = sqliteTable('comments', {
//     id: integer('id').primaryKey({ autoIncrement: true }),
//     uid: integer('uid').notNull().references(() => users.id), // Foreign key to users
//     content: text('content').notNull(),
//     created_on: text("created_on").default(sql`(CURRENT_TIMESTAMP)`),
// });

export const pages = sqliteTable('pages', {
    id: integer().primaryKey({ autoIncrement: true }),
    uid: integer().notNull().references(() => users.id), // Foreign key to users
    ...timestamps,
    status: text().default('draft'), // draft, published
    type: text().notNull(), // markdown-news-page
    slug: text().notNull().unique(),
    group: text(),
    tags: text({ mode: 'json' }),
    author: text().notNull(),
    title: text().notNull(),
    description: text().notNull(),
    blocks: text({ mode: 'json' }),
    expires: text(),
});

export const access = sqliteTable('access', {
    id: integer().primaryKey({ autoIncrement: true }),
    uid: integer().references(() => users.id),
    type: text(), // type of resource (project or file)
    resource_id: text(), // type of resource (project id or file id)
    access_level: text(), // access level (view, read, edit, or admin)
    ...timestamps,
    expires: text(),
});

// export const bugs = sqliteTable("bugs", {
//     id: integer("id").primaryKey({ autoIncrement: true }),
//     created_on: text("created_on").default(sql`(CURRENT_TIMESTAMP)`),
//     name: text('name').notNull().unique(),
//     description: text('description'),
//     enabled: text('enabled'),
//     type: text("type").default('bug'),
// });