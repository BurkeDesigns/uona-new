import { access, pages, users, formResponses, forms } from "@db/schema/schema";
import { db } from "@util/db";
import { eq, sql, desc } from "drizzle-orm";
import type {FormResponses, NewFormResponse} from "@db/types"

type FormResponseColumns = 'id' | 'form' | 'uid' | 'status' | 'reviewer' | 'version';

export const all = async () =>{
    const result = await db.select().from(formResponses);
    return result;
}

export const get = async (id: number) =>{
    const result = await db.select().from(formResponses).where(eq(formResponses.id, id));
    return result;
}

export const getByColumn = async (column: FormResponseColumns, val: number) =>{
    const result = await db.select().from(formResponses).where(eq(formResponses[column], val));
    return result;
}

export const update = async (id: number, data: any) =>{
    let result = await db.update(formResponses).set(data).where(eq(formResponses.id, id)).returning()
    return result;
}

export const insert = async (data: NewFormResponse) =>{
    let result = await db.insert(formResponses).values(data).returning()
    return result;
}

export const remove = async (id: number) =>{
    let result = await db.delete(formResponses).where(eq(formResponses.id, id)).returning()
    return result;
}

// ---

export const allWithForm = async () =>{
    const result = await db
    .select({
      id: formResponses.id,
      title: forms.title,
      created_at: formResponses.created_at,
      data: formResponses.data,
      status: formResponses.status,
      reviewer: formResponses.reviewer,
    })
    .from(formResponses)
    .innerJoin(forms, eq(formResponses.form, forms.id))
    // .where(eq(formResponses.type, file_id))
    .orderBy(desc(formResponses.created_at));
    return result;
}