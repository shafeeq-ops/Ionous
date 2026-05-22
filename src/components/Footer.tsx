export default function Footer() {
  return (
    <footer className="bg-ink-2 border-t border-rule">
      <div className="mx-auto max-w-[1400px] px-6 py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <span className="block h-2 w-2 rounded-full bg-foreground" />
          <span className="font-mono text-sm tracking-[0.22em] uppercase text-foreground">
            Ionous
          </span>
          <span className="text-muted text-xs">© {new Date().getFullYear()}</span>
        </div>
        <ul className="flex items-center gap-6 text-xs text-muted">
          <li>
            <a href="#capabilities" className="hover:text-foreground transition-colors">
              Capabilities
            </a>
          </li>
          <li>
            <a href="#engagement" className="hover:text-foreground transition-colors">
              Engagement
            </a>
          </li>
          <li>
            <a href="#contact" className="hover:text-foreground transition-colors">
              Contact
            </a>
          </li>
          <li>
            <a href="/privacy" className="hover:text-foreground transition-colors">
              Privacy
            </a>
          </li>
          <li>
            <a href="/terms" className="hover:text-foreground transition-colors">
              Terms
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
