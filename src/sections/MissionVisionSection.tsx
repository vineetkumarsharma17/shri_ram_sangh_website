import { useDataContext } from '@/hooks/useWebsiteData';
import AnimatedSection from '@/components/AnimatedSection';
import SectionHeading from '@/components/SectionHeading';
import DynamicIcon from '@/components/DynamicIcon';
import { Eye, Target, CheckCircle } from 'lucide-react';

export default function MissionVisionSection() {
  const { data } = useDataContext();
  if (!data) return null;
  const { vision, mission } = data;

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="mission-vision">
      {/* Decorative background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        {/* Vision */}
        <div className="mb-20">
          <SectionHeading title={vision.title} subtitle={vision.subtitle} />
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <div className="relative p-8 md:p-12 rounded-3xl bg-gradient-to-br from-primary/5 via-white to-secondary/5 border border-primary/10">
                <div className="absolute top-6 left-6 w-12 h-12 rounded-2xl gradient-primary flex items-center justify-center text-white">
                  <Eye size={24} />
                </div>
                <p className="text-xl md:text-2xl text-gray-700 font-heading leading-relaxed mt-12 md:mt-0 md:ml-20">
                  {vision.statement}
                </p>
                <div className="mt-8 grid sm:grid-cols-2 gap-3">
                  {vision.points.map((point, i) => (
                    <AnimatedSection key={i} direction="up" delay={i * 0.05}>
                      <div className="flex items-start gap-3 p-3 rounded-xl hover:bg-white/80 transition-colors">
                        <CheckCircle size={18} className="text-primary mt-0.5 shrink-0" />
                        <span className="text-gray-600 text-sm">{point}</span>
                      </div>
                    </AnimatedSection>
                  ))}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>

        {/* Mission */}
        <div>
          <SectionHeading title={mission.title} subtitle={mission.subtitle} />
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="inline-flex w-14 h-14 rounded-2xl gradient-primary items-center justify-center text-white mb-6">
                <Target size={28} />
              </div>
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                {mission.statement}
              </p>
            </div>
          </AnimatedSection>

          {/* Focus Areas Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {mission.focusAreas.map((area, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.08}>
                <div className="group p-6 rounded-2xl bg-white border border-gray-100 hover:border-primary/20 hover:shadow-xl hover:shadow-primary/5 transition-all duration-500 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                    <DynamicIcon name={area.icon} size={24} />
                  </div>
                  <h3 className="font-heading font-semibold text-dark text-lg mb-2">{area.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{area.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
