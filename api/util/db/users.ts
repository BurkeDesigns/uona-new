import { access, users } from "@db/schema/schema";
import { db } from "@util/db";
import { eq, sql } from "drizzle-orm";
import type { NewUser } from "@db/types";

export const all = async () =>{
    const result = await db.select().from(users);
    return result;
}

export const get = async (id: number) =>{
    const result = await db.select().from(users).where(eq(users.id, id));
    return result;
}

export const update = async (id: number, data: any) =>{
    let result = await db.update(users).set(data).where(eq(users.id, id)).returning()
    return result;
}

export const insert = async (data: NewUser) =>{
    let result = await db.insert(users).values(data).returning()
    return result;
}

export const remove = async (id: number) =>{
    let result = await db.delete(users).where(eq(users.id, id)).returning()
    return result;
}

// ---

export const getByEmail = async (email: string) =>{
    const result = await db.select().from(users).where(eq(users.email, email));
    return result;
}

export const getAccess = async (id: number) =>{
    const result = await db.select().from(access).where(eq(access.uid, id));
    return result;
}