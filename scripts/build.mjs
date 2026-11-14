import { cpSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { guides } from '../guides.mjs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
for (const { name, type } of [{ name: 'hub', type: 'astro' }, ...guides]) {
  const source = name === 'hub' ? 'hub' : `guides/${name}`;
  const target = name === 'hub' ? 'dist' : `dist/${name}`;
  if (type === 'astro') {
    const result = spawnSync('bun', ['run', 'build'], { cwd: source, stdio: 'inherit' });
    if (result.error) throw result.error;
    if (result.status !== 0) process.exit(result.status ?? 1);
    cpSync(`${source}/dist`, target, { recursive: true });
  } else {
    // ponytail: static guides need copying, not a bundler.
    mkdirSync(target);
    for (const entry of readdirSync(source)) {
      if (/\.(html|css|js)$/.test(entry) || ['assets', 'licenses'].includes(entry)) {
        cpSync(`${source}/${entry}`, `${target}/${entry}`, { recursive: true });
      }
    }
  }
}
