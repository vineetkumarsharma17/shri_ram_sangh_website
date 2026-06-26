import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  isLoading: boolean;
}

export default function LoadingScreen({ isLoading }: LoadingScreenProps) {
  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="loading-screen"
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-light to-dark" />

          {/* Animated blobs */}
          <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-primary/10 blur-3xl animate-blob" />
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-secondary/10 blur-3xl animate-blob" style={{ animationDelay: '2s' }} />
          </div>

          {/* Logo + Loader */}
          <div className="relative z-10 flex flex-col items-center gap-6">
            <motion.div
              className="w-20 h-20 rounded-full bg-white flex items-center justify-center overflow-hidden shadow-2xl"
              initial={{ scale: 0, rotate: -180 }}
              animate={{
                scale: [1, 1.1, 1],
                rotate: 0,
              }}
              transition={{
                scale: { repeat: Infinity, duration: 2, ease: 'easeInOut' },
                rotate: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
              }}
            >
              <img
                src="/images/logo/logo.jpg"
                alt="Shri Ram Sangh Logo"
                className="w-full h-full object-cover"
              />
            </motion.div>

            <motion.div
              className="text-white/60 text-sm font-medium tracking-widest uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              Loading...
            </motion.div>

            {/* Progress bar */}
            <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full gradient-primary rounded-full"
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ duration: 2, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
