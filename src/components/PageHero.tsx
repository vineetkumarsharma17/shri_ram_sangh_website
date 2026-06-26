import { motion } from 'framer-motion';

interface PageHeroProps {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
}

export default function PageHero({ title, subtitle, backgroundImage }: PageHeroProps) {
  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        {backgroundImage ? (
          <img
            src={backgroundImage}
            alt=""
            className="w-full h-full object-cover"
            loading="eager"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-dark via-dark-light to-dark" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-dark/80 via-dark/70 to-dark/90" />
      </div>

      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-float" />
        <div className="absolute -bottom-20 -left-20 w-48 h-48 rounded-full bg-secondary/10 blur-3xl animate-float-slow" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center py-32">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white font-heading mb-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            {subtitle}
          </motion.p>
        )}
        {/* Breadcrumb line */}
        <motion.div
          className="mt-6 h-1 w-24 mx-auto rounded-full gradient-primary"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[40px] md:h-[60px]">
          <path fill="#FAFAFA" d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,100L0,100Z" />
        </svg>
      </div>
    </section>
  );
}
