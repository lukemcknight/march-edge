import { Link, NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/', label: 'Home', icon: 'HM' },
  { to: '/intel', label: 'Intel', icon: 'IN' },
  { to: '/build', label: 'Build', icon: 'BK' },
  { to: '/my-bracket', label: 'Bracket', icon: 'BR' },
];

function Layout() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <div className="pointer-events-none absolute inset-0 opacity-30 grid-noise-overlay" />
      <div className="pointer-events-none absolute inset-0 opacity-40 soft-vignette" />

      <main className="relative mx-auto w-full max-w-6xl px-4 pb-28 pt-4 sm:px-6 lg:px-8 lg:pb-10">
        <header className="mb-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 backdrop-blur-sm lg:mb-7 lg:px-5 lg:py-3.5">
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[var(--accent-primary)]">March Edge</p>
            <p className="text-xs text-[var(--text-secondary)] lg:text-sm">NCAA Tournament Assistant</p>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `inline-flex h-10 items-center rounded-xl px-4 text-sm font-semibold transition-all duration-300 ${
                    isActive
                      ? 'border border-[var(--accent-primary)]/40 bg-[var(--accent-primary)]/18 text-white shadow-[0_0_18px_rgba(255,107,43,0.2)]'
                      : 'border border-white/10 bg-white/5 text-[var(--text-secondary)] hover:bg-white/10'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </div>

          <Link to="/build" className="hidden h-10 items-center rounded-xl border border-[var(--accent-primary)]/45 bg-[var(--accent-primary)]/15 px-4 text-sm font-bold text-white transition-all duration-300 hover:brightness-110 lg:inline-flex">
            Start Building
          </Link>
        </header>

        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-white/10 bg-[var(--bg-secondary)]/88 px-3 py-2 backdrop-blur-md lg:hidden">
        <div className="mx-auto grid max-w-3xl grid-cols-4 gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex h-12 flex-col items-center justify-center rounded-xl transition-all duration-300 ${
                  isActive
                    ? 'border border-[var(--accent-primary)]/40 bg-[var(--accent-primary)]/18 text-white shadow-[0_0_18px_rgba(255,107,43,0.2)]'
                    : 'border border-white/10 bg-white/5 text-[var(--text-secondary)] hover:bg-white/10'
                }`
              }
            >
              <span className="stats-font text-[10px] font-bold tracking-wide">{item.icon}</span>
              <span className="text-[11px] font-semibold">{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
}

export default Layout;
