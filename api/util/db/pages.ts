import { access, pages, users } from "@db/schema/schema";
import { db } from "@util/db";
import { eq, sql, desc } from "drizzle-orm";

export const all = async () =>{
    const result = await db.select().from(pages);
    return result;
}

export const get = async (id: number) =>{
    const result = await db.select().from(pages).where(eq(pages.id, id));
    return result;
}

export const getBySlug = async (slug: string) =>{
    const result = await db.select().from(pages).where(eq(pages.slug, slug));
    return result;
}

export const update = async (id: number, data: any) =>{
    let result = await db.update(pages).set(data).where(eq(pages.id, id)).returning()
    return result;
}

export const insert = async (data: any) =>{
    let result = await db.insert(pages).values(data).returning()
    return result;
}

export const remove = async (id: number) =>{
    let result = await db.delete(pages).where(eq(pages.id, id)).returning()
    return result;
}

// ---

export const getByUid = async (uid: number) =>{
    const result = await db.select().from(pages).where(eq(pages.uid, uid));
    return result;
}