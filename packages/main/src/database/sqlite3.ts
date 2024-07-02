import { app } from 'electron';
import path from 'node:path';
import fs from 'node:fs';
import process from 'node:process';
import { type Database, verbose } from 'sqlite3';

const TAG = '[sqlite3]';
let database: Database | null = null; // 使用一个变量来保存数据库连接

export function getSqlite3(
  filename = path.join(
    app.getPath('userData'),
    (import.meta.env.VITE_DB_FILENAME ?? 'Chinook.db') as string,
  ),
) {
  console.log(
    TAG,
    app.getPath('userData'),
    process.resourcesPath,
    __dirname,
    import.meta.env.DEV,
    import.meta.env.VITE_DB_FILENAME,
  );
  if (import.meta.env.DEV)
    filename = path.join(
      __dirname,
      ('../../../userData/' + (import.meta.env.VITE_DB_FILENAME ?? 'Chinook.db')) as string,
    );
  else
    filename = path.join(
      process.resourcesPath,
      ('../../../userData/' + (import.meta.env.VITE_DB_FILENAME ?? 'Chinook.db')) as string,
    );
  if (fs.existsSync(filename)) {
    console.log(TAG, 'file existed', filename);
  } else {
    console.log(TAG, 'no file', filename);
  }

  if (database) {
    console.log('existing', database, filename);
    // 如果已经存在数据库连接，直接返回现有连接
    return Promise.resolve(database);
  }

  return new Promise<Database>((resolve, reject) => {
    const db = new (verbose().Database)(filename, error => {
      if (error) {
        console.log(TAG, 'initialize failed :(');
        console.log(TAG, error);
        reject(error);
      } else {
        console.log(TAG, 'initialize success :)');
        console.log(TAG, filename);
        database = db; // 将数据库连接赋给变量
        resolve(db);
      }
    });
  });
}
