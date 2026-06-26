import { ArrowRight, Facebook, Twitter, Linkedin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDataContext } from '@/hooks/useWebsiteData';
import AnimatedSection from '@/components/AnimatedSection';
import SectionHeading from '@/components/SectionHeading';

const socialIconMap: Record<string, React.ReactNode> = {
  facebook: <Facebook size={14} />,
  twitter: <Twitter size={14} />,
  linkedin: <Linkedin size={14} />,
};

export default function TeamPreview() {
  const { data } = useDataContext();
  if (!data) return null;
  const { team } = data;
  const previewMembers = team.members.slice(0, 4);

  return (
    <section className="section-padding bg-light" id="team-preview">
      <div className="container-custom">
        <SectionHeading title={team.title} subtitle={team.subtitle} />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {previewMembers.map((member, i) => (
            <AnimatedSection key={i} direction="up" delay={i * 0.1}>
              <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500">
                {/* Photo */}
                <div className="relative h-64 overflow-hidden">
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                  {/* Social icons overlay */}
                  <div className="absolute bottom-3 left-0 right-0 flex justify-center gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                    {Object.entries(member.social).map(([platform, url]) => (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-primary transition-colors"
                        aria-label={`${member.name} on ${platform}`}
                      >
                        {socialIconMap[platform]}
                      </a>
                    ))}
                  </div>
                </div>

                {/* Info */}
                <div className="p-5 text-center">
                  <h3 className="font-heading font-semibold text-dark text-lg group-hover:text-primary transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-primary text-sm font-medium">{member.designation}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-10">
          <Link
            to="/team"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
          >
            Meet Our Full Team <ArrowRight size={18} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
