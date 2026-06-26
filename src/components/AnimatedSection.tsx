import { motion, useInView } from 'framer-motion';
import { useRef, type ReactNode } from 'react';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale' | 'none';
  delay?: number;
  duration?: number;
  once?: boolean;
  amount?: number;
}

const directionMap = {
  up: { y: 50, x: 0 },
  down: { y: -50, x: 0 },
  left: { x: -60, y: 0 },
  right: { x: 60, y: 0 },
  scale: { y: 0, x: 0 },
  none: { y: 0, x: 0 },
};

export default function AnimatedSection({
  children,
  className = '',
  direction = 'up',
  delay = 0,
  duration = 0.6,
  once = true,
  amount = 0.2,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  const { x, y } = directionMap[direction];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        x,
        y,
        scale: direction === 'scale' ? 0.85 : 1,
      }}
      animate={isInView ? {
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
      } : {
        opacity: 0,
        x,
        y,
        scale: direction === 'scale' ? 0.85 : 1,
      }}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
