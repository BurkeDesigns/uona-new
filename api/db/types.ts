// db/types.ts
import type { InferSelectModel, InferInsertModel } from 'drizzle-orm';
import { users, access, pages } from './schema/schema';

// Type for a full row (select)
export type User = InferSelectModel<typeof users>;
// export type Tuition = InferSelectModel<typeof tuition>;
// export type Comment = InferSelectModel<typeof comments>;
export type Access = InferSelectModel<typeof access>;
export type Pages = InferSelectModel<typeof pages>;

// Type for inserting data (insert)
export type NewUser = InferInsertModel<typeof users>;
// export type NewTuition = InferInsertModel<typeof tuition>;
// export type NewComment = InferInsertModel<typeof comments>;
export type NewAccess = InferInsertModel<typeof access>;
export type NewPage = InferInsertModel<typeof pages>;
