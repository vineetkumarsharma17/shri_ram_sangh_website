import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDataContext } from '@/hooks/useWebsiteData';
import AnimatedSection from '@/components/AnimatedSection';
import SectionHeading from '@/components/SectionHeading';

export default function EventsSection() {
  const { data } = useDataContext();
  if (!data) return null;
  const { events } = data;

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  return (
    <section className="section-padding bg-dark relative overflow-hidden" id="events-section">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 w-48 h-48 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <SectionHeading title={events.title} subtitle={events.subtitle} light />

        {/* Upcoming Events */}
        <div className="mb-16">
          <AnimatedSection>
            <h3 className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-6">Upcoming Events</h3>
          </AnimatedSection>
          <div className="grid md:grid-cols-3 gap-6">
            {events.upcoming.map((event, i) => (
              <AnimatedSection key={event.id} direction="up" delay={i * 0.1}>
                <div className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:border-primary/30 transition-all duration-500">
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/80 to-transparent" />
                    {/* Category badge */}
                    <span className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary/90 text-white text-xs font-medium">
                      {event.category}
                    </span>
                  </div>
                  <div className="p-5">
                    <div className="flex items-center gap-4 text-white/40 text-xs mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar size={12} /> {formatDate(event.date)}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin size={12} /> {event.location.split(',')[0]}
                      </span>
                    </div>
                    <h4 className="font-heading font-semibold text-white text-lg mb-2 group-hover:text-primary transition-colors">
                      {event.title}
                    </h4>
                    <p className="text-white/50 text-sm line-clamp-2">{event.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>

        {/* Past Events Preview */}
        <AnimatedSection>
          <h3 className="text-white/60 text-sm font-semibold tracking-widest uppercase mb-6">Recent Events</h3>
        </AnimatedSection>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {events.past.slice(0, 4).map((event, i) => (
            <AnimatedSection key={event.id} direction="up" delay={i * 0.08}>
              <div className="group relative rounded-xl overflow-hidden h-48">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/40 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <span className="text-primary text-xs font-medium">{formatDate(event.date)}</span>
                  <h4 className="text-white font-heading font-semibold text-sm mt-1 line-clamp-2">{event.title}</h4>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-10">
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
          >
            View All Events <ArrowRight size={18} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
