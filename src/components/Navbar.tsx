import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Heart } from 'lucide-react';
import { useDataContext } from '@/hooks/useWebsiteData';
import { mobileMenuVariants, menuItemVariants } from '@/animations/variants';

export default function Navbar() {
  const { data } = useDataContext();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  if (!data) return null;

  const { navigation, organization } = data;

  return (
    <header className="fixed top-0 left-0 right-0 z-[100]">
      <div className="container-custom">
        <motion.nav
          role="navigation"
          aria-label="Main navigation"
          initial={false}
          animate={{
            marginTop: scrolled ? '0.75rem' : '1.25rem',
            paddingTop: scrolled ? '0.5rem' : '0.65rem',
            paddingBottom: scrolled ? '0.5rem' : '0.65rem',
          }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className={`flex items-center justify-between gap-4 rounded-2xl px-3 sm:px-4 border transition-colors duration-500 ${
            scrolled
              ? 'bg-dark/70 backdrop-blur-xl border-white/10 shadow-lg shadow-black/30'
              : 'bg-dark/25 backdrop-blur-md border-white/10'
          }`}
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group shrink-0" aria-label={`${organization.name} - Home`}>
            <img
              src={organization.logo}
              alt={organization.logoAlt}
              className="w-10 h-10 md:w-11 md:h-11 rounded-full object-cover bg-white ring-2 ring-white/10 shadow-lg group-hover:ring-primary/40 transition-all duration-300"
              loading="eager"
            />
            <div className="hidden sm:block">
              <span className="text-white font-heading font-bold text-base lg:text-lg leading-tight block">
                {organization.name}
              </span>
              <span className="text-white/40 text-[10px] tracking-[0.2em] uppercase leading-tight block">
                Serving Humanity
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-1 rounded-full bg-white/[0.04] border border-white/5 p-1">
            {navigation.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.id}
                  to={item.path}
                  className={`relative px-3.5 py-2 text-sm font-medium rounded-full transition-colors duration-300 ${
                    isActive ? 'text-white' : 'text-white/60 hover:text-white'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="navbar-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-secondary shadow-md shadow-primary/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              to="/contact"
              className="hidden lg:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all duration-300"
            >
              <Heart size={15} className="fill-white" />
              Donate
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2.5 rounded-xl text-white bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </motion.nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 top-0 lg:hidden z-[99]"
            variants={mobileMenuVariants}
            initial="closed"
            animate="open"
            exit="closed"
          >
            <div className="absolute inset-0 bg-dark/98 backdrop-blur-xl" />
            <div className="relative h-full flex flex-col items-center justify-center gap-6 px-8">
              {/* Close button area at top */}
              <div className="absolute top-4 right-4">
                <button
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors cursor-pointer"
                  aria-label="Close menu"
                >
                  <X size={24} />
                </button>
              </div>

              {navigation.map((item, i) => {
                const isActive = location.pathname === item.path;
                return (
                  <motion.div
                    key={item.id}
                    custom={i}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                  >
                    <Link
                      to={item.path}
                      className={`text-2xl md:text-3xl font-heading font-bold transition-colors duration-300 ${
                        isActive ? 'gradient-text' : 'text-white/70 hover:text-white'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </motion.div>
                );
              })}

              {/* Donate CTA in mobile */}
              <motion.div
                className="mt-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-base font-semibold text-white bg-gradient-to-r from-primary to-secondary shadow-lg shadow-primary/30"
                >
                  <Heart size={18} className="fill-white" />
                  Donate
                </Link>
              </motion.div>

              {/* Social links in mobile */}
              <motion.div
                className="mt-4 flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <span className="text-white/30 text-sm">Follow us on social media</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
