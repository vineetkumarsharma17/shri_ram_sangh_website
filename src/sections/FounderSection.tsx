import { Quote } from 'lucide-react';
import { useDataContext } from '@/hooks/useWebsiteData';
import AnimatedSection from '@/components/AnimatedSection';

export default function FounderSection() {
  const { data } = useDataContext();
  if (!data) return null;
  const { founder } = data;

  return (
    <section className="section-padding bg-white relative overflow-hidden" id="founder-section">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-0 w-96 h-96 rounded-full bg-primary/3 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-64 h-64 rounded-full bg-accent/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-5 gap-12 items-center max-w-6xl mx-auto">
          {/* Photo */}
          <AnimatedSection direction="left" className="lg:col-span-2">
            <div className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl max-w-sm mx-auto">
                <img
                  src={founder.photo}
                  alt={founder.name}
                  className="w-full h-[400px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/40 to-transparent" />
              </div>
              {/* Name card */}
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg px-6 py-3 text-center whitespace-nowrap">
                <h3 className="font-heading font-bold text-dark text-sm">{founder.name}</h3>
                <p className="text-primary text-xs">{founder.designation}</p>
              </div>
            </div>
          </AnimatedSection>

          {/* Message */}
          <AnimatedSection direction="right" className="lg:col-span-3">
            <div className="relative">
              <Quote size={48} className="text-primary/10 mb-4" />
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-6">
                Founder&apos;s Message
              </h2>
              <div className="space-y-4">
                {founder.message.split('\n\n').map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-8 p-4 rounded-xl bg-primary/5 border-l-4 border-primary">
                <p className="text-gray-700 italic font-medium">
                  &ldquo;{founder.shortQuote}&rdquo;
                </p>
                <p className="text-primary font-semibold text-sm mt-2">— {founder.name}</p>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
