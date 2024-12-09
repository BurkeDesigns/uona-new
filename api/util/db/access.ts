import { access } from "@db/schema/schema";
import type { Access, NewAccess } from "@db/types";
import { db } from "@util/db";
import { eq, sql, desc, and } from "drizzle-orm";

type GetProps = {
    id?: string
    type?: string
    uid?: string
}

export const all = async () =>{
    const result = await db.select().from(access);
    return result;
}

export const list = async (uid: number) =>{
    const result = await db.select().from(access).where(eq(access.uid, uid));
    return result;
}

export const get = async (data: GetProps) =>{
    if(data.id != null) return await db.select().from(access).where(eq(access.id, Number(data.id)));
    if(data.uid != null && data.type != null) return await db.select().from(access).where(and(
        eq(access.uid, Number(data.uid)),
        eq(access.type, data.type),
    ));
    if(data.uid != null) return await db.select().from(access).where(eq(access.uid, Number(data.uid)));
    if(data.type != null) return await db.select().from(access).where(eq(access.type, data.type));
    return null;
}

export const update = async (data: Access) =>{
    let result = await db.update(access).set(data).where(eq(access.id, data.id)).returning()
    return result;
}

export const insert = async (data: NewAccess) =>{
    let result = await db.insert(access).values(data).returning()
    return result;
}

export const remove = async (data: GetProps) =>{
    if(data.id != null) return await db.delete(access).where(eq(access.id, Number(data.id)));
    if(data.uid != null && data.type != null) return await db.delete(access).where(and(
        eq(access.uid, Number(data.uid)),
        eq(access.type, data.type),
    ));
    if(data.uid != null) return await db.delete(access).where(eq(access.uid, Number(data.uid)));
    if(data.type != null) return await db.delete(access).where(eq(access.type, data.type));
    return null;
}

// ---

// export const getAccess = async (id: number) =>{
//     const result = await db.select().from(access).where(eq(access.uid, id));
//     return result;
// }