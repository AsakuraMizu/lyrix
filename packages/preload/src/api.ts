import path from 'path';
import fs from './fs';

export const api = {
  path,
  fs,
};

export type Api = Readonly<typeof api>;
