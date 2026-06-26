import { Helmet } from 'react-helmet-async';
import { useDataContext } from '@/hooks/useWebsiteData';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import SectionHeading from '@/components/SectionHeading';
import DynamicIcon from '@/components/DynamicIcon';
import { CheckCircle, Eye, Target, Quote } from 'lucide-react';

export default function AboutPage() {
  const { data } = useDataContext();
  if (!data) return null;
  const { about, history, vision, mission, objectives, founder, seo } = data;
  const pageSeo = seo.pages.about;

  return (
    <>
      <Helmet>
        <title>{seo.titleTemplate.replace('%s', pageSeo.title)}</title>
        <meta name="description" content={pageSeo.description} />
      </Helmet>

      <PageHero title={about.title} subtitle={about.subtitle} />

      {/* About Content */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <AnimatedSection>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">{about.description}</p>
              <p className="text-gray-500 leading-relaxed">{about.extendedDescription}</p>
            </AnimatedSection>

            {/* Highlights */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
              {about.highlights.map((item, i) => (
                <AnimatedSection key={i} direction="up" delay={i * 0.1}>
                  <div className="p-5 rounded-xl bg-white shadow-sm text-center group hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <DynamicIcon name={item.icon} size={22} />
                    </div>
                    <h4 className="font-heading font-semibold text-dark mb-1">{item.title}</h4>
                    <p className="text-gray-500 text-sm">{item.description}</p>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading title={history.title} subtitle={history.subtitle} />
          <div className="max-w-3xl mx-auto relative">
            {/* Vertical line */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200" aria-hidden="true" />

            {history.timeline.map((entry, i) => (
              <AnimatedSection key={i} direction={i % 2 === 0 ? 'left' : 'right'} delay={i * 0.05}>
                <div className={`relative flex items-start gap-6 mb-10 ${
                  i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}>
                  {/* Dot */}
                  <div className="absolute left-6 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full gradient-primary border-4 border-white shadow z-10" />

                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-1/2 ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                    <span className="text-primary font-heading font-bold text-lg">{entry.year}</span>
                    <h3 className="font-heading font-semibold text-dark text-lg mt-1">{entry.title}</h3>
                    <p className="text-gray-500 text-sm mt-2 leading-relaxed">{entry.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          <SectionHeading title={vision.title} subtitle={vision.subtitle} />
          <AnimatedSection>
            <div className="max-w-4xl mx-auto p-8 md:p-12 rounded-3xl bg-white shadow-sm border border-gray-100">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white shrink-0">
                  <Eye size={24} />
                </div>
                <p className="text-xl text-gray-700 font-heading leading-relaxed">{vision.statement}</p>
              </div>
              <div className="grid sm:grid-cols-2 gap-3 mt-8">
                {vision.points.map((point, i) => (
                  <div key={i} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <CheckCircle size={16} className="text-primary mt-0.5 shrink-0" />
                    <span className="text-gray-600 text-sm">{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Mission */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <SectionHeading title={mission.title} subtitle={mission.subtitle} />
          <AnimatedSection>
            <div className="max-w-3xl mx-auto text-center mb-12">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center text-white mx-auto mb-4">
                <Target size={28} />
              </div>
              <p className="text-lg text-gray-600 leading-relaxed">{mission.statement}</p>
            </div>
          </AnimatedSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {mission.focusAreas.map((area, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.08}>
                <div className="group p-6 rounded-2xl bg-light border border-gray-100 hover:border-primary/20 hover:shadow-lg transition-all duration-500 h-full">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4 group-hover:bg-primary group-hover:text-white transition-all">
                    <DynamicIcon name={area.icon} size={24} />
                  </div>
                  <h3 className="font-heading font-semibold text-dark text-lg mb-2">{area.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{area.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Objectives */}
      <section className="section-padding bg-gradient-to-br from-dark via-dark-light to-dark relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        </div>
        <div className="container-custom relative z-10">
          <SectionHeading title={objectives.title} subtitle={objectives.subtitle} light />
          <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
            {objectives.list.map((obj, i) => (
              <AnimatedSection key={i} direction="up" delay={i * 0.05}>
                <div className="flex items-start gap-3 p-4 rounded-xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors">
                  <span className="w-6 h-6 rounded-full gradient-primary flex items-center justify-center text-white text-xs font-bold shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <p className="text-white/70 text-sm">{obj}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto grid lg:grid-cols-5 gap-12 items-center">
            <AnimatedSection direction="left" className="lg:col-span-2">
              <div className="relative max-w-sm mx-auto">
                <div className="rounded-2xl overflow-hidden shadow-2xl">
                  <img src={founder.photo} alt={founder.name} className="w-full h-[400px] object-cover" loading="lazy" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-xl shadow-lg px-6 py-3 text-center whitespace-nowrap">
                  <h3 className="font-heading font-bold text-dark text-sm">{founder.name}</h3>
                  <p className="text-primary text-xs">{founder.designation}</p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="lg:col-span-3">
              <Quote size={40} className="text-primary/10 mb-4" />
              <h2 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-6">Founder&apos;s Message</h2>
              <div className="space-y-4">
                {founder.message.split('\n\n').map((para, i) => (
                  <p key={i} className="text-gray-600 leading-relaxed">{para}</p>
                ))}
              </div>
              <div className="mt-8 p-4 rounded-xl bg-primary/5 border-l-4 border-primary">
                <p className="text-gray-700 italic">&ldquo;{founder.shortQuote}&rdquo;</p>
                <p className="text-primary font-semibold text-sm mt-2">— {founder.name}</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
