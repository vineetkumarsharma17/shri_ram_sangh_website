import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDataContext } from '@/hooks/useWebsiteData';
import AnimatedSection from '@/components/AnimatedSection';
import SectionHeading from '@/components/SectionHeading';
import DynamicIcon from '@/components/DynamicIcon';

export default function ActivitiesSection() {
  const { data } = useDataContext();
  if (!data) return null;
  const { activities } = data;

  return (
    <section className="section-padding bg-light relative overflow-hidden" id="activities-section">
      {/* Decorative */}
      <div className="absolute top-20 right-10 w-48 h-48 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />

      <div className="container-custom relative z-10">
        <SectionHeading title={activities.title} subtitle={activities.subtitle} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {activities.items.slice(0, 8).map((activity, i) => (
            <AnimatedSection key={activity.id} direction="up" delay={i * 0.08}>
              <motion.div
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 h-full flex flex-col"
                whileHover={{ y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={activity.image}
                    alt={activity.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent" />
                  {/* Icon badge */}
                  <div className="absolute top-3 right-3 w-10 h-10 rounded-xl gradient-primary flex items-center justify-center text-white shadow-lg">
                    <DynamicIcon name={activity.icon} size={18} />
                  </div>
                  {/* Stats overlay */}
                  <div className="absolute bottom-3 left-3">
                    <span className="text-white font-bold text-lg font-heading">{activity.stats.value}</span>
                    <span className="text-white/70 text-xs block">{activity.stats.label}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                  <h3 className="font-heading font-semibold text-dark text-lg mb-2 group-hover:text-primary transition-colors">
                    {activity.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">
                    {activity.shortDescription}
                  </p>
                  <div className="mt-4 flex items-center gap-1 text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Learn More <ArrowRight size={14} />
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-10">
          <Link
            to="/activities"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
          >
            View All Activities <ArrowRight size={18} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
