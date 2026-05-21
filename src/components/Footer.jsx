const links = [
  {
    label: 'agrobank.uz',
    href: 'https://agrobank.uz',
    icon: 'solar:global-linear',
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/agrobank_uz/',
    icon: 'simple-icons:instagram',
  },
  {
    label: 'Telegram',
    href: 'https://t.me/agrobankpress',
    icon: 'simple-icons:telegram',
  },
];

export default function Footer() {
  return (
    <footer className="w-full max-w-7xl border-t border-[var(--border)] mt-20 relative z-10 bg-[var(--bg)]">
      <div className="px-8 py-5 flex justify-center items-center gap-8 text-xs text-[var(--text-muted)]">
        {links.map((l) => (
          <a
            key={l.label}
            href={l.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 hover:text-[var(--brand-green)] transition-colors group"
          >
            <iconify-icon icon={l.icon} class="text-base"></iconify-icon>
            <span className="tracking-wide">{l.label}</span>
          </a>
        ))}
      </div>
    </footer>
  );
}
