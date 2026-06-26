import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDataContext } from '@/hooks/useWebsiteData';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import SectionHeading from '@/components/SectionHeading';
import Lightbox from '@/components/Lightbox';
import { FileText, Download, ExternalLink, ShieldCheck } from 'lucide-react';

export default function CertificatesPage() {
  const { data } = useDataContext();
  const [lightboxImage, setLightboxImage] = useState<{ src: string; alt: string } | null>(null);

  if (!data) return null;
  const { documents, organization, seo } = data;
  const pageSeo = seo.pages.certificates;

  return (
    <>
      <Helmet>
        <title>{seo.titleTemplate.replace('%s', pageSeo.title)}</title>
        <meta name="description" content={pageSeo.description} />
      </Helmet>

      <PageHero title={documents.title} subtitle={documents.subtitle} />

      {/* Exemption Information / Trust Cards */}
      <section className="section-padding bg-light pb-4">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 mb-12">
            <AnimatedSection direction="left">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-6">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="font-heading font-bold text-dark text-xl mb-3">80G Tax Exemption</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  Donations made to Shri Ram Sangh are eligible for a **50% tax deduction** under Section 80G of the Income Tax Act. A tax-exemption receipt is issued for every contribution.
                </p>
                <div className="text-primary font-heading font-semibold text-xs bg-primary/5 px-3 py-2 rounded-lg inline-block border border-primary/10">
                  Exemption Number: {organization.section80G}
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right">
              <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center mb-6">
                  <ShieldCheck size={28} />
                </div>
                <h3 className="font-heading font-bold text-dark text-xl mb-3">12A Registration</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-4">
                  Shri Ram Sangh is registered under Section 12A of the Income Tax Act, certifying our organization as a legitimate, non-profit entity dedicated to charitable purposes.
                </p>
                <div className="text-primary font-heading font-semibold text-xs bg-primary/5 px-3 py-2 rounded-lg inline-block border border-primary/10">
                  Registration Number: {organization.section12A}
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Documents Grid */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {documents.items.map((doc, i) => (
              <AnimatedSection key={doc.title} direction="up" delay={i * 0.05}>
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-500 flex flex-col h-full group">
                  {/* Preview Image with zoom & click indicator */}
                  <div
                    onClick={() => setLightboxImage({ src: doc.image, alt: doc.title })}
                    className="relative aspect-[3/4] overflow-hidden bg-gray-50 border-b border-gray-100 cursor-pointer"
                  >
                    <img
                      src={doc.image}
                      alt={doc.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-dark/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white font-heading font-semibold text-xs gap-2">
                      <ExternalLink size={16} />
                      Preview Certificate
                    </div>
                  </div>

                  {/* Body Info */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <FileText size={18} className="text-primary" />
                        <h3 className="font-heading font-bold text-dark text-lg group-hover:text-primary transition-colors">
                          {doc.title}
                        </h3>
                      </div>
                      <p className="text-gray-500 text-sm leading-relaxed mb-6">
                        {doc.description}
                      </p>
                    </div>

                    <a
                      href={doc.pdf}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full inline-flex items-center justify-center gap-2 gradient-primary hover:shadow-primary/30 text-white font-heading font-semibold text-sm py-3 rounded-xl transition-all cursor-pointer shadow-md"
                    >
                      <Download size={16} />
                      Download PDF Document
                    </a>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox for previewing the document images */}
      {lightboxImage && (
        <Lightbox
          images={[lightboxImage]}
          initialIndex={0}
          isOpen={!!lightboxImage}
          onClose={() => setLightboxImage(null)}
        />
      )}
    </>
  );
}
