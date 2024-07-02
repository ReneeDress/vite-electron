import { ipcRenderer } from 'electron';

const getDatabasePath = (args: any) => {
  return ipcRenderer.invoke('get-database-path', args);
};

const getTestData = (args: any) => {
  return ipcRenderer.invoke('get-test-data', args);
};

const getAllTables = (args: any) => {
  return ipcRenderer.invoke('get-all-tables', args);
};

const getTableData = (args: any) => {
  return ipcRenderer.invoke('get-table-data', args);
};

export default {
  getDatabasePath: getDatabasePath,
  getTestData: getTestData,
  getAllTables: getAllTables,
  getTableData: getTableData,
};
