import { resolve, sep } from 'node:path';
import { realpath } from 'node:fs/promises';

const root = resolve('dist');
const prefix = '/field-guides/';
const server = Bun.serve({
  hostname: '127.0.0.1',
  port: Number(process.env.PORT || 4173),
  async fetch(request) {
    const url = new URL(request.url);
    if (url.pathname === '/field-guides') return Response.redirect(`${url.origin}${prefix}`, 301);
    if (!url.pathname.startsWith(prefix)) return new Response('Not found', { status: 404 });
    let path;
    try {
      path = decodeURIComponent(url.pathname.slice(prefix.length));
    } catch {
      return new Response('Invalid path', { status: 400 });
    }
    let file = resolve(root, path);
    if (url.pathname.endsWith('/')) file = resolve(file, 'index.html');
    if (!file.startsWith(root + sep)) return new Response('Forbidden', { status: 403 });
    try {
      const actual = await realpath(file);
      if (!actual.startsWith(root + sep)) return new Response('Forbidden', { status: 403 });
      const content = Bun.file(actual);
      if (!(await content.exists())) return new Response('Not found', { status: 404 });
      return new Response(content);
    } catch (error) {
      if (error.code === 'ENOENT' || error.code === 'ENOTDIR') return new Response('Not found', { status: 404 });
      console.error(error);
      return new Response('Unable to read file', { status: 500 });
    }
  },
});
console.log(`Preview: http://${server.hostname}:${server.port}${prefix}`);
