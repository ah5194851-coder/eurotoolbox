/**
 * PHP Vulnerability Checker - Shared Core Logic
 * Evaluates passive headers and version comparisons against the October 21, 2026 emergency security releases.
 * Reference: CVE-2026-109618, CVE-2026-109619 (CVSS v4.0 9.2 unauthenticated RCE).
 */

export interface FixedVersionConfig {
  minimumPatched: string;
  isEol: boolean;
  notes: string;
}

export const FIXED_VERSIONS: Record<string, FixedVersionConfig> = {
  '8.3': {
    minimumPatched: '8.3.13',
    isEol: false,
    notes: 'PHP 8.3 active branch. Emergency patch released on October 21, 2026.',
  },
  '8.2': {
    minimumPatched: '8.2.25',
    isEol: false,
    notes: 'PHP 8.2 active security branch. Emergency patch released on October 21, 2026.',
  },
  '8.1': {
    minimumPatched: '8.1.30',
    isEol: false,
    notes: 'PHP 8.1 security-fix branch. Emergency patch released on October 21, 2026.',
  },
  '8.0': {
    minimumPatched: 'None (End of Life)',
    isEol: true,
    notes: 'PHP 8.0 reached End of Life and did not receive official upstream security patches.',
  },
  '7.4': {
    minimumPatched: 'None (End of Life)',
    isEol: true,
    notes: 'PHP 7.4 reached End of Life in November 2022 and does not receive official security patches.',
  },
};

export type CheckResultState =
  | 'possibly_affected'
  | 'php_detected_version_hidden'
  | 'no_indicators';

export interface CheckResponseData {
  url: string;
  finalUrl: string;
  status: number;
  state: CheckResultState;
  stateLabel: string;
  summary: string;
  detectedVersion?: string;
  branch?: string;
  minimumFixedVersion?: string;
  indicators: string[];
  headers: {
    xPoweredBy: string | null;
    server: string | null;
    setCookie: string | null;
  };
  metaGenerator: string | null;
  hasPhpLinks: boolean;
  redirectsCount: number;
}

/**
 * SSRF Protection: Checks whether a given hostname or IP address is private,
 * loopback, link-local, cloud-metadata, or invalid.
 */
export function isBlockedHost(hostname: string): boolean {
  const host = hostname.toLowerCase().trim();

  // 1. Common blocked hostnames
  if (
    host === 'localhost' ||
    host === '0.0.0.0' ||
    host === '::1' ||
    host === 'metadata.google.internal' ||
    host === 'instance-data' ||
    host.endsWith('.local') ||
    host.endsWith('.internal') ||
    host.endsWith('.localhost') ||
    host.endsWith('.lan') ||
    host.endsWith('.home') ||
    host.endsWith('.corp')
  ) {
    return true;
  }

  // 2. Check decimal IPv4 address (e.g. 127.0.0.1)
  const ipv4Match = host.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
  if (ipv4Match) {
    const a = parseInt(ipv4Match[1], 10);
    const b = parseInt(ipv4Match[2], 10);
    const c = parseInt(ipv4Match[3], 10);
    const d = parseInt(ipv4Match[4], 10);

    if (a > 255 || b > 255 || c > 255 || d > 255) return true;

    // Loopback 127.0.0.0/8
    if (a === 127) return true;
    // Current network 0.0.0.0/8
    if (a === 0) return true;
    // Private RFC 1918 (10.0.0.0/8)
    if (a === 10) return true;
    // Private RFC 1918 (172.16.0.0/12)
    if (a === 172 && b >= 16 && b <= 31) return true;
    // Private RFC 1918 (192.168.0.0/16)
    if (a === 192 && b === 168) return true;
    // Link-local / Cloud metadata (169.254.0.0/16)
    if (a === 169 && b === 254) return true;
    // Carrier-grade NAT (100.64.0.0/10)
    if (a === 100 && b >= 64 && b <= 127) return true;
    // Multicast & Reserved (224.0.0.0/4 and above)
    if (a >= 224) return true;
  }

  // 3. Check raw 32-bit integer IPs (e.g., 2130706433 = 127.0.0.1)
  if (/^\d+$/.test(host)) {
    return true;
  }

  // 4. IPv6 loopback / link-local / unique-local
  if (
    host.startsWith('fe80:') ||
    host.startsWith('fc00:') ||
    host.startsWith('fd00:') ||
    host.includes('::ffff:')
  ) {
    return true;
  }

  return false;
}

/**
 * Compares a semantic version (e.g. "8.2.14") against a minimum target (e.g. "8.2.25").
 * Returns true if candidate is strictly older than target.
 */
export function isVersionOlder(candidate: string, target: string): boolean {
  const cParts = candidate.split(/[-+~]/)[0].split('.').map(n => parseInt(n, 10) || 0);
  const tParts = target.split(/[-+~]/)[0].split('.').map(n => parseInt(n, 10) || 0);

  for (let i = 0; i < Math.max(cParts.length, tParts.length); i++) {
    const c = cParts[i] ?? 0;
    const t = tParts[i] ?? 0;
    if (c < t) return true;
    if (c > t) return false;
  }
  return false;
}

/**
 * Analyzes passive indicators collected from HTTP response headers and body snippet.
 */
