interface SectionDividerProps {
  type?: 'wave' | 'curve' | 'triangle' | 'tilt';
  color?: string;
  flip?: boolean;
  className?: string;
}

export default function SectionDivider({
  type = 'wave',
  color = '#FAFAFA',
  flip = false,
  className = '',
}: SectionDividerProps) {
  const transform = flip ? 'rotate(180deg)' : 'none';

  const svgPaths: Record<string, string> = {
    wave: 'M0,96L48,106.7C96,117,192,139,288,138.7C384,139,480,117,576,112C672,107,768,117,864,128C960,139,1056,149,1152,144C1248,139,1344,117,1392,106.7L1440,96L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
    curve: 'M0,160L60,170.7C120,181,240,203,360,192C480,181,600,139,720,128C840,117,960,139,1080,149.3C1200,160,1320,160,1380,160L1440,160L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z',
    triangle: 'M0,320L720,160L1440,320L1440,320L0,320Z',
    tilt: 'M0,224L1440,96L1440,320L0,320Z',
  };

  return (
    <div className={`relative w-full overflow-hidden leading-[0] ${className}`} style={{ transform }} aria-hidden="true">
      <svg
        className="relative block w-full"
        style={{ height: '60px' }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill={color} d={svgPaths[type]} />
      </svg>
    </div>
  );
}
