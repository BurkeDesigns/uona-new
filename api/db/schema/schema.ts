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
export const files = sqliteTable('files', {
    id: integer('id').primaryKey({ autoIncrement: true }),
    ...timestamps,
    uid: integer().references(() => users.id), // Foreign key to users
    path: text('path'),
    name: text('name'),
    type: text('type'),
    size: integer('size'),
    group: text('group'),
    tags: text({ mode: 'json' }),
    description: text('description'),
    metadata: text({ mode: 'json' }),
    expires: text(),
    locked: integer().references(() => users.id), // locked to prevent deletion by a user
});

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
    status: text().default('draft'), // draft, published, archived
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
    type: text(), // type of resource (project, file, feature)
    resource_id: text(), // type of resource (project id or file id)
    access_level: text(), // access level (view, read, edit, or admin)
    ...timestamps,
    expires: text(),
});

export const forms = sqliteTable('forms', {
    id: integer().primaryKey({ autoIncrement: true }),
    uid: integer().references(() => users.id), // Foreign key to users
    ...timestamps,
    status: text().default('draft'), // e.g. draft, published, archived
    title: text().notNull(),
    description: text(), // optional
    type: text().default('form'), // optional: pdf, url, form
    groups: text({ mode: 'json' }), // string array: academics, admission, etc...
    images: text({ mode: 'json' }),
    fields: text({ mode: 'json' }), // store form fields configuration as JSON
    metadata: text({ mode: 'json' }),        // e.g., IP, user agent, geolocation
    settings: text({ mode: 'json' }), // additional config or metadata as JSON
    expires: text(), // optional expiration date/time
    version: integer().default(1),    // Version of the form
});

export const formResponses = sqliteTable('form_responses', {
    id: integer().primaryKey({ autoIncrement: true }),
    form: integer().notNull().references(() => forms.id), // Foreign key to forms
    uid: integer().references(() => users.id), // Optionally track which user responded
    ...timestamps,
    // Basic submission data
    data: text({ mode: 'json' }).notNull(),  // JSON with form field answers and file attachments
    metadata: text({ mode: 'json' }),        // e.g., IP, user agent, geolocation
    status: text().default('submitted'),     // e.g. submitted, reviewed, approved, archived, denied
    // Review workflow
    reviewer: integer().references(() => users.id), // If a user needs to review/approve
    notes: text(), // Notes for the review process
    // Form versioning
    version: integer().default(1),           // Version of the form the user submitted
  });

// export const bugs = sqliteTable("bugs", {
//     id: integer("id").primaryKey({ autoIncrement: true }),
//     created_on: text("created_on").default(sql`(CURRENT_TIMESTAMP)`),
//     name: text('name').notNull().unique(),
//     description: text('description'),
//     enabled: text('enabled'),
//     type: text("type").default('bug'),
// });