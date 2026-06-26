import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDataContext } from '@/hooks/useWebsiteData';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import SectionHeading from '@/components/SectionHeading';
import { Calendar, MapPin, Clock, Users, ArrowUpRight } from 'lucide-react';

export default function EventsPage() {
  const { data } = useDataContext();
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  if (!data) return null;
  const { events, seo } = data;
  const pageSeo = seo.pages.events;

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    const day = d.getDate();
    const month = d.toLocaleString('default', { month: 'short' });
    const year = d.getFullYear();
    return { day, month, year };
  };

  return (
    <>
      <Helmet>
        <title>{seo.titleTemplate.replace('%s', pageSeo.title)}</title>
        <meta name="description" content={pageSeo.description} />
      </Helmet>

      <PageHero title={events.title} subtitle={events.subtitle} />

      {/* Tab Switcher */}
      <section className="bg-light pt-12 pb-4">
        <div className="container-custom">
          <div className="flex justify-center">
            <div className="bg-white p-1.5 rounded-full shadow-sm border border-gray-100 flex gap-1">
              <button
                onClick={() => setActiveTab('upcoming')}
                className={`px-6 py-2.5 rounded-full font-heading font-semibold text-sm transition-all duration-300 cursor-pointer ${
                  activeTab === 'upcoming'
                    ? 'gradient-primary text-white shadow-md'
                    : 'text-gray-500 hover:text-dark'
                }`}
              >
                Upcoming Events ({events.upcoming.length})
              </button>
              <button
                onClick={() => setActiveTab('past')}
                className={`px-6 py-2.5 rounded-full font-heading font-semibold text-sm transition-all duration-300 cursor-pointer ${
                  activeTab === 'past'
                    ? 'gradient-primary text-white shadow-md'
                    : 'text-gray-500 hover:text-dark'
                }`}
              >
                Past Campaigns ({events.past.length})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Events List/Grid */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          {activeTab === 'upcoming' ? (
            <div className="max-w-4xl mx-auto space-y-8">
              {events.upcoming.length > 0 ? (
                events.upcoming.map((event, i) => {
                  const { day, month, year } = formatDate(event.date);
                  return (
                    <AnimatedSection key={event.id} direction="up" delay={i * 0.05}>
                      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 flex flex-col md:flex-row">
                        {/* Date badge and category on top of image for mobile */}
                        <div className="relative md:w-1/3 aspect-video md:aspect-auto min-h-[200px] overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                          <span className="absolute top-4 left-4 bg-primary text-white font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider">
                            {event.category}
                          </span>
                        </div>

                        {/* Event Details */}
                        <div className="p-6 md:p-8 flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-4 text-xs text-gray-400 mb-3 font-semibold uppercase tracking-wider">
                              <span className="text-primary flex items-center gap-1">
                                <Calendar size={14} />
                                {month} {day}, {year}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock size={14} />
                                {event.time}
                              </span>
                            </div>

                            <h3 className="font-heading font-bold text-dark text-xl md:text-2xl mb-3 hover:text-primary transition-colors">
                              {event.title}
                            </h3>

                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                              {event.description}
                            </p>
                          </div>

                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-gray-100 pt-5 mt-auto">
                            <div className="flex items-center gap-2 text-gray-500 text-sm">
                              <MapPin size={16} className="text-primary shrink-0" />
                              <span className="truncate">{event.location}</span>
                            </div>

                            <a
                              href="#contact"
                              onClick={(e) => {
                                e.preventDefault();
                                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="inline-flex items-center gap-2 gradient-primary hover:shadow-primary/30 text-white font-heading font-semibold text-xs px-5 py-2.5 rounded-full transition-all cursor-pointer shadow-md"
                            >
                              Register to Volunteer
                              <ArrowUpRight size={14} />
                            </a>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  );
                })
              ) : (
                <div className="text-center py-12 text-gray-400">No upcoming events listed at this time.</div>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {events.past.length > 0 ? (
                events.past.map((event, i) => {
                  const { day, month, year } = formatDate(event.date);
                  return (
                    <AnimatedSection key={event.id} direction="up" delay={i * 0.05}>
                      <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 flex flex-col h-full">
                        <div className="relative aspect-video overflow-hidden">
                          <img
                            src={event.image}
                            alt={event.title}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                          />
                          <span className="absolute top-4 left-4 bg-dark/70 text-white font-semibold text-xs px-3 py-1 rounded-full uppercase tracking-wider backdrop-blur-sm">
                            {event.category}
                          </span>
                        </div>

                        <div className="p-6 flex-grow flex flex-col justify-between">
                          <div>
                            <div className="flex items-center gap-2 text-xs text-primary mb-3 font-semibold uppercase tracking-wider">
                              <Calendar size={14} />
                              {month} {day}, {year}
                            </div>

                            <h3 className="font-heading font-bold text-dark text-lg md:text-xl mb-3">
                              {event.title}
                            </h3>

                            <p className="text-gray-500 text-sm leading-relaxed mb-6">
                              {event.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between border-t border-gray-100 pt-4 mt-auto">
                            <span className="flex items-center gap-2 text-gray-500 text-xs font-medium">
                              <MapPin size={14} className="text-primary shrink-0" />
                              <span className="max-w-[150px] truncate">{event.location}</span>
                            </span>

                            <span className="flex items-center gap-1.5 bg-green-50 text-green-600 px-3 py-1 rounded-full text-xs font-semibold">
                              <Users size={12} />
                              {event.attendees.toLocaleString()}+ Impacted
                            </span>
                          </div>
                        </div>
                      </div>
                    </AnimatedSection>
                  );
                })
              ) : (
                <div className="text-center py-12 text-gray-400 col-span-2">No past events recorded.</div>
              )}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
