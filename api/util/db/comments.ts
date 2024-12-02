import { access, comments, users } from "@db/schema/schema";
import { db } from "@util/db";
import { eq, sql, desc } from "drizzle-orm";

export const all = async () =>{
    const result = await db.select().from(comments);
    return result;
}

export const get = async (id: number) =>{
    const result = await db.select().from(comments).where(eq(comments.id, id));
    return result;
}

export const update = async (id: number, data: any) =>{
    let result = await db.update(comments).set(data).where(eq(comments.id, id)).returning()
    return result;
}

export const insert = async (data: any) =>{
    let result = await db.insert(comments).values(data).returning()
    return result;
}

export const remove = async (id: number) =>{
    let result = await db.delete(comments).where(eq(comments.id, id)).returning()
    return result;
}

// ---

export const deleteByFileId = async (file_id: number) =>{
    let result = await db.delete(comments).where(eq(comments.file_id, file_id)).returning()
    return result;
}

export const getByFileId = async (file_id: number) =>{
    const result = await db
    .select({
      id: comments.id,
      file_id: comments.file_id,
      content: comments.content,
      created_on: comments.created_on,
      uid: users.id,
      first_name: users.first_name,
      last_name: users.last_name,
      image: users.image,
    })
    .from(comments)
    .innerJoin(users, eq(comments.uid, users.id))
    .where(eq(comments.file_id, file_id))
    .orderBy(desc(comments.created_on));
    return result;
}

export const getByUid = async (uid: number) =>{
    const result = await db.select().from(comments).where(eq(comments.uid, uid));
    return result;
}