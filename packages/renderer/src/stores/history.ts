import { get, writable } from 'svelte/store';

export interface HistoryEntry {
  name: string;
  artist: string;
  provider: number;
  $ref: unknown;
  time: number;
}

export const entries = writable<HistoryEntry[]>([]);

export const fileName = 'history.json';

export const ops = {
  add(entry: HistoryEntry): void {
    entries.update(($entries) => {
      const idx = $entries.findIndex(
        (e) =>
          e.name === entry.name &&
          e.artist === entry.artist &&
          e.provider === entry.provider &&
          e.$ref === entry.$ref
      );
      const result = [...$entries];
      if (idx !== -1) {
        result.splice(idx, 1);
      }
      result.push(entry);
      return result;
    });
    this.save();
  },
  async save(): Promise<void> {
    await window.api.fs.writeJSON(
      fileName,
      get(entries)
        .sort((a, b) => a.time - b.time)
        .slice(0, 50)
    );
  },
  async load(): Promise<void> {
    const result = await window.api.fs.readJSON<HistoryEntry[]>(fileName);
    if (result) entries.set(result);
  },
};
