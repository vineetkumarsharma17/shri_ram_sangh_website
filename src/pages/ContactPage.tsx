import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDataContext } from '@/hooks/useWebsiteData';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import SectionHeading from '@/components/SectionHeading';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const { data } = useDataContext();
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  if (!data) return null;
  const { contact, seo } = data;
  const pageSeo = seo.pages.contact;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate submission
    setTimeout(() => {
      setFormSubmitted(true);
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
    }, 800);
  };

  return (
    <>
      <Helmet>
        <title>{seo.titleTemplate.replace('%s', pageSeo.title)}</title>
        <meta name="description" content={pageSeo.description} />
      </Helmet>

      <PageHero title={contact.title} subtitle={contact.subtitle} />

      <section className="section-padding bg-light">
        <div className="container-custom">
          <div className="grid lg:grid-cols-12 gap-12 max-w-6xl mx-auto">
            {/* Contact Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <AnimatedSection direction="left">
                <h3 className="font-heading font-extrabold text-dark text-2xl mb-6">
                  Get In Touch
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-8">
                  Have questions about our programs, certifications, or want to volunteer? Send us a message or reach out using the contact information below.
                </p>

                {/* Cards */}
                <div className="space-y-4">
                  {/* Address */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-start gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <MapPin size={20} />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-dark text-sm mb-1">Our Address</h4>
                      <p className="text-gray-500 text-xs leading-relaxed">
                        {contact.address.line1}, {contact.address.line2}<br />
                        {contact.address.city}, {contact.address.state} - {contact.address.pincode}<br />
                        {contact.address.country}
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-start gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Phone size={20} />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-dark text-sm mb-1">Phone Numbers</h4>
                      <div className="space-y-1">
                        {contact.phone.map((num) => (
                          <a
                            key={num}
                            href={`tel:${num}`}
                            className="text-gray-500 text-xs hover:text-primary transition-colors block"
                          >
                            {num}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-start gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Mail size={20} />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-dark text-sm mb-1">Email Addresses</h4>
                      <div className="space-y-1">
                        {contact.email.map((email) => (
                          <a
                            key={email}
                            href={`mailto:${email}`}
                            className="text-gray-500 text-xs hover:text-primary transition-colors block"
                          >
                            {email}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Working Hours */}
                  <div className="bg-white p-5 rounded-2xl border border-gray-100 flex items-start gap-4 shadow-sm">
                    <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0">
                      <Clock size={20} />
                    </div>
                    <div>
                      <h4 className="font-heading font-bold text-dark text-sm mb-1">Office Hours</h4>
                      <p className="text-gray-500 text-xs">{contact.workingHours}</p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            </div>

            {/* Contact Form Column */}
            <div className="lg:col-span-7">
              <AnimatedSection direction="right">
                <div className="bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
                  {formSubmitted ? (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 rounded-full bg-green-50 text-green-600 flex items-center justify-center mx-auto mb-6">
                        <CheckCircle size={36} />
                      </div>
                      <h3 className="font-heading font-bold text-dark text-2xl mb-2">Message Sent!</h3>
                      <p className="text-gray-500 text-sm max-w-sm mx-auto leading-relaxed">
                        Thank you for contacting Shri Ram Sangh. Our team will review your message and get back to you shortly.
                      </p>
                      <button
                        onClick={() => setFormSubmitted(false)}
                        className="mt-8 px-6 py-2.5 rounded-full border border-gray-200 text-sm font-semibold hover:bg-gray-50 transition-colors cursor-pointer"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-gray-700 font-medium text-sm mb-2">Your Name</label>
                          <input
                            type="text"
                            id="name"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm transition-colors bg-light"
                            placeholder="Full name"
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-gray-700 font-medium text-sm mb-2">Email Address</label>
                          <input
                            type="email"
                            id="email"
                            required
                            value={formData.email}
                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm transition-colors bg-light"
                            placeholder="you@example.com"
                          />
                        </div>
                      </div>

                      <div className="grid sm:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="phone" className="block text-gray-700 font-medium text-sm mb-2">Phone Number</label>
                          <input
                            type="tel"
                            id="phone"
                            value={formData.phone}
                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm transition-colors bg-light"
                            placeholder="Optional"
                          />
                        </div>
                        <div>
                          <label htmlFor="subject" className="block text-gray-700 font-medium text-sm mb-2">Subject</label>
                          <input
                            type="text"
                            id="subject"
                            required
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm transition-colors bg-light"
                            placeholder="How can we help you?"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-gray-700 font-medium text-sm mb-2">Your Message</label>
                        <textarea
                          id="message"
                          required
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-primary text-sm transition-colors bg-light resize-none"
                          placeholder="Type your message here..."
                        />
                      </div>

                      <button
                        type="submit"
                        className="w-full inline-flex items-center justify-center gap-2 gradient-primary hover:shadow-primary/30 text-white font-heading font-semibold text-sm py-3.5 rounded-xl transition-all cursor-pointer shadow-md"
                      >
                        <Send size={16} />
                        Send Message
                      </button>
                    </form>
                  )}
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Google Map Embed */}
      <section className="h-[450px] w-full relative overflow-hidden bg-gray-100">
        <iframe
          src={contact.map.embedUrl}
          className="absolute inset-0 w-full h-full border-0"
          allowFullScreen={false}
          loading="lazy"
          title="Shri Ram Sangh Office Location Map"
        />
      </section>
    </>
  );
}
