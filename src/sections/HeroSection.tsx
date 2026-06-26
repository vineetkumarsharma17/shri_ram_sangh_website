import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import CountUpModule from 'react-countup';
import { useInView } from 'react-intersection-observer';

// Vite 8 / Rolldown CJS interop can resolve the default import to the module
// namespace object ({ default, useCountUp }) instead of the component itself.
// Unwrap defensively so it works regardless of how the bundler interops it.
const CountUp = (CountUpModule as unknown as { default?: typeof CountUpModule }).default ?? CountUpModule;
import { useDataContext } from '@/hooks/useWebsiteData';
import Button from '@/components/Button';
import ParticleField from '@/animations/ParticleField';

export default function HeroSection() {
  const { data } = useDataContext();
  const [statsRef, statsInView] = useInView({ triggerOnce: true, threshold: 0.3 });

  if (!data) return null;
  const { hero } = data;

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden" id="hero">
      {/* Background Image */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-light to-dark" />
        <img
          src={hero.backgroundImage}
          alt=""
          className="w-full h-full object-cover opacity-30"
          loading="eager"
          fetchPriority="high"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/60 via-transparent to-dark/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-transparent to-secondary/20" />
      </div>

      {/* Particles */}
      <ParticleField count={40} />

      {/* Decorative floating shapes */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-[15%] left-[10%] w-32 h-32 rounded-full border border-primary/20 animate-float opacity-30" />
        <div className="absolute bottom-[25%] right-[15%] w-24 h-24 rounded-full border border-accent/20 animate-float-slow opacity-20" />
        <div className="absolute top-[40%] right-[8%] w-4 h-4 rounded-full bg-accent/40 animate-float" />
        <div className="absolute bottom-[35%] left-[20%] w-3 h-3 rounded-full bg-primary/40 animate-float-slow" />
        <div className="absolute top-[60%] left-[5%] w-64 h-64 rounded-full bg-primary/5 blur-3xl animate-blob" />
        <div className="absolute top-[20%] right-[10%] w-48 h-48 rounded-full bg-secondary/5 blur-3xl animate-blob" style={{ animationDelay: '3s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center px-4 pt-24">
        {/* Badge */}
        <motion.div
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-white/70 text-sm font-medium">10+ Years of Dedicated Service</span>
        </motion.div>

        {/* Title */}
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-heading text-white leading-tight max-w-5xl mx-auto mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {hero.title.split('\n').map((line, i) => (
            <span key={i}>
              {i === 0 ? (
                <>{line}<br /></>
              ) : (
                <span className="gradient-text">{line}</span>
              )}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          className="text-base md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {hero.subtitle}
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {hero.ctaButtons.map((btn) => (
            <Button key={btn.label} to={btn.path} variant={btn.variant} size="lg">
              {btn.label}
            </Button>
          ))}
        </motion.div>

        {/* Stats */}
        <motion.div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {hero.stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl lg:text-5xl font-bold font-heading text-white mb-1">
                {statsInView ? (
                  <CountUp end={stat.value} duration={2.5} separator="," />
                ) : (
                  '0'
                )}
                <span className="text-primary">{stat.suffix}</span>
              </div>
              <div className="text-white/40 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        onClick={() => {
          window.scrollTo({ top: window.innerHeight, behavior: 'smooth' });
        }}
      >
        <span className="text-white/30 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-white/30" />
        </motion.div>
      </motion.div>

      {/* Bottom wave divider */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 120" preserveAspectRatio="none" className="w-full h-[50px] md:h-[80px]">
          <path fill="#FAFAFA" d="M0,96L60,90.7C120,85,240,75,360,74.7C480,75,600,85,720,90.7C840,96,960,96,1080,90.7C1200,85,1320,75,1380,69.3L1440,64L1440,120L1380,120C1320,120,1200,120,1080,120C960,120,840,120,720,120C600,120,480,120,360,120C240,120,120,120,60,120L0,120Z" />
        </svg>
      </div>
    </section>
  );
}
