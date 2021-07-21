export function fixer(x: number): number {
  return Math.round(x * 1e8) / 1e8;
}

export function pround(x: number, precision: number): number {
  return fixer(Math.round(x / precision) * precision);
}

export function pfloor(x: number, precision: number): number {
  return fixer(Math.floor(x / precision) * precision);
}

export function pceil(x: number, precision: number): number {
  return fixer(Math.ceil(x / precision) * precision);
}
