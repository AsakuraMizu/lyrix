import { get, writable } from 'svelte/store';

export const fontSize = writable(20);
export const fontSizeX = writable(30);
export const semi = writable(4);

export interface Settings {
  fontSize: number;
  fontSizeX: number;
  semi: number;
}

export const fileName = 'settings.json';

export const ops = {
  async save(): Promise<void> {
    await window.api.fs.writeJSON<Settings>(fileName, {
      fontSize: get(fontSize),
      fontSizeX: get(fontSizeX),
      semi: get(semi),
    });
  },
  async load(): Promise<void> {
    const result = await window.api.fs.readJSON<Settings>(fileName);
    if (result) {
      fontSize.set(result.fontSize);
      fontSizeX.set(result.fontSizeX);
      semi.set(result.semi);
    }
  },
};
