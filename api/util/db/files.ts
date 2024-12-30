import { files } from "@db/schema/schema";
import { db } from "@util/db";
import { eq, sql, desc, isNull } from "drizzle-orm";

type FileColumns = 'id' | 'uid' | 'path' | 'name' | 'type' | 'size' | 'group' | 'tags' | 'description' | 'metadata' | 'expires' | 'locked';

export const all = async () =>{
    const result = await db.select().from(files);
    return result;
}

export const get = async (id: number) =>{
    const result = await db.select().from(files).where(eq(files.id, id));
    return result;
}

export const getByColumn = async (column: FileColumns, val: number) =>{
    const result = await db.select().from(files).where(eq(files[column], val));
    return result;
}

export const update = async (id: number, data: any) =>{
    let result = await db.update(files).set(data).where(eq(files.id, id)).returning()
    return result;
}

export const insert = async (data: any) =>{
    let result = await db.insert(files).values(data).returning()
    return result;
}

export const remove = async (id: number) =>{
    let result = await db.delete(files).where(eq(files.id, id)).returning()
    return result;
}

// --- projects

export const getGroupFiles = async (group: string) =>{
    const result = await db.select().from(files).where(eq(files.group, group)).orderBy(desc(files.created_at));;
    return result;
}

// export const getRecentProjectFiles = async (project_id: number, limit: number) =>{
//     const result = await db.select().from(files).where(eq(files.project_id, project_id)).orderBy(desc(files.created_at)).limit(limit || 3);
//     return result;
// }

// export const getProjectFile = async (project_id: number, name: string) =>{
//     const result = await db.select().from(files).where(sql`${files.project_id} = ${project_id} and ${files.name} = ${name}`).limit(1);
//     return result;
// }

export const deleteGroupFiles = async (group: number, name: string) =>{
    let result = await db.delete(files).where(sql`${files.group} = ${group} and ${files.name} = ${name}`).returning()
    return result;
}

export const getTotalSizeByGroupId = async (group: string) => {
    const result = await db
      .select({
        totalSize: sql`SUM(${files.size})`,
      })
      .from(files)
      .where(eq(files.group, group));
  
    // Handle case when no files are found (result might return an empty array)
    return result[0]?.totalSize || 0;
};
// export const getTotalSizeByUid = async (uid: number) => {
//     const result = await db
//     .select({
//         totalSize: sql`SUM(${files.size})`,
//       })
//     .from(files)
//     .innerJoin(projects, eq(files.project_id, projects.id))
//     .where(sql`${projects.created_by} = ${uid}`);

//     return result[0]?.totalSize || 0;
// };

// export const filesWithoutDescriptions = async () =>{
//     const result = await db.select().from(files).where(isNull(files.description)).orderBy(desc(files.created_on));
//     return result;
// }

// export const getAccess = async (id: number) =>{
//     const result = await db.select().from(access).where(eq(access.uid, id));
//     return result;
// }