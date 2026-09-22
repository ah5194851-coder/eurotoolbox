const DEFAULT_SITE_URL = 'https://eurotoolbox.ah5194851.workers.dev';

function trimSiteUrl(value: string) {
  return value.replace(/\/+$/, '');
}

const configuredSiteUrl = import.meta.env.VITE_SITE_URL;
export const SITE_URL = trimSiteUrl(configuredSiteUrl || DEFAULT_SITE_URL);
export const OG_IMAGE_URL = `${SITE_URL}/og-image.svg`;
