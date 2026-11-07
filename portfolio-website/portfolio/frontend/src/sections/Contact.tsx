import { useState, type FormEvent } from 'react';
import { api } from '../api/client';
import SectionHeading from '../components/SectionHeading';

type Status = 'idle' | 'sending' | 'sent' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await api.submitContact({
        name: String(data.get('name') || ''),
        email: String(data.get('email') || ''),
        message: String(data.get('message') || ''),
      });
      setStatus('sent');
      form.reset();
    } catch (err) {
      setStatus('error');
      setErrorMsg(err instanceof Error ? err.message : 'Something went wrong. Please try again.');
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-5xl px-6 py-20">
      <SectionHeading route="POST /api/contact" title="Get in touch" />
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr]">
        <div>
          <p className="text-muted">
            Open to backend and full-stack roles, internships, and collaboration.
            Send a message and I'll reply directly — no middleman, this form posts
            straight to my own API.
          </p>
          <ul className="mt-6 space-y-2 font-mono text-sm">
            <li>
              <span className="text-muted">github </span>
              <a
                href="https://github.com/CodeBigJay"
                target="_blank"
                rel="noreferrer"
                className="text-trace hover:underline"
              >
                CodeBigJay
              </a>
            </li>
            <li>
              <span className="text-muted">linkedin </span>
              <a
                href="https://www.linkedin.com/in/mogomotsi-sebogo"
                target="_blank"
                rel="noreferrer"
                className="text-trace hover:underline"
              >
                Mogomotsi Sebogo
              </a>
            </li>
          </ul>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 rounded-lg border border-border bg-panel p-6">
          <div>
            <label htmlFor="name" className="mb-1 block font-mono text-xs text-muted">
              name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              maxLength={100}
              className="w-full rounded border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-trace"
            />
          </div>
          <div>
            <label htmlFor="email" className="mb-1 block font-mono text-xs text-muted">
              email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="w-full rounded border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-trace"
            />
          </div>
          <div>
            <label htmlFor="message" className="mb-1 block font-mono text-xs text-muted">
              message
            </label>
            <textarea
              id="message"
              name="message"
              required
              maxLength={2000}
              rows={5}
              className="w-full resize-none rounded border border-border bg-bg px-3 py-2 text-sm text-ink outline-none focus:border-trace"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'sending'}
            className="w-full rounded bg-amber px-5 py-2.5 font-mono text-sm font-medium text-bg transition-colors hover:bg-amber/90 disabled:opacity-60"
          >
            {status === 'sending' ? 'sending…' : 'send message'}
          </button>

          {status === 'sent' && (
            <p className="font-mono text-sm text-trace" role="status">
              200 OK — message received. Thanks, I'll be in touch.
            </p>
          )}
          {status === 'error' && (
            <p className="font-mono text-sm text-[#e8604d]" role="alert">
              Request failed: {errorMsg}
            </p>
          )}
        </form>
      </div>
    </section>
  );
}
