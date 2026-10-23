import { useEffect } from 'react';
import { Link } from 'wouter';
import { Shell } from './App';
import { updateDocumentHead } from './seo';
import { AdSlot } from './components/ad-slot';
import { BLOG_ARTICLES } from './data/blog-data';
import { 
  ShieldAlert, 
  Terminal, 
  Server, 
  FileCode, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  ExternalLink,
  BookOpen,
  Calendar,
  User,
  HelpCircle,
  Clock,
  Layers,
  HardDrive
} from 'lucide-react';

export default function BlogPhpCheckUpdate() {
  const meta = BLOG_ARTICLES['how-to-check-php-version-and-update'];

  useEffect(() => {
    updateDocumentHead(meta.canonicalPath);
  }, [meta.canonicalPath]);

  return (
    <Shell>
      <main className="bg-background">
        {/* Article Header & Breadcrumbs */}
        <section className="paper-grid border-b border-border bg-card/60 py-12 lg:py-16">
          <div className="mx-auto max-w-[900px] px-5 lg:px-8">
            <nav className="flex items-center gap-2 font-mono-ui text-xs text-muted-foreground" aria-label="Breadcrumb">
              <Link href="/" className="hover:text-primary transition">Home</Link>
              <span>/</span>
              <span className="text-foreground">Security Advisory</span>
              <span>/</span>
              <span className="text-primary truncate">PHP Security Update Guide</span>
            </nav>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-destructive/10 px-3 py-1 font-mono-ui text-xs font-bold uppercase tracking-wider text-destructive">
                <ShieldAlert size={14} /> Security Advisory · CVSS 9.2
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Calendar size={13} /> Published: October 23, 2026
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Clock size={13} /> 8 min read
              </span>
              <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <User size={13} /> By {meta.author}
              </span>
            </div>

            <h1 className="mt-4 font-display text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl lg:leading-[1.15]">
              {meta.title}
            </h1>

            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              On October 21, 2026, the official PHP development team released coordinated emergency security updates to mitigate two critical vulnerabilities—cataloged as <strong>CVE-2026-109618</strong> and <strong>CVE-2026-109619</strong>. Carrying a near-maximum <strong>CVSS v4.0 score of 9.2</strong>, these flaws enable unauthenticated remote attackers to execute arbitrary system code on vulnerable servers without requiring login credentials.
            </p>

            <div className="mt-6 flex flex-wrap gap-4 rounded-xl border border-border bg-background/80 p-4 text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <strong className="text-foreground">Companion Guide:</strong>
                <Link href="/blog/is-my-website-affected-by-php-vulnerability" className="inline-flex items-center gap-1 font-semibold text-primary underline hover:text-primary/80">
                  Is My Website Affected? Quick Audit Checklist <ArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Article Body */}
        <article className="mx-auto max-w-[900px] px-5 py-12 lg:px-8">
          {/* Ad Slot #1: After Intro */}
          <AdSlot id="ad-after-intro-php-update" />

          {/* Section: The Vulnerability Context */}
          <section className="prose prose-neutral dark:prose-invert max-w-none">
            <h2 className="flex items-center gap-2 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              <AlertTriangle className="text-destructive" size={24} />
              Understanding the October 21, 2026 Emergency Disclosure
            </h2>
            <p className="mt-4 text-base leading-7 text-muted-foreground">
              The global web infrastructure runs overwhelmingly on PHP—powering over 75% of content management systems including WordPress, Drupal, Joomla, and Magento (Adobe Commerce). When an unauthenticated Remote Code Execution (RCE) flaw strikes the core interpreter, the blast radius is instantaneous.
            </p>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Following the disclosure of <strong>CVE-2026-109618</strong> and <strong>CVE-2026-109619</strong> on October 21, several national cybersecurity authorities and government digital departments across Europe, North America, and Asia took public-facing portals offline as a protective isolation shield while server fleets were audited and patched. Because the vulnerability allows threat actors to craft malicious HTTP request headers or parameter payloads that corrupt interpreter memory buffers before authentication layers execute, proactive patching is mandatory for every webmaster and system administrator.
            </p>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Official patches and release notes are published directly at the{' '}
              <a 
                href="https://www.php.net" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-flex items-center gap-1 font-semibold text-primary underline hover:text-primary/80"
              >
                official PHP website (php.net) <ExternalLink size={13} />
              </a>. Below is your comprehensive technical walkthrough to identify your current version, apply official updates safely, and isolate servers if upstream binaries are delayed.
            </p>
          </section>

          {/* Section 1: How to Check Your PHP Version */}
          <section className="mt-12 border-t border-border pt-10">
            <h2 className="flex items-center gap-2.5 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              <Terminal className="text-primary" size={24} />
              Part 1: Four Methods to Check Your Active PHP Version
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Never assume the PHP version displayed in your hosting billing receipt matches what your web server executes. Use one of these four verified inspection methods to confirm your running runtime.
            </p>

            <div className="mt-8 space-y-6">
              {/* Method A: CLI */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Method A: Command Line Interface (CLI) via SSH
                  </h3>
                  <span className="rounded bg-primary/10 px-2 py-0.5 font-mono-ui text-xs font-semibold text-primary">VPS & Dedicated</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Connect to your virtual or dedicated machine via SSH and run the CLI version command:
                </p>
                <div className="mt-3 rounded-lg bg-zinc-950 p-4 font-mono text-sm text-emerald-400">
                  $ php -v
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  <strong>Important Caution:</strong> On servers running PHP-FPM or multiple installed PHP engines, the CLI executable might differ from the FastCGI process serving web traffic. To verify the active FPM socket version, inspect your system services: <code>systemctl status php*-fpm</code> or check your Nginx/Apache VirtualHost configuration.
                </p>
              </div>

              {/* Method B: phpinfo script */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Method B: Creating a Temporary <code>phpinfo()</code> File
                  </h3>
                  <span className="rounded bg-secondary/80 px-2 py-0.5 font-mono-ui text-xs font-semibold text-secondary-foreground">Shared Hosting</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  If you do not possess SSH terminal access, create a test script in your document root (e.g. <code>public_html/test-php-info.php</code>):
                </p>
                <div className="mt-3 rounded-lg bg-zinc-950 p-4 font-mono text-sm text-emerald-400">
                  &lt;?php phpinfo(); ?&gt;
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                  Open <code>https://yourdomain.com/test-php-info.php</code> in your browser. Inspect the large banner at the very top: it details the exact version number, build date, and loaded security modules. <strong className="text-destructive">Critical Security Warning:</strong> Delete this file immediately after checking. Leaving a public <code>phpinfo()</code> file exposes your server environment, internal file paths, and environment variables to malicious crawlers.
                </p>
              </div>

              {/* Method C: Hosting Dashboard */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Method C: Hosting Control Panel (cPanel, Plesk, Cloudways)
                  </h3>
                  <span className="rounded bg-accent/20 px-2 py-0.5 font-mono-ui text-xs font-semibold text-accent">Control Panel</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  Most modern commercial hosting environments provide a visual PHP configuration tool:
                </p>
                <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
                  <li><strong>cPanel:</strong> Navigate to the <em>Software</em> section &rarr; click <strong>Select PHP Version</strong> or <strong>MultiPHP Manager</strong>. Review the version assigned to your domain.</li>
                  <li><strong>Plesk:</strong> Open <em>Websites &amp; Domains</em> &rarr; click <strong>PHP Settings</strong> beside the selected domain.</li>
                  <li><strong>SiteGround / Hostinger / Cloudways:</strong> Access the <em>Site Tools</em> or <em>Application Settings</em> tab and locate the <strong>PHP Version Switcher</strong>.</li>
                </ul>
              </div>

              {/* Method D: WordPress Site Health */}
              <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    Method D: WordPress Native Site Health Tool
                  </h3>
                  <span className="rounded bg-primary/10 px-2 py-0.5 font-mono-ui text-xs font-semibold text-primary">WordPress Users</span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">
                  If you manage a WordPress site, you can view the active web server PHP build directly from the admin dashboard without writing any code:
                </p>
                <ol className="mt-3 list-decimal space-y-1.5 pl-5 text-sm text-muted-foreground">
                  <li>Log in to your WordPress administration dashboard (<code>/wp-admin</code>).</li>
                  <li>In the left sidebar, click <strong>Tools</strong> &rarr; <strong>Site Health</strong>.</li>
                  <li>Click on the <strong>Info</strong> tab at the top.</li>
                  <li>Expand the <strong>Server</strong> dropdown menu.</li>
                  <li>Read the <strong>PHP version</strong> row. This reports the exact runtime binary handling live visitors.</li>
                </ol>
              </div>
            </div>
          </section>

          {/* Section 2: How to Update Safely */}
          <section className="mt-12 border-t border-border pt-10">
            <h2 className="flex items-center gap-2.5 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              <Server className="text-primary" size={24} />
              Part 2: Step-by-Step Safe Upgrade Procedures
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              Updating your runtime must follow a defensive staging protocol. Jumping versions blindly without checking database and extension dependencies risks application downtime.
            </p>

            {/* Checklist */}
            <div className="mt-6 rounded-xl border border-border bg-muted/20 p-5">
              <h3 className="font-display text-base font-bold text-foreground">
                The Mandatory Pre-Update Safety Checklist
              </h3>
              <div className="mt-3 grid gap-3 sm:grid-cols-2 text-sm text-muted-foreground">
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Full Database Backup:</strong> Export your SQL database (via mysqldump or phpMyAdmin).</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Filesystem Snapshot:</strong> Archive all source files, themes, and uploaded media.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Extension Audit:</strong> Confirm active extensions (e.g. <code>curl</code>, <code>mbstring</code>, <code>gd</code>, <code>sodium</code>, <code>intl</code>) remain enabled after upgrade.</span>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
                  <span><strong>Staging Validation:</strong> Test mission-critical user checkout, login, and webhook flows on a staging clone first.</span>
                </div>
              </div>
            </div>

            {/* Sub-section: Shared Hosting */}
            <div className="mt-8">
              <h3 className="font-display text-xl font-bold text-foreground">
                A. Upgrading on Shared or Managed Cloud Hosting
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                In managed environments, the underlying server software is maintained by the hosting provider. Your responsibility is switching your site to use the patched release profile:
              </p>
              <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm text-muted-foreground">
                <li>Log in to your hosting account control panel.</li>
                <li>Locate the <strong>MultiPHP Manager</strong>, <strong>PHP Selector</strong>, or <strong>PHP Version Settings</strong>.</li>
                <li>Select the newest patched maintenance build within your active branch (e.g. latest 8.3 or 8.2 point release containing the October 21 security patch).</li>
                <li>Click <strong>Apply</strong> or <strong>Save</strong>.</li>
                <li>Clear all caching plugins, Redis/Memcached object caches, and CDN edge caches (Cloudflare, Fastly).</li>
                <li>Browse your frontend in an Incognito window to confirm stylesheets, forms, and shopping carts operate normally.</li>
              </ol>
            </div>

            {/* Sub-section: VPS & Dedicated */}
            <div className="mt-8">
              <h3 className="font-display text-xl font-bold text-foreground">
                B. Upgrading on a VPS, Cloud Instance, or Dedicated Server
              </h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                If you run an unmanaged Ubuntu, Debian, or RHEL/Rocky Linux instance, upgrade the packages via your OS package manager:
              </p>

              <div className="mt-4 space-y-4">
                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="font-mono-ui text-xs font-bold text-primary">Ubuntu & Debian (apt)</p>
                  <pre className="mt-2 overflow-x-auto rounded bg-zinc-950 p-3 font-mono text-xs text-emerald-400">
{`# 1. Update repository metadata
sudo apt update

# 2. Upgrade PHP core packages and FPM
sudo apt install --only-upgrade php php-fpm php-cli php-common

# 3. Restart PHP-FPM service (adjust for your active version, e.g. php8.3-fpm)
sudo systemctl restart php8.3-fpm

# 4. Gracefully reload your web server
sudo systemctl reload nginx
# or: sudo systemctl reload apache2`}
                  </pre>
                </div>

                <div className="rounded-lg border border-border bg-card p-4">
                  <p className="font-mono-ui text-xs font-bold text-primary">RHEL, CentOS, Rocky Linux & AlmaLinux (dnf / yum)</p>
                  <pre className="mt-2 overflow-x-auto rounded bg-zinc-950 p-3 font-mono text-xs text-emerald-400">
{`# 1. Check for upstream security packages from Remi repository
sudo dnf check-update

# 2. Upgrade PHP binaries
sudo dnf upgrade php php-fpm php-cli

# 3. Restart PHP-FPM and reload web daemon
sudo systemctl restart php-fpm
sudo systemctl reload nginx`}
                  </pre>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: CMS Specific Notes */}
          <section className="mt-12 border-t border-border pt-10">
            <h2 className="flex items-center gap-2.5 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              <FileCode className="text-primary" size={24} />
              Part 3: CMS Considerations (WordPress, Drupal, Joomla, Magento)
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-display text-base font-bold text-foreground">WordPress Ecosystem</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  WordPress core natively supports PHP 8.1, 8.2, and 8.3. When updating between minor security builds (e.g., from an unpatched 8.2.x build to the patched 8.2.y build), no theme or plugin incompatibilities occur. If you are upgrading from outdated PHP 7.4 or 8.0, run the <em>PHP Compatibility Checker</em> plugin first to ensure your active plugins do not invoke deprecated syntax.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-display text-base font-bold text-foreground">Drupal (10 & 11)</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Drupal 10 and 11 require modern PHP (PHP 8.2+ recommended). After updating the server binary, rebuild Drupal caches via Drush (<code>drush cr</code>) to invalidate compiled container classes and verify Twig template generation.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-display text-base font-bold text-foreground">Joomla! (4 & 5)</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Joomla 5 fully supports PHP 8.2 and 8.3. Verify third-party extensions in the Extensions Manager prior to major version switches, and check that the MySQLi or PDO MySQL drivers remain cleanly linked.
                </p>
              </div>

              <div className="rounded-xl border border-border bg-card p-5">
                <h3 className="font-display text-base font-bold text-foreground">Magento / Adobe Commerce</h3>
                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                  Magento is notoriously sensitive to PHP version boundaries (e.g. Magento 2.4.6 requires specific PHP 8.1 or 8.2 patch levels). Upgrading point security releases within the certified branch is safe, but always recompile code (<code>bin/magento setup:di:compile</code>) and clear varnish caches.
                </p>
              </div>
            </div>
          </section>

          {/* Section 4: What to do if you cannot update immediately */}
          <section className="mt-12 border-t border-border pt-10">
            <h2 className="flex items-center gap-2.5 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              <HardDrive className="text-destructive" size={24} />
              Part 4: Emergency Mitigation If You Cannot Update Immediately
            </h2>
            <p className="mt-3 text-base leading-7 text-muted-foreground">
              If your host has not yet mirrored the official October 21 packages, or if legacy software prevents an instant version bump, apply these emergency mitigation controls immediately:
            </p>

            <div className="mt-6 space-y-4">
              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/20 p-4">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <ShieldAlert size={20} />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">1. Deploy Managed WAF Virtual Patching</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Route DNS through a Web Application Firewall (Cloudflare, AWS WAF, Sucuri, Fastly). Cloudflare and enterprise WAF vendors push managed rules to inspect incoming HTTP payloads and drop exploit signatures targeted at CVE-2026-109618 and CVE-2026-109619 at the network edge before traffic reaches your origin server.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/20 p-4">
                <div className="rounded-lg bg-primary/10 p-2 text-primary">
                  <Layers size={20} />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">2. Restrict Administration Routes via IP Whitelisting</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Block public access to <code>/wp-admin</code>, <code>/administrator</code>, <code>/user/login</code>, or custom portal paths using <code>.htaccess</code> or Nginx location blocks. Allowing only designated office or VPN IP addresses limits attacker reconnaissance opportunities.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3 rounded-xl border border-border bg-muted/20 p-4">
                <div className="rounded-lg bg-destructive/10 p-2 text-destructive">
                  <AlertTriangle size={20} />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">3. Temporary Maintenance Mode for Critical Endpoints</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    If threat intelligence shows active exploitation in your industry sector and no WAF is available, consider placing sensitive transactional pages in maintenance mode until your hosting provider deploys the October 21 upstream patches. This mirrors the defensive stance adopted by several public government portals.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Ad Slot #2: Before FAQ */}
          <AdSlot id="ad-before-faq-php-update" />

          {/* Section 5: FAQ */}
          <section className="mt-12 border-t border-border pt-10">
            <h2 className="flex items-center gap-2.5 font-display text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
              <HelpCircle className="text-primary" size={24} />
              Frequently Asked Questions (FAQ)
            </h2>
            <p className="mt-3 text-base text-muted-foreground">
              Direct answers to frequent inquiries regarding the October 2026 PHP vulnerabilities and update management.
            </p>

            <div className="mt-6 space-y-4">
              {meta.faq.map((item, idx) => (
                <div key={idx} className="rounded-xl border border-border bg-card p-5">
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {item.question}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom Navigation & Cross Link */}
          <section className="mt-12 rounded-2xl border border-border bg-muted/30 p-6 sm:p-8">
            <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
              <div>
                <span className="font-mono-ui text-xs font-semibold uppercase tracking-wider text-accent">Next Security Step</span>
                <h3 className="mt-1 font-display text-xl font-bold text-foreground">
                  Is Your Website Affected by the October 2026 Vulnerabilities?
                </h3>
                <p className="mt-1 text-sm text-muted-foreground max-w-xl">
                  Run through our 5-point vulnerability triage checklist to verify your web server exposure, WAF coverage, and process integrity.
                </p>
              </div>
              <Link 
                href="/blog/is-my-website-affected-by-php-vulnerability"
                className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-primary px-5 py-3 font-semibold text-primary-foreground transition hover:bg-primary/90"
              >
                Open Audit Checklist <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        </article>
      </main>
    </Shell>
  );
}
