import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDataContext } from '@/hooks/useWebsiteData';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import SectionHeading from '@/components/SectionHeading';
import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';

export default function TeamPage() {
  const { data } = useDataContext();
  const [activeCategory, setActiveCategory] = useState<'all' | 'leadership' | 'executive'>('all');

  if (!data) return null;
  const { team, seo } = data;
  const pageSeo = seo.pages.team;

  const socialIcons: Record<string, React.ReactNode> = {
    facebook: <Facebook size={16} />,
    twitter: <Twitter size={16} />,
    linkedin: <Linkedin size={16} />,
    instagram: <Instagram size={16} />,
  };

  const categories = [
    { id: 'all', label: 'All Members' },
    { id: 'leadership', label: 'Leadership' },
    { id: 'executive', label: 'Executive Team' },
  ];

  const filteredMembers = useMemo(() => {
    if (activeCategory === 'all') return team.members;
    return team.members.filter((member) => member.category === activeCategory);
  }, [team.members, activeCategory]);

  return (
    <>
      <Helmet>
        <title>{seo.titleTemplate.replace('%s', pageSeo.title)}</title>
        <meta name="description" content={pageSeo.description} />
      </Helmet>

      <PageHero title={team.title} subtitle={team.subtitle} />

      {/* Category Filter */}
      <section className="bg-light pt-12 pb-4">
        <div className="container-custom flex justify-center">
          <div className="bg-white p-1 rounded-full shadow-sm border border-gray-100 flex gap-1">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`px-6 py-2.5 rounded-full font-heading font-semibold text-xs transition-all duration-300 cursor-pointer ${
                  activeCategory === cat.id
                    ? 'gradient-primary text-white shadow-sm'
                    : 'text-gray-500 hover:text-dark'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Members Grid */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {filteredMembers.map((member, i) => (
              <AnimatedSection key={member.name} direction="up" delay={i * 0.05}>
                <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-500 flex flex-col h-full">
                  {/* Photo container with hover social overlay */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />

                    {/* Social overlay */}
                    <div className="absolute inset-0 bg-dark/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                      {Object.entries(member.social || {}).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-9 h-9 rounded-full bg-white hover:bg-primary text-dark hover:text-white flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110"
                          aria-label={`${member.name}'s ${platform}`}
                        >
                          {socialIcons[platform]}
                        </a>
                      ))}
                    </div>

                    {/* Category tag */}
                    <span className="absolute top-4 left-4 bg-primary text-white text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-md shadow-md">
                      {member.category}
                    </span>
                  </div>

                  {/* Info */}
                  <div className="p-6 text-center flex-grow flex flex-col justify-between">
                    <div>
                      <h3 className="font-heading font-bold text-dark text-lg group-hover:text-primary transition-colors mb-1">
                        {member.name}
                      </h3>
                      <p className="text-primary font-heading font-medium text-xs mb-4">
                        {member.designation}
                      </p>
                      <p className="text-gray-500 text-sm leading-relaxed mb-4">
                        {member.bio}
                      </p>
                    </div>

                    {/* Social links visible in text for mobile/non-hover */}
                    <div className="flex justify-center gap-3 border-t border-gray-100 pt-4 mt-auto">
                      {Object.entries(member.social || {}).map(([platform, url]) => (
                        <a
                          key={platform}
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary transition-colors"
                          aria-label={`${member.name}'s ${platform}`}
                        >
                          {socialIcons[platform]}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
