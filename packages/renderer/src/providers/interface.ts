export interface Entry {
  name: string;
  artist: string;
  $ref: unknown;
}

export interface Provider {
  name: string;
  search(keyword: string): AsyncGenerator<Entry>;
  getLrc($ref: unknown): Promise<string>;
}
