const DEFAULT_SITE_URL = 'https://loveeasytool.com';

function trimSiteUrl(value: string) {
  return value.replace(/\/+$/, '');
}

const configuredSiteUrl = import.meta.env.VITE_SITE_URL;
export const SITE_URL = trimSiteUrl(configuredSiteUrl || DEFAULT_SITE_URL);
export const OG_IMAGE_URL = `${SITE_URL}/og-image.png`;
export const OG_IMAGE_WIDTH = '1200';
export const OG_IMAGE_HEIGHT = '630';
export const OG_IMAGE_ALT = 'LoveEasyTool - Free Online Tools, No Sign-Up, Files Stay Private';
