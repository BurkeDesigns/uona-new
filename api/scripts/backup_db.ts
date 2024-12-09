import { $ } from "bun"
import { Glob } from "bun";
import { stat, unlink } from "fs/promises";

// export const db_source = Bun.env.DATABASE_URL || './data/db/sqlite.db';
export const db_source = Bun.env.DATABASE_URL;
const db_backup = '/home/wesley/Documents/Data/UoNA/Database/Backups';

export function scheduleTask(intervalMs: number, task:any) {
    setInterval(() => {
      task();
    }, intervalMs);
}

export const backupDatabase = async () => {
    const d = new Date();
    let backup_name = `uona_sqlite_backup_${d.toISOString()}`;
    await $`cp ${db_source} ${db_backup}/${backup_name}.db`;
    console.log(`UoNA DB Backup performed at ${new Date().toLocaleTimeString()}`);
    return {
      name: backup_name,
      created_at: d.toISOString(),
      file: `${db_backup}/${backup_name}.db`,
    }
}

export function formatFileSize(sizeInBytes: number) {
  const units = ["bytes", "KB", "MB", "GB", "TB"];
  let fileSize = sizeInBytes;
  let unitIndex = 0;

  while (fileSize >= 1000 && unitIndex < units.length - 1) {
    fileSize /= 1000;
    unitIndex++;
  }
  // Round
  const displayValue = Math.round(fileSize*10)/10;

  return `${displayValue} ${units[unitIndex]}`;
}

export async function listBackups(){
  const glob = new Glob("**/*.db");
  const files = [];

    try {
      // Scans the current working directory and each of its sub-directories recursively
      for await (const file of glob.scan(db_backup)) {
        try {
          // Retrieve file statistics
          const fileStats = await stat(`${db_backup}/${file}`);
          const isoTimestamp = new Date(fileStats.mtimeMs).toISOString();
          files.push({ name: file, mtimeMs: fileStats.mtimeMs, timestamp: isoTimestamp, size: formatFileSize(fileStats.size) });
        } catch (statError) {
          console.error(`Error retrieving stats for file "${file}":`, statError);
        }
      }
      // Sort files by modification time (oldest first)
      files.sort((a, b) => b.mtimeMs - a.mtimeMs);
    } catch (error:any){
      console.error(error);
    }
    return files;
}

export async function performBackupProcess(maxFiles: number) {

    await backupDatabase();

    const glob = new Glob("**/*.db");

    const files = [];

    try {
      // Scans the current working directory and each of its sub-directories recursively
      for await (const file of glob.scan(db_backup)) {
        console.log(file); // => "index.ts"
        try {
          // Retrieve file statistics
          const fileStats = await stat(`${db_backup}/${file}`);
          files.push({ path: file, mtimeMs: fileStats.mtimeMs });
        } catch (statError) {
          console.error(`Error retrieving stats for file "${file}":`, statError);
        }
      }
      console.log(files);
      console.log(`Total matched files: ${files.length}`);
  
      if (files.length <= maxFiles) {
        console.log(`There are ${files.length} file(s). No cleanup needed.`);
        return;
      }
  
      // Sort files by modification time (oldest first)
      files.sort((a, b) => a.mtimeMs - b.mtimeMs);
  
      // Determine how many files need to be deleted
      const filesToDelete = files.length - maxFiles;
      console.log(`Deleting the ${filesToDelete} oldest file(s)...`);
  
      // Array to hold promises for deletion operations
      const deletionPromises = [];
  
      for (let i = 0; i < filesToDelete; i++) {
        const filePath = `${db_backup}/${files[i].path}`;
        // Create a promise for each delete operation
        const deletePromise = unlink(filePath)
          .then(() => console.log(`Deleted: ${filePath}`))
          .catch((unlinkError) => console.error(`Failed to delete "${filePath}":`, unlinkError));
  
        deletionPromises.push(deletePromise);
      }
  
      // Await all deletion operations to complete
      await Promise.all(deletionPromises);
  
      console.log(`Cleanup complete. Retained the latest ${maxFiles} file(s).`);
    } catch (error) {
      console.error("An error occurred during the cleanup process:", error);
    }
}

// backupDatabase();

// Run a task every 24 hours
export const every24Hours = 24 * 60 * 60 * 1000;
export const everyHour = 60 * 60 * 1000;
export const everyMin = 60 * 1000;
export const everySecond = 1000;

export const maxFiles = 30;

scheduleTask(every24Hours, () => {
  performBackupProcess(maxFiles);
});
