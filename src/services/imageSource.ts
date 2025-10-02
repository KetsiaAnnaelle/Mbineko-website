import { S3Client, GetObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

export type ImageSourceMode = 'local' | 's3';

const defaultLocalImages = [
  // Exact required assets (note the space in folder name)
  '/assets/image Foret/forest1.webp',
  '/assets/image Foret/forest2.webp',
  '/assets/image Foret/forest3.webp',
  '/assets/image Foret/forest4.webp',
  // Fallbacks without space or different names present in repo
  '/assets/imageForet/forest5.jfif',
  '/assets/imageForet/forest6.jfif',
  '/assets/imageForet/forest-apad-1.jpg',
  '/assets/imageForet/forest-apad-2.jpg',
  '/assets/imageForet/forest-apad-3.jpg',
  // '/assets/img/forest2.jpg',
  // '/assets/img/forets1.jpg',
  // '/assets/img/ODD9.jpg',
];

function getMode(): ImageSourceMode {
  const mode = (import.meta as any).env?.VITE_IMAGE_SOURCE as ImageSourceMode | undefined;
  return mode === 's3' ? 's3' : 'local';
}

function getLocalImages(): string[] {
  // URL-encode to safely handle spaces in folder names
  return defaultLocalImages.map((p) => encodeURI(p));
}

function createS3Client(): S3Client {
  return new S3Client({
    region: (import.meta as any).env?.VITE_AWS_REGION,
    credentials: (import.meta as any).env?.VITE_AWS_ACCESS_KEY_ID
      ? {
          accessKeyId: (import.meta as any).env?.VITE_AWS_ACCESS_KEY_ID,
          secretAccessKey: (import.meta as any).env?.VITE_AWS_SECRET_ACCESS_KEY,
        }
      : undefined,
  });
}

export async function getForestImageUrls(keysOrPaths?: string[]): Promise<string[]> {
  const mode = getMode();
  if (mode === 'local') {
    return keysOrPaths && keysOrPaths.length ? keysOrPaths : getLocalImages();
  }

  // S3 mode
  const bucket = (import.meta as any).env?.VITE_S3_BUCKET as string | undefined;
  const base = (import.meta as any).env?.VITE_S3_PUBLIC_BASE_URL as string | undefined;
  const keys = keysOrPaths && keysOrPaths.length ? keysOrPaths : [];

  if (!bucket && !base) {
    // No S3 configured: return mock S3 URLs to ease future swap
    const mockBase = (import.meta as any).env?.VITE_MOCK_S3_BASE || 'https://example-bucket.s3.region.amazonaws.com/mock-folder';
    const mocks = (keysOrPaths && keysOrPaths.length ? keysOrPaths : ['panorama-1.jpg','panorama-2.jpg','panorama-3.jpg']).map((k) => `${mockBase}/${k}`);
    return mocks;
  }

  if (base) {
    // Public base URL style
    return keys.map(k => `${base.replace(/\/$/, '')}/${k.replace(/^\//, '')}`);
  }

  // Presign URLs using AWS SDK if keys provided
  if (bucket && keys.length) {
    const s3 = createS3Client();
    const signed = await Promise.all(
      keys.map(async (Key) => {
        const cmd = new GetObjectCommand({ Bucket: bucket, Key });
        return await getSignedUrl(s3, cmd, { expiresIn: 3600 });
      })
    );
    return signed;
  }

  // As a last resort, return local
  return getLocalImages();
}

async function preload(url: string): Promise<boolean> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => resolve(true);
    img.onerror = () => resolve(false);
    img.src = url;
  });
}

export async function getAvailableForestImages(keysOrPaths?: string[]): Promise<string[]> {
  const candidates = await getForestImageUrls(keysOrPaths);
  const results = await Promise.all(candidates.map((u) => preload(u)));
  const valid = candidates.filter((_, i) => results[i]);
  // Ensure at least some output; if none valid, return original candidates (to surface error gracefully)
  return valid.length ? valid : candidates;
}
