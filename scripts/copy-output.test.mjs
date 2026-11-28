import { test, expect } from 'bun:test';
import { mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { copyOutput } from './copy-output.mjs';

test('merges directories without replacing existing output', () => {
  const root = `scripts/.copy-output-test-${process.pid}`;
  try {
    mkdirSync(`${root}/source/_astro`, { recursive: true });
    mkdirSync(`${root}/target/_astro`, { recursive: true });
    writeFileSync(`${root}/source/_astro/new.css`, 'new');
    writeFileSync(`${root}/target/_astro/old.css`, 'old');
    copyOutput(`${root}/source`, `${root}/target`);
    expect(readFileSync(`${root}/target/_astro/new.css`, 'utf8')).toBe('new');
    rmSync(`${root}/source/_astro/new.css`);
    writeFileSync(`${root}/source/_astro/old.css`, 'overwrite');
    expect(() => copyOutput(`${root}/source`, `${root}/target`)).toThrow();
    expect(readFileSync(`${root}/target/_astro/old.css`, 'utf8')).toBe('old');
  } finally {
    rmSync(root, { recursive: true, force: true });
  }
});
