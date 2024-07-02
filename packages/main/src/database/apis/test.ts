import type { Database } from 'sqlite3';
import { getSqlite3 } from '../sqlite3';

const asyncDb: Promise<Database> = getSqlite3();

const getTestData = async (_event: any, args: any) => {
    console.log(args);
    // console.log(asyncDb);
    return { msg: 'this is the return msg' };
};

const getAllTables = async (_event: any, args: any) => {
    console.log('getAllTables', args);
    const db = await asyncDb;

    try {
        const results = await new Promise((resolve, reject) => {
            db.all("SELECT * FROM sqlite_master WHERE type='table';", (err, tables) => {
                // console.log('tables', tables)
                if (err) {
                    console.error('Error querying tables: ' + err.message);
                    reject(err);  // 返回一个带有错误的 Promise
                } else {
                    resolve(tables.map((t: any) => t.name));
                }
            });
            // db.all("SELECT * FROM Employee;", (err, res) => {
            //     console.log('Employee', res)
            //     if (err) {
            //         console.error("Error querying tables: " + err.message);
            //         reject(err);  // 返回一个带有错误的 Promise
            //     } else {
            //         resolve(res.map((i: any) => i));
            //     }
            // });
        });

        return results;
    } catch (e) {
        console.error(e);
        return [];
    }
};

const getTableData = async (_event: any, args: any) => {
    console.log('getTableData', args);
    const { tablename } = args;
    const db = await asyncDb;

    try {
        const results = await new Promise((resolve, reject) => {
            db.all(`SELECT * FROM ${tablename};`, (err, res) => {
                console.log('Employee', res);
                if (err) {
                    console.error('Error querying tables: ' + err.message);
                    reject(err);  // 返回一个带有错误的 Promise
                } else {
                    resolve(res.map((i: any) => i));
                }
            });
        });
        return results;
    } catch (e) {
        console.error(e);
        return [];
    }
};


export {
    getTestData,
    getAllTables,
    getTableData,
};