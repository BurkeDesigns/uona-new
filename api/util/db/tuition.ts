import { tuition } from "@db/schema/schema";
import { db } from "@util/db";
import { eq, sql, desc } from "drizzle-orm";

export const all = async () =>{
    const result = await db.select().from(tuition);
    return result;
}

export const get = async (id: number) =>{
    const result = await db.select().from(tuition).where(eq(tuition.id, id));
    return result;
}

export const update = async (id: number, data: any) =>{
    let result = await db.update(tuition).set(data).where(eq(tuition.id, id)).returning()
    return result;
}

export const insert = async (data: any) =>{
    let result = await db.insert(tuition).values(data).returning()
    return result;
}

export const remove = async (id: number) =>{
    let result = await db.delete(tuition).where(eq(tuition.id, id)).returning()
    return result;
}

// ---

export const deleteByUid = async (uid: number) =>{
    let result = await db.delete(tuition).where(eq(tuition.uid, uid)).returning()
    return result;
}

export const getByUid = async (uid: number) =>{
    const result = await db.select().from(tuition).where(eq(tuition.uid, uid));
    return result;
}