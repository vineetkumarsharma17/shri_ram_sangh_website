import { Link } from 'react-router-dom';
import { Heart, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useDataContext } from '@/hooks/useWebsiteData';
import AnimatedSection from './AnimatedSection';

export default function Footer() {
  const { data } = useDataContext();
  if (!data) return null;

  const { organization, footer, contact, socialMedia } = data;
  const year = new Date().getFullYear();

  const socialIcons: Record<string, React.ReactNode> = {
    facebook: <Facebook size={18} />,
    instagram: <Instagram size={18} />,
    twitter: <Twitter size={18} />,
    youtube: <Youtube size={18} />,
  };

  return (
    <footer className="relative bg-dark text-white overflow-hidden" role="contentinfo">
      {/* Top wave divider */}
      <div className="absolute top-0 left-0 right-0" aria-hidden="true">
        <svg viewBox="0 0 1440 100" preserveAspectRatio="none" className="w-full h-[40px] md:h-[60px]">
          <path fill="#1A1A1A" d="M0,64L80,58.7C160,53,320,43,480,48C640,53,800,75,960,80C1120,85,1280,75,1360,69.3L1440,64L1440,0L0,0Z" />
        </svg>
      </div>

      {/* Decorative blobs */}
      <div className="absolute top-20 -right-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl" aria-hidden="true" />
      <div className="absolute bottom-20 -left-32 w-48 h-48 rounded-full bg-secondary/5 blur-3xl" aria-hidden="true" />

      <div className="container-custom pt-24 pb-8">
        <AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-16">
            {/* Column 1: About */}
            <div>
              <Link to="/" className="flex items-center gap-3 mb-5 group">
                <img
                  src={organization.logo}
                  alt={organization.logoAlt}
                  className="w-10 h-10 rounded-full object-cover bg-white"
                  loading="lazy"
                />
                <span className="text-white font-heading font-bold text-lg">{organization.name}</span>
              </Link>
              <p className="text-white/50 text-sm leading-relaxed mb-6">
                {footer.description}
              </p>
              <div className="flex gap-3">
                {Object.entries(socialMedia).map(([platform, url]) => {
                  if (platform === 'whatsapp') return null;
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-9 h-9 rounded-full bg-white/5 hover:bg-primary/20 hover:text-primary flex items-center justify-center text-white/50 transition-all duration-300"
                      aria-label={`Follow us on ${platform}`}
                    >
                      {socialIcons[platform]}
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="text-white font-heading font-semibold text-lg mb-5">Quick Links</h3>
              <ul className="space-y-3">
                {footer.quickLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/50 hover:text-primary transition-colors text-sm inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 3: Activities */}
            <div>
              <h3 className="text-white font-heading font-semibold text-lg mb-5">Our Activities</h3>
              <ul className="space-y-3">
                {footer.activityLinks.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/50 hover:text-primary transition-colors text-sm inline-flex items-center gap-2 group"
                    >
                      <span className="w-1 h-1 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Column 4: Contact */}
            <div>
              <h3 className="text-white font-heading font-semibold text-lg mb-5">Contact Info</h3>
              <ul className="space-y-4">
                <li className="flex items-start gap-3 text-sm">
                  <MapPin size={16} className="text-primary mt-0.5 shrink-0" />
                  <span className="text-white/50">
                    {contact.address.line1}, {contact.address.line2}, {contact.address.city}, {contact.address.state} - {contact.address.pincode}
                  </span>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Phone size={16} className="text-primary shrink-0" />
                  <a href={`tel:${contact.phone[0]}`} className="text-white/50 hover:text-primary transition-colors">
                    {contact.phone[0]}
                  </a>
                </li>
                <li className="flex items-center gap-3 text-sm">
                  <Mail size={16} className="text-primary shrink-0" />
                  <a href={`mailto:${contact.email[0]}`} className="text-white/50 hover:text-primary transition-colors">
                    {contact.email[0]}
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </AnimatedSection>

        {/* Bottom bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-white/30 text-sm">
            {footer.copyright.replace('{year}', String(year))}
          </p>
          <p className="text-white/30 text-sm flex items-center gap-1">
            {footer.madeWith.split('❤️')[0]}
            <Heart size={14} className="text-primary fill-primary" />
            {footer.madeWith.split('❤️')[1]}
          </p>
        </div>
      </div>
    </footer>
  );
}
