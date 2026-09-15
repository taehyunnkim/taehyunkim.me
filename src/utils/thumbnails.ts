import { getImage } from 'astro:assets';
import type { ImageMetadata } from 'astro';

// Thumbnails live next to each project's content: src/content/projects/<id>/thumbnail.{jpg,jpeg,png,webp}
const thumbnails = import.meta.glob<{ default: ImageMetadata }>(
  '/src/content/projects/*/thumbnail.{jpg,jpeg,png,webp}',
  { eager: true }
);

/**
 * Resolves thumbnail path for a project
 * @param projectId - The project ID (folder name)
 * @param frontmatterThumbnail - Optional thumbnail URL from frontmatter
 * @param options - Output width and quality; defaults suit project cards
 * @returns Optimized thumbnail URL or undefined if no thumbnail found
 */
export async function resolveThumbnailPath(
  projectId: string,
  frontmatterThumbnail?: string,
  { width = 900, quality = 80 }: { width?: number; quality?: number } = {}
): Promise<string | undefined> {
  // Use frontmatter thumbnail if specified
  if (frontmatterThumbnail) {
    return frontmatterThumbnail;
  }

  const entry = Object.entries(thumbnails).find(([path]) =>
    path.startsWith(`/src/content/projects/${projectId}/thumbnail.`)
  );
  if (!entry) {
    return undefined;
  }

  const image = entry[1].default;
  const optimized = await getImage({ src: image, width: Math.min(width, image.width), quality, format: 'webp' });
  return optimized.src;
}
