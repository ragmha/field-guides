import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { spawnSync } from 'node:child_process';
import { guides } from '../guides.mjs';
import { copyOutput } from './copy-output.mjs';

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
const builtWorkspaces = new Set();
for (const guide of [{ name: 'hub', type: 'astro' }, ...guides]) {
  const { name, type } = guide;
  const source = name === 'hub' ? 'hub' : `guides/${guide.workspace ?? name}`;
  if (builtWorkspaces.has(source)) continue;
  builtWorkspaces.add(source);
  const target = name === 'hub' || guide.workspace ? 'dist' : `dist/${name}`;
  if (type === 'astro') {
    const result = spawnSync('bun', ['run', 'build'], { cwd: source, stdio: 'inherit' });
    if (result.error) throw result.error;
    if (result.status !== 0) process.exit(result.status ?? 1);
    if (guide.workspace) {
      for (const entry of guides.filter(entry => entry.workspace === guide.workspace)) {
        if (!existsSync(`${source}/dist/${entry.name}/index.html`)) {
          throw new Error(`Missing output for ${entry.name} in ${source}/dist`);
        }
      }
    }
    copyOutput(`${source}/dist`, target);
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
