import { FileText, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDataContext } from '@/hooks/useWebsiteData';
import AnimatedSection from '@/components/AnimatedSection';
import SectionHeading from '@/components/SectionHeading';

export default function CertificatesPreview() {
  const { data } = useDataContext();
  if (!data) return null;
  const { documents } = data;

  return (
    <section className="section-padding bg-white" id="certificates-preview">
      <div className="container-custom">
        <SectionHeading title={documents.title} subtitle={documents.subtitle} />

        <div className="grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {documents.items.map((doc, i) => (
            <AnimatedSection key={i} direction="up" delay={i * 0.1}>
              <a
                href={doc.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="group block bg-light rounded-2xl overflow-hidden border border-gray-100 hover:border-primary/20 hover:shadow-xl transition-all duration-500"
              >
                {/* Preview image */}
                <div className="relative h-48 overflow-hidden bg-gray-100">
                  <img
                    src={doc.image}
                    alt={doc.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/20 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-white/80 flex items-center justify-center">
                      <ExternalLink size={20} className="text-primary" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-2">
                    <FileText size={16} className="text-primary" />
                    <h3 className="font-heading font-semibold text-dark text-base group-hover:text-primary transition-colors">
                      {doc.title}
                    </h3>
                  </div>
                  <p className="text-gray-500 text-sm">{doc.description}</p>
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-8">
          <Link
            to="/certificates"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
          >
            View All Certificates <ExternalLink size={16} />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
