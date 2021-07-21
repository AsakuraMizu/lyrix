import path from 'path';
import { pathExists, readJSON, writeJSON } from 'fs-extra';

const root = process.cwd();

const fs = {
  async readJSON<T>(name: string): Promise<T | undefined> {
    const file = path.join(root, name);
    if (await pathExists(file)) {
      return readJSON(file);
    }
  },
  async writeJSON<T>(name: string, object: T): Promise<void> {
    const file = path.join(root, name);
    await writeJSON(file, object);
  },
};

export default fs;
