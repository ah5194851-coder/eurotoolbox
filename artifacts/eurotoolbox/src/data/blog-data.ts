export interface BlogFaqItem {
  question: string;
  answer: string;
}

export interface BlogArticleMeta {
  slug: string;
  canonicalPath: string;
  title: string;
  metaDescription: string;
  keywords: string;
  datePublished: string;
  dateModified: string;
  author: string;
  faq: BlogFaqItem[];
}

export const BLOG_ARTICLES: Record<string, BlogArticleMeta> = {
  'how-to-check-php-version-and-update': {
    slug: 'how-to-check-php-version-and-update',
    canonicalPath: '/blog/how-to-check-php-version-and-update',
    title: 'How to Check Your PHP Version and Update Safely (After the October 2026 Vulnerabilities)',
    metaDescription: 'Step-by-step tutorial on checking your active PHP version via CLI, phpinfo, hosting dashboard, and WordPress, followed by safe upgrade protocols for the October 2026 RCE vulnerabilities.',
    keywords: 'how to check php version, update php safely, CVE-2026-109618, CVE-2026-109619, php security update, wordpress php update, php remote code execution',
    datePublished: '2026-10-23',
    dateModified: '2026-10-23',
    author: 'Ali Hassan',
    faq: [
      {
        question: 'How do I check what PHP version my website is actually executing?',
        answer: 'You can check your active PHP version using several methods: run "php -v" in your server command line, upload a temporary "phpinfo.php" script containing "<?php phpinfo(); ?>", check the PHP Selector section in your hosting cPanel or Plesk dashboard, or navigate to Tools > Site Health > Info > Server in WordPress.'
      },
      {
        question: 'Why did October 21, 2026 PHP updates require emergency patching?',
        answer: 'The PHP development team released emergency updates addressing two critical vulnerabilities (CVE-2026-109618 and CVE-2026-109619) with a CVSS v4.0 severity rating of 9.2. These bugs allow unauthenticated remote attackers to trigger arbitrary code execution on vulnerable web servers without requiring credentials or administrative access.'
      },
      {
        question: 'Can updating PHP break my existing WordPress, Drupal, or Joomla site?',
        answer: 'Upgrading between minor maintenance releases within the same release series (for example, updating from an unpatched 8.3.x build to the patched 8.3 point release) carries virtually zero breaking changes. Moving across major versions (e.g., PHP 7.4 or 8.0 to 8.3) may introduce deprecations if outdated plugins or themes are installed. Always create a full database and filesystem backup before updating.'
      },
      {
        question: 'What should I do if my hosting provider has not yet made the patched PHP version available?',
        answer: 'If your host has not deployed the patched binary, place your web application behind a managed Web Application Firewall (WAF) with updated virtual patches, isolate your server by disabling direct CGI/FastCGI exposure, temporarily restrict admin endpoints by IP address, or activate maintenance mode for public forms.'
      },
      {
        question: 'Why were government websites taken offline following the October 21 disclosure?',
        answer: 'Because CVE-2026-109618 and CVE-2026-109619 permit unauthenticated remote code execution with a CVSS score of 9.2, several national security agencies and digital ministries took non-critical public portals offline as a protective isolation measure while system administrators verified and compiled emergency patches across internal server fleets.'
      }
    ]
  },
  'is-my-website-affected-by-php-vulnerability': {
    slug: 'is-my-website-affected-by-php-vulnerability',
    canonicalPath: '/blog/is-my-website-affected-by-php-vulnerability',
    title: 'Is My Website Affected by the PHP Vulnerabilities? Quick Checklist',
    metaDescription: 'Fast security checklist to verify whether your website, CMS, or server is vulnerable to the October 21, 2026 PHP emergency security flaws (CVE-2026-109618 and CVE-2026-109619).',
    keywords: 'is my website affected php, php vulnerability checklist, CVE-2026-109618 check, CVE-2026-109619 audit, php security risk, remote code execution php 2026',
    datePublished: '2026-10-23',
    dateModified: '2026-10-23',
    author: 'Ali Hassan',
    faq: [
      {
        question: 'What websites are most at risk from CVE-2026-109618 and CVE-2026-109619?',
        answer: 'Websites running unpatched PHP binaries on publicly accessible internet servers—especially environments using PHP-FPM, Apache mod_php, or CGI handlers without WAF inspection—are directly vulnerable to unauthenticated remote code execution attempts.'
      },
      {
        question: 'Does running WordPress automatically mean my website is vulnerable?',
        answer: 'WordPress itself is an application layer, but it relies completely on the PHP interpreter installed on the underlying server. If your host runs an unpatched PHP version, your WordPress site inherits the vulnerability regardless of what security plugins you use.'
      },
      {
        question: 'How can I confirm my hosting provider has patched my server?',
        answer: 'Inspect your active PHP build timestamp and release version via phpinfo() or your hosting control panel. Patched versions were tagged and released on October 21, 2026. Check your host support portal or changelog for explicit verification of the CVE-2026-109618 and CVE-2026-109619 mitigation.'
      },
      {
        question: 'What immediate triage steps should I take if my server is vulnerable?',
        answer: 'Immediately enable Cloudflare or an edge Web Application Firewall with emergency rule sets, enforce IP whitelisting on administrative directories, place sensitive transaction portals into temporary maintenance mode, and schedule an immediate package upgrade to the patched PHP binary.'
      },
      {
        question: 'Where can I read the official security advisories from the PHP project?',
        answer: 'Official security announcements, changelogs, and source tarballs are published directly on the official PHP website at https://www.php.net.'
      }
    ]
  }
};
