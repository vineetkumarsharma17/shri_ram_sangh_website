import { useDataContext } from '@/hooks/useWebsiteData';
import AnimatedSection from '@/components/AnimatedSection';
import SectionHeading from '@/components/SectionHeading';
import DynamicIcon from '@/components/DynamicIcon';

export default function AboutSection() {
  const { data } = useDataContext();
  if (!data) return null;
  const { about } = data;

  return (
    <section className="section-padding bg-light" id="about-section">
      <div className="container-custom">
        <SectionHeading title={about.title} subtitle={about.subtitle} />

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Side */}
          <AnimatedSection direction="left">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={about.image}
                  alt="About Shri Ram Sangh"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/30 to-transparent" />
              </div>
              {/* Floating accent card */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 max-w-[200px] hidden md:block">
                <div className="text-3xl font-bold font-heading gradient-text">10+</div>
                <div className="text-gray-600 text-sm">Years of Dedicated Service</div>
              </div>
              {/* Decorative dot grid */}
              <div className="absolute -top-4 -left-4 w-24 h-24 opacity-20" aria-hidden="true" style={{
                backgroundImage: 'radial-gradient(circle, #FF7A00 1px, transparent 1px)',
                backgroundSize: '8px 8px'
              }} />
            </div>
          </AnimatedSection>

          {/* Text Side */}
          <AnimatedSection direction="right">
            <div>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {about.description}
              </p>
              <p className="text-gray-500 leading-relaxed mb-8">
                {about.extendedDescription}
              </p>

              {/* Highlights Grid */}
              <div className="grid grid-cols-2 gap-4">
                {about.highlights.map((item, i) => (
                  <AnimatedSection key={i} direction="up" delay={i * 0.1}>
                    <div className="p-4 rounded-xl bg-white shadow-sm hover:shadow-md transition-shadow duration-300 group">
                      <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                        <DynamicIcon name={item.icon} size={20} />
                      </div>
                      <h4 className="font-heading font-semibold text-dark text-sm mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-xs">{item.description}</p>
                    </div>
                  </AnimatedSection>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
