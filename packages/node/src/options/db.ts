import { homedir } from "node:os";

export interface IDBOptions {
  dbDir: string;
  dbFile: string;
  namespace: string;
}

export const defaultDBOptions = {
  dbDir: `${homedir()}/.safehodl/db/`,
  dbFile: "mempool-db",
  namespace: "userops",
};
