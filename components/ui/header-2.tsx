'use client';
import React from 'react';
import { MenuToggleIcon } from '@/components/ui/menu-toggle-icon';
import { useScroll } from '@/components/ui/use-scroll';

type Page = 'home' | 'catalog' | 'dashboard';

interface HeaderProps {
  page: Page;
  setPage: (p: Page) => void;
  scrollToForm: () => void;
}

export function Header({ page, setPage, scrollToForm }: HeaderProps) {
  const [open, setOpen] = React.useState(false);
  const scrolled = useScroll(10);

  React.useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  function scrollToSection(id: string) {
    setOpen(false);
    if (page !== 'home') {
      setPage('home');
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  const navLinks = [
    { label: 'Acasă', action: () => { setPage('home'); setOpen(false); } },
    { label: 'Cursuri', action: () => scrollToSection('catalog-section') },
    { label: 'Prețuri', action: () => scrollToSection('pricing-section') },
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 50,
      width: '100%',
      padding: scrolled ? '8px 20px' : '14px 20px',
      transition: 'padding 0.3s cubic-bezier(0.4,0,0.2,1)',
      background: 'transparent',
    }}>
      {/* ── Island pill ── */}
      <nav style={{
        maxWidth: 1060,
        margin: '0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: scrolled ? 50 : 58,
        padding: '0 8px 0 16px',
        borderRadius: scrolled ? 100 : 14,
        background: scrolled
          ? 'rgba(13,13,18,0.92)'
          : 'rgba(13,13,18,0.55)',
        backdropFilter: 'blur(24px)',
        WebkitBackdropFilter: 'blur(24px)',
        border: '1px solid rgba(255,255,255,0.09)',
        boxShadow: scrolled
          ? '0 8px 32px rgba(0,0,0,0.55)'
          : '0 2px 12px rgba(0,0,0,0.25)',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        position: 'relative',
      }}>
        {/* Logo */}
        <button
          onClick={() => { setPage('home'); setOpen(false); }}
          style={{
            display: 'flex', alignItems: 'center',
            flexShrink: 0, background: 'none', border: 'none',
            cursor: 'pointer', padding: '0 6px',
          }}
        >
          <img
            src="/logo.png"
            alt="Edu-AI"
            style={{
              height: scrolled ? 26 : 30,
              width: 'auto',
              transition: 'height 0.3s ease',
            }}
          />
        </button>

        {/* Desktop links — absolute center */}
        <div style={{
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
        }} className="hdr-links">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={link.action}
              style={{
                padding: '6px 14px',
                borderRadius: 100,
                fontSize: 14,
                fontWeight: 500,
                fontFamily: 'inherit',
                border: 'none',
                cursor: 'pointer',
                background: 'none',
                color: 'rgba(255,255,255,0.5)',
                transition: 'color 0.15s, background 0.15s',
                whiteSpace: 'nowrap',
              }}
              onMouseEnter={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = '#fff';
                el.style.background = 'rgba(255,255,255,0.06)';
              }}
              onMouseLeave={(e) => {
                const el = e.currentTarget as HTMLButtonElement;
                el.style.color = 'rgba(255,255,255,0.5)';
                el.style.background = 'none';
              }}
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* Desktop CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexShrink: 0 }} className="hdr-cta">
          <button
            onClick={() => { scrollToForm(); }}
            style={{
              padding: '8px 18px', borderRadius: 100,
              fontSize: 13, fontWeight: 700,
              color: '#fff',
              background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
              border: 'none',
              cursor: 'pointer', fontFamily: 'inherit',
              boxShadow: '0 0 16px rgba(108,99,255,0.35)',
              transition: 'all 0.15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '0.85';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.opacity = '1';
              (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(0)';
            }}
          >
            Înscrie-te pe waitlist →
          </button>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setOpen(!open)}
          className="hdr-burger"
          style={{
            width: 36, height: 36, borderRadius: '50%',
            border: '1px solid rgba(255,255,255,0.12)',
            background: open ? 'rgba(255,255,255,0.06)' : 'none',
            cursor: 'pointer',
            color: 'rgba(255,255,255,0.8)',
            display: 'none',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
            transition: 'background 0.15s',
          }}
          aria-label="Toggle menu"
        >
          <MenuToggleIcon open={open} style={{ width: 18, height: 18 }} duration={280} />
        </button>
      </nav>

      {/* Mobile full-screen drawer */}
      {open && (
        <div style={{
          position: 'fixed', inset: 0,
          zIndex: 48,
          background: 'rgba(10,8,20,0.97)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          display: 'flex',
          flexDirection: 'column',
          paddingTop: 88,
        }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: '0 20px' }}>
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                style={{
                  padding: '14px 16px', borderRadius: 10,
                  fontSize: 17, fontWeight: 500,
                  textAlign: 'left', fontFamily: 'inherit',
                  background: 'none',
                  border: 'none',
                  color: '#fff',
                  cursor: 'pointer',
                  borderLeft: '2px solid transparent',
                }}
              >
                {link.label}
              </button>
            ))}
          </div>
          <div style={{
            marginTop: 'auto',
            display: 'flex', flexDirection: 'column', gap: 10,
            padding: '0 20px 48px',
          }}>
            <button
              onClick={() => { scrollToForm(); setOpen(false); }}
              style={{
                width: '100%', padding: '14px', borderRadius: 12,
                fontSize: 15, fontWeight: 700, color: '#fff',
                background: 'linear-gradient(135deg, #6c63ff, #a78bfa)',
                border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                boxShadow: '0 4px 20px rgba(108,99,255,0.3)',
              }}
            >
              Înscrie-te pe waitlist →
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 767px) {
          .hdr-links { display: none !important; }
          .hdr-cta   { display: none !important; }
          .hdr-burger { display: flex !important; }
        }
      `}</style>
    </header>
  );
}
