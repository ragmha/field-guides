import { defineConfig } from 'astro/config';

const base = `${process.env.SITE_BASE ?? '/field-guides'}/github-security-operations`;

function projectLinks() {
  return (tree) => {
    function visit(node) {
      for (const key of ['href', 'src']) {
        const value = node.properties?.[key];
        if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') && !value.startsWith(`${base}/`)) {
          node.properties[key] = `${base}${value}`;
        }
      }
      node.children?.forEach(visit);
    }
    visit(tree);
  };
}

export default defineConfig({
  site: 'https://ragmha.github.io',
  base,
  markdown: { rehypePlugins: [projectLinks] },
});
