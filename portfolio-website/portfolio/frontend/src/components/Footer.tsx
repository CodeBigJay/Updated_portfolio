export default function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col gap-2 px-6 py-8 font-mono text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} Mogomotsi Sebogo. Built with Spring Boot &amp; React.</p>
        <p>status: <span className="text-trace">online</span></p>
      </div>
    </footer>
  );
}
