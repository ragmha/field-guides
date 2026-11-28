import { defineConfig } from 'astro/config';

const base = `${process.env.SITE_BASE ?? '/field-guides'}/copilot-customization-governance-guide`;

function projectLinks() {
  return (tree) => {
    function visit(node) {
      for (const key of ['href', 'src']) {
        const value = node.properties?.[key];
        if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//') && !value.startsWith('/field-guides/')) {
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
