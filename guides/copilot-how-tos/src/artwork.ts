import type { GuideDefinition } from './manifest';

const artworkUrls = import.meta.glob('./assets/*', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export function artworkUrl(guide: GuideDefinition) {
  const key = `./${guide.artwork.src.replace(/^src\//, '')}`;
  const url = artworkUrls[key];
  if (!url) throw new Error(`Missing artwork asset for ${guide.slug}: ${guide.artwork.src}`);
  return url;
}