export function analyzePhpIndicators(params: {
  url: string;
  finalUrl: string;
  status: number;
  xPoweredBy: string | null;
  server: string | null;
  setCookie: string | null;
  bodySnippet: string;
  redirectsCount: number;
}): CheckResponseData {
  const { url, finalUrl, status, xPoweredBy, server, setCookie, bodySnippet, redirectsCount } = params;

  const indicators: string[] = [];
  let detectedVersion: string | undefined;

  // 1. Inspect X-Powered-By
  if (xPoweredBy) {
    indicators.push(`X-Powered-By header: "${xPoweredBy}"`);
    const match = xPoweredBy.match(/PHP\/([0-9]+(?:\.[0-9]+)+(?:-[a-zA-Z0-9.+~]+)?)/i);
    if (match) {
      detectedVersion = match[1];
    }
  }

  // 2. Inspect Server header
  if (server) {
    const sMatch = server.match(/(?:PHP|mod_php)\/([0-9]+(?:\.[0-9]+)+(?:-[a-zA-Z0-9.+~]+)?)/i);
    if (sMatch) {
      indicators.push(`Server header module: "${sMatch[0]}"`);
      if (!detectedVersion) {
        detectedVersion = sMatch[1];
      }
    } else if (/php/i.test(server)) {
      indicators.push(`Server header mentions PHP: "${server}"`);
    }
  }

  // 3. Inspect Set-Cookie header for PHPSESSID
  if (setCookie && /phpsessid/i.test(setCookie)) {
    indicators.push('Session cookie: PHPSESSID detected in Set-Cookie header');
  }

  // 4. Inspect Meta Generator tag in HTML snippet
  let metaGenerator: string | null = null;
  const genMatch = bodySnippet.match(/<meta[^>]+name=["']generator["'][^>]+content=["']([^"']+)["']/i) ||
                   bodySnippet.match(/<meta[^>]+content=["']([^"']+)["'][^>]+name=["']generator["']/i);
  if (genMatch) {
    metaGenerator = genMatch[1].trim();
    if (/wordpress|drupal|joomla|magento|prestashop|phpbb|typo3/i.test(metaGenerator)) {
      indicators.push(`Meta generator: "${metaGenerator}" (PHP-powered CMS)`);
    }
  }

  // 5. Inspect .php internal links or form actions
  const hasPhpLinks = /href=["'][^"']*\.php(?:[?#][^"']*)?["']/i.test(bodySnippet) ||
                      /action=["'][^"']*\.php(?:[?#][^"']*)?["']/i.test(bodySnippet);
  if (hasPhpLinks) {
    indicators.push('Page markup contains links or form actions referencing .php endpoints');
  }

  // Determine state
  if (detectedVersion) {
    const cleanVer = detectedVersion.split('-')[0];
    const branchMatch = cleanVer.match(/^(\d+\.\d+)/);
    const branch = branchMatch ? branchMatch[1] : cleanVer;
    const config = FIXED_VERSIONS[branch];

    let isOlder = false;
    let minFixed = 'Unknown';

    if (config) {
      minFixed = config.minimumPatched;
      if (config.isEol) {
        isOlder = true;
      } else {
        isOlder = isVersionOlder(cleanVer, config.minimumPatched);
      }
    } else {
      // If version is older than 8.1 (e.g. 7.x, 5.x)
      const major = parseInt(cleanVer.split('.')[0], 10);
      if (major < 8) {
        isOlder = true;
        minFixed = 'Upstream branch is EOL. Upgrade to PHP 8.1.30, 8.2.25, or 8.3.13';
      }
    }

    if (isOlder) {
      return {
        url,
        finalUrl,
        status,
        state: 'possibly_affected',
        stateLabel: 'Possibly affected',
        summary: `The server publicly reports PHP version ${detectedVersion}, which is older than the October 21, 2026 emergency security patch (${minFixed}).`,
        detectedVersion,
        branch,
        minimumFixedVersion: minFixed,
        indicators,
        headers: { xPoweredBy, server, setCookie },
        metaGenerator,
        hasPhpLinks,
        redirectsCount,
      };
    }

    return {
      url,
      finalUrl,
      status,
      state: 'php_detected_version_hidden',
      stateLabel: 'PHP detected, version hidden — ask your host to confirm',
      summary: `Detected PHP version signature (${detectedVersion}) appears consistent with or newer than published patch baselines, but passive checks cannot verify compiled internal binary patches. Ask your host or run "php -v" to confirm.`,
      detectedVersion,
      branch,
      minimumFixedVersion: minFixed,
      indicators,
      headers: { xPoweredBy, server, setCookie },
      metaGenerator,
      hasPhpLinks,
      redirectsCount,
    };
  }

  if (indicators.length > 0) {
    return {
      url,
      finalUrl,
      status,
      state: 'php_detected_version_hidden',
      stateLabel: 'PHP detected, version hidden — ask your host to confirm',
      summary: 'Passive indicators confirm this site runs on a PHP-based environment (e.g. via session cookies, CMS generator tags, or server module headers), but the exact PHP version string is suppressed. Ask your host or run "php -v" via SSH to inspect the active binary.',
      indicators,
      headers: { xPoweredBy, server, setCookie },
      metaGenerator,
      hasPhpLinks,
      redirectsCount,
    };
  }

  return {
    url,
    finalUrl,
    status,
    state: 'no_indicators',
    stateLabel: 'No PHP indicators found — this does not guarantee the site is unaffected',
    summary: 'No public headers, session cookies, or page markup exposed PHP signatures. The server might run another technology stack, or may run PHP with hardened headers (expose_php = Off). Only your hosting provider can confirm the true underlying server software.',
    indicators: ['No X-Powered-By PHP header present', 'No PHPSESSID cookie received', 'No PHP CMS meta tags detected'],
    headers: { xPoweredBy, server, setCookie },
    metaGenerator,
    hasPhpLinks: false,
    redirectsCount,
  };
}
