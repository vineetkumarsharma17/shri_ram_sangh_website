import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Lenis from 'lenis';
import { useDataContext } from '@/hooks/useWebsiteData';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import LoadingScreen from '@/components/LoadingScreen';
import BackToTop from '@/components/BackToTop';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainLayout() {
  const { loading } = useDataContext();
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Lenis smooth scrolling setup
  useEffect(() => {
    if (loading) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, [loading]);

  return (
    <HelmetProvider>
      <div className="min-h-screen bg-light text-dark flex flex-col relative">
        <LoadingScreen isLoading={loading} />

        {!loading && (
          <>
            <Navbar />
            <main className="flex-grow pt-[72px] lg:pt-[76px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={location.pathname}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Outlet />
                </motion.div>
              </AnimatePresence>
            </main>
            <Footer />
            <BackToTop />
          </>
        )}
      </div>
    </HelmetProvider>
  );
}
