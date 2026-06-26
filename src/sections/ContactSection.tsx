import { Phone, Mail, MapPin, Clock, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { useDataContext } from '@/hooks/useWebsiteData';
import AnimatedSection from '@/components/AnimatedSection';
import SectionHeading from '@/components/SectionHeading';

export default function ContactSection() {
  const { data } = useDataContext();
  if (!data) return null;
  const { contact, socialMedia } = data;

  const socialIcons: Record<string, { icon: React.ReactNode; label: string }> = {
    facebook: { icon: <Facebook size={20} />, label: 'Facebook' },
    instagram: { icon: <Instagram size={20} />, label: 'Instagram' },
    twitter: { icon: <Twitter size={20} />, label: 'Twitter' },
    youtube: { icon: <Youtube size={20} />, label: 'YouTube' },
  };

  return (
    <section className="section-padding bg-gradient-to-br from-dark via-dark-light to-dark relative overflow-hidden" id="contact-section">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-secondary/5 blur-3xl" />
      </div>

      <div className="container-custom relative z-10">
        <SectionHeading title={contact.title} subtitle={contact.subtitle} light />

        <div className="grid lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
          {/* Contact Info Cards */}
          <AnimatedSection direction="left">
            <div className="space-y-4">
              {/* Address */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white shrink-0">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Address</h4>
                  <p className="text-white/50 text-sm leading-relaxed">
                    {contact.address.line1}<br />
                    {contact.address.line2}<br />
                    {contact.address.city}, {contact.address.state} - {contact.address.pincode}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white shrink-0">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Phone</h4>
                  {contact.phone.map((ph, i) => (
                    <a key={i} href={`tel:${ph}`} className="block text-white/50 text-sm hover:text-primary transition-colors">
                      {ph}
                    </a>
                  ))}
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white shrink-0">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Email</h4>
                  {contact.email.map((em, i) => (
                    <a key={i} href={`mailto:${em}`} className="block text-white/50 text-sm hover:text-primary transition-colors">
                      {em}
                    </a>
                  ))}
                </div>
              </div>

              {/* Working Hours */}
              <div className="flex items-start gap-4 p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-primary/30 transition-colors duration-300">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center text-white shrink-0">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">Working Hours</h4>
                  <p className="text-white/50 text-sm">{contact.workingHours}</p>
                </div>
              </div>

              {/* Social Media */}
              <div className="flex gap-3 pt-4">
                {Object.entries(socialMedia).map(([platform, url]) => {
                  if (platform === 'whatsapp') return null;
                  const item = socialIcons[platform];
                  if (!item) return null;
                  return (
                    <a
                      key={platform}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-11 h-11 rounded-xl bg-white/5 hover:bg-primary hover:text-white flex items-center justify-center text-white/50 transition-all duration-300 border border-white/10 hover:border-primary"
                      aria-label={`Follow on ${item.label}`}
                    >
                      {item.icon}
                    </a>
                  );
                })}
              </div>
            </div>
          </AnimatedSection>

          {/* Map */}
          <AnimatedSection direction="right">
            <div className="rounded-2xl overflow-hidden border border-white/10 h-full min-h-[400px]">
              <iframe
                src={contact.map.embedUrl}
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '400px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Shri Ram Sangh Location"
              />
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
