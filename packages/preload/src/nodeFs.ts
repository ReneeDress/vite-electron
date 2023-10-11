// preload/index.ts
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

// Encapsulate types if you use typescript
interface UserData {
  prop: string
}

// Encapsulate all node.js api
// Everything you exported from preload/index.ts may be called in renderer
export function getUserData(jsonPath: string): Promise<UserData> {
  return readFile(resolve(__dirname, jsonPath), {encoding:'utf8'}).then(JSON.parse);
}