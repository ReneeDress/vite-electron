import { ipcMain } from 'electron';
import { getTestData, getAllTables, getTableData } from './apis/test';

ipcMain.handle('get-test-data', getTestData);
ipcMain.handle('get-all-tables', getAllTables);
ipcMain.handle('get-table-data', getTableData);
