import AnimatedSection from './AnimatedSection';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  light?: boolean;
  className?: string;
}

export default function SectionHeading({
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}: SectionHeadingProps) {
  const alignClass = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  }[align];

  return (
    <AnimatedSection className={`mb-12 md:mb-16 ${alignClass} ${className}`}>
      {subtitle && (
        <span className={`inline-block text-sm md:text-base font-semibold tracking-wider uppercase mb-3 ${
          light ? 'text-accent' : 'text-primary'
        }`}>
          {subtitle}
        </span>
      )}
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold font-heading leading-tight ${
        light ? 'text-white' : 'text-dark'
      }`}>
        {title}
      </h2>
      <div className={`mt-4 mx-auto h-1 w-20 rounded-full gradient-primary ${
        align === 'center' ? 'mx-auto' : align === 'left' ? 'mr-auto' : 'ml-auto'
      }`} />
    </AnimatedSection>
  );
}
