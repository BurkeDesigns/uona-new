import { access } from "@db/schema/schema";
import type { Access, NewAccess } from "@db/types";
import { db } from "@util/db";
import { eq, sql, desc } from "drizzle-orm";

export const all = async () =>{
    const result = await db.select().from(access);
    return result;
}

export const list = async (uid: number) =>{
    const result = await db.select().from(access).where(eq(access.uid, uid));
    return result;
}

export const get = async (id: number) =>{
    const result = await db.select().from(access).where(eq(access.id, id));
    return result;
}

export const update = async (data: Access) =>{
    let result = await db.update(access).set(data).where(eq(access.id, data.id)).returning()
    return result;
}

export const insert = async (data: NewAccess) =>{
    let result = await db.insert(access).values(data).returning()
    return result;
}

export const remove = async (id: number) =>{
    let result = await db.delete(access).where(eq(access.id, id)).returning()
    return result;
}

// ---

// export const getAccess = async (id: number) =>{
//     const result = await db.select().from(access).where(eq(access.uid, id));
//     return result;
// }