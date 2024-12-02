import { access, bugs } from "@db/schema/schema";
import { db } from "@util/db";
import { eq, sql } from "drizzle-orm";
import type { NewUser } from "@db/types";

export const all = async () =>{
    const result = await db.select().from(bugs);
    return result;
}

export const get = async (id: number) =>{
    const result = await db.select().from(bugs).where(eq(bugs.id, id));
    return result;
}

export const update = async (id: number, data: any) =>{
    let result = await db.update(bugs).set(data).where(eq(bugs.id, id)).returning()
    return result;
}

export const insert = async (data: NewUser) =>{
    let result = await db.insert(bugs).values(data).returning()
    return result;
}

export const remove = async (id: number) =>{
    let result = await db.delete(bugs).where(eq(bugs.id, id)).returning()
    return result;
}