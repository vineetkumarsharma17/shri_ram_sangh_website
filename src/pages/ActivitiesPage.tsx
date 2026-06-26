import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDataContext } from '@/hooks/useWebsiteData';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import SectionHeading from '@/components/SectionHeading';
import DynamicIcon from '@/components/DynamicIcon';
import Lightbox from '@/components/Lightbox';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function ActivitiesPage() {
  const { data } = useDataContext();
  const [activeActivity, setActiveActivity] = useState<string | null>(null);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  if (!data) return null;
  const { activities, seo } = data;
  const pageSeo = seo.pages.activities;

  return (
    <>
      <Helmet>
        <title>{seo.titleTemplate.replace('%s', pageSeo.title)}</title>
        <meta name="description" content={pageSeo.description} />
      </Helmet>

      <PageHero title={activities.title} subtitle={activities.subtitle} />

      {/* Activities Grid */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activities.items.map((activity, i) => (
              <AnimatedSection key={activity.id} direction="up" delay={i * 0.05}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-500 flex flex-col h-full">
                  {/* Image container */}
                  <div className="relative overflow-hidden aspect-video">
                    <img
                      src={activity.image}
                      alt={activity.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Icon tag */}
                    <div className="absolute top-4 left-4 w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white shadow-lg">
                      <DynamicIcon name={activity.icon} size={20} />
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-dark text-xl mb-3 group-hover:text-primary transition-colors">
                        {activity.title}
                      </h3>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 line-clamp-3">
                        {activity.shortDescription}
                      </p>
                    </div>

                    <div>
                      {/* Stat badge */}
                      <div className="bg-primary/5 rounded-xl p-3 border border-primary/10 flex items-center justify-between mb-4">
                        <span className="text-gray-500 text-xs font-medium">{activity.stats.label}</span>
                        <span className="text-primary font-heading font-bold text-lg">{activity.stats.value}</span>
                      </div>

                      <a
                        href={`#${activity.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveActivity(activity.id);
                          document.getElementById(activity.id)?.scrollIntoView({ behavior: 'smooth' });
                        }}
                        className="inline-flex items-center gap-2 text-primary font-heading font-semibold text-sm group/btn cursor-pointer"
                      >
                        Read Full Details
                        <ArrowRight size={16} className="group-hover/btn:translate-x-1.5 transition-transform" />
                      </a>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Activity Sections */}
      <section className="section-padding bg-white divide-y divide-gray-100">
        {activities.items.map((activity, i) => (
          <div
            key={activity.id}
            id={activity.id}
            className={`py-20 first:pt-0 last:pb-0 scroll-mt-24 ${
              activeActivity === activity.id ? 'bg-primary/5 -mx-4 px-4 rounded-3xl transition-all duration-700' : ''
            }`}
          >
            <div className="container-custom">
              <div className={`grid lg:grid-cols-12 gap-12 items-center`}>
                {/* Content Column */}
                <div className={`lg:col-span-7 ${i % 2 === 1 ? 'lg:order-2' : ''}`}>
                  <AnimatedSection direction={i % 2 === 0 ? 'left' : 'right'}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                        <DynamicIcon name={activity.icon} size={20} />
                      </div>
                      <span className="text-primary font-heading font-bold text-sm tracking-wider uppercase">
                        Active Initiative
                      </span>
                    </div>

                    <h2 className="text-3xl md:text-4xl font-heading font-extrabold text-dark mb-6">
                      {activity.title}
                    </h2>

                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      {activity.shortDescription}
                    </p>

                    <p className="text-gray-500 leading-relaxed mb-8">
                      {activity.description}
                    </p>

                    {/* Stats Counter Card */}
                    <div className="inline-flex items-center gap-4 bg-light p-4 rounded-2xl border border-gray-100 mb-8">
                      <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white shrink-0">
                        <Sparkles size={22} />
                      </div>
                      <div>
                        <div className="text-primary font-heading font-bold text-xl leading-none">
                          {activity.stats.value}
                        </div>
                        <div className="text-gray-500 text-xs mt-1">
                          {activity.stats.label}
                        </div>
                      </div>
                    </div>
                  </AnimatedSection>
                </div>

                {/* Media/Gallery Column */}
                <div className={`lg:col-span-5 ${i % 2 === 1 ? 'lg:order-1' : ''}`}>
                  <AnimatedSection direction={i % 2 === 0 ? 'right' : 'left'}>
                    <div className="space-y-4">
                      {/* Main Image */}
                      <div className="rounded-2xl overflow-hidden shadow-lg aspect-video lg:aspect-square relative group">
                        <img
                          src={activity.image}
                          alt={activity.title}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </div>

                      {/* Micro Gallery */}
                      {activity.gallery && activity.gallery.length > 0 && (
                        <div className="grid grid-cols-2 gap-4">
                          {activity.gallery.map((img, index) => (
                            <div
                              key={index}
                              onClick={() => setLightboxImage(img)}
                              className="rounded-xl overflow-hidden shadow-sm aspect-video cursor-pointer relative group border border-gray-100"
                            >
                              <img
                                src={img}
                                alt={`${activity.title} Gallery ${index + 1}`}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                loading="lazy"
                              />
                              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-medium text-xs">
                                Preview
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </AnimatedSection>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>

      {/* Lightbox for Gallery previews */}
      <Lightbox
        images={lightboxImage ? [{ src: lightboxImage, alt: 'Initiative Preview' }] : []}
        initialIndex={0}
        isOpen={!!lightboxImage}
        onClose={() => setLightboxImage(null)}
      />
    </>
  );
}
