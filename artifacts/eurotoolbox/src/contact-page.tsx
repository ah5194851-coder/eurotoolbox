import { useState, useEffect, type FormEvent } from 'react';
import { Link } from 'wouter';
import { Mail, MessageSquare, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import { Shell } from './App';
import { updateDocumentHead } from './seo';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Feedback / Tool Suggestion');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    updateDocumentHead('/contact');
  }, []);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    // Trigger user mail client with structured content as a dependable client-side mailto
    const mailtoUri = `mailto:support@loveeasytool.com?subject=${encodeURIComponent(`[LoveEasyTool] ${subject} from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`)}`;
    window.location.href = mailtoUri;
    setSubmitted(true);
  };

  return (
    <Shell>
      <main className="mx-auto max-w-[900px] px-5 py-12 lg:px-10 lg:py-20">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-foreground">LoveEasyTool</Link>
          <span>/</span>
          <span className="text-foreground">Contact</span>
        </div>

        <p className="mt-10 font-mono-ui text-[11px] uppercase tracking-[.18em] text-accent">Get in touch</p>
        <h1 className="mt-3 font-display text-5xl font-semibold tracking-tight sm:text-6xl">Contact Us</h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-muted-foreground">
          Have an idea for a new browser tool, found a calculation edge case, or want to discuss Ali Hassan's published books? We welcome your thoughts and reply promptly.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8">
            <h2 className="font-display text-2xl font-semibold">Send a Direct Message</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Fill out the form below to open your preferred mail client or send your message directly.
            </p>

            {submitted ? (
              <div className="mt-6 rounded-xl border border-accent/30 bg-accent/10 p-6 text-center">
                <CheckCircle2 size={36} className="mx-auto text-accent" />
                <h3 className="mt-3 font-display text-xl font-bold">Thank You!</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Your mail client has been opened. If it didn't trigger automatically, please email us directly at{' '}
                  <a href="mailto:support@loveeasytool.com" className="font-semibold text-primary underline">
                    support@loveeasytool.com
                  </a>.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-5 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
                <label className="grid gap-1.5 text-sm font-medium">
                  <span>Your Name</span>
                  <input
                    required
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    className="rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </label>

                <label className="grid gap-1.5 text-sm font-medium">
                  <span>Your Email Address</span>
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="sarah@example.com"
                    className="rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </label>

                <label className="grid gap-1.5 text-sm font-medium">
                  <span>Subject</span>
                  <select
                    value={subject}
                    onChange={e => setSubject(e.target.value)}
                    className="rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none focus:border-primary"
                  >
                    <option>Feedback / Tool Suggestion</option>
                    <option>Report a Bug or Calculation Error</option>
                    <option>Question About Ali Hassan Books</option>
                    <option>Privacy or Data Inquiry</option>
                    <option>General Question</option>
                  </select>
                </label>

                <label className="grid gap-1.5 text-sm font-medium">
                  <span>Message</span>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={e => setMessage(e.target.value)}
                    placeholder="Tell us what tool you'd like to see, or describe any issue you encountered..."
                    className="rounded-lg border border-input bg-background px-3.5 py-2.5 outline-none focus:border-primary focus:ring-2 focus:ring-primary/15"
                  />
                </label>

                <button
                  type="submit"
                  className="mt-2 inline-flex items-center justify-center gap-2 rounded-lg bg-primary py-3 font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  <Send size={16} /> Send Message via Email
                </button>
              </form>
            )}
          </div>

          <div className="grid gap-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 text-primary">
                <Mail size={20} />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">Direct Email</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                For general support, feedback, or business inquiries:
              </p>
              <a
                href="mailto:support@loveeasytool.com"
                className="mt-3 inline-block font-mono-ui text-sm font-semibold text-primary underline hover:text-primary/80"
              >
                support@loveeasytool.com
              </a>
              <p className="mt-3 text-xs text-muted-foreground">
                Average reply time: within 24 to 48 business hours.
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-card p-6">
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-secondary text-secondary-foreground">
                <MessageSquare size={20} />
              </span>
              <h3 className="mt-4 font-display text-xl font-semibold">Tool Feature Requests</h3>
              <p className="mt-1 text-sm leading-6 text-muted-foreground">
                Is there a specific text cleaner, conversion table, or calculator formula you need for school or work? Send us the details and we regularly prioritize user-requested tools.
              </p>
            </div>

            <div className="rounded-xl border border-border bg-muted/40 p-4 text-xs leading-5 text-muted-foreground">
              <span className="flex items-center gap-1.5 font-semibold text-foreground">
                <AlertCircle size={14} className="text-accent" /> Privacy Notice:
              </span>
              Contact submissions are only used to respond to your specific request. We never sell, rent, or add contact emails to marketing lists.
            </div>
          </div>
        </div>
      </main>
    </Shell>
  );
}
