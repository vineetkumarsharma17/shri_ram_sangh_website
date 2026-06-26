import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useDataContext } from '@/hooks/useWebsiteData';
import AnimatedSection from '@/components/AnimatedSection';
import SectionHeading from '@/components/SectionHeading';
import Lightbox from '@/components/Lightbox';

export default function GalleryPreview() {
  const { data } = useDataContext();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  if (!data) return null;
  const { gallery } = data;
  const previewImages = gallery.images.slice(0, 6);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <section className="section-padding bg-light" id="gallery-preview">
      <div className="container-custom">
        <SectionHeading title={gallery.title} subtitle={gallery.subtitle} />

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {previewImages.map((img, i) => (
            <AnimatedSection key={i} direction="scale" delay={i * 0.05}>
              <button
                className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer w-full"
                onClick={() => openLightbox(i)}
                aria-label={`View ${img.alt}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </svg>
                  </div>
                </div>
                {/* Category tag */}
                <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-dark/60 backdrop-blur-sm text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {img.category}
                </span>
              </button>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-10">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 text-primary font-semibold hover:gap-3 transition-all duration-300"
          >
            View Full Gallery <ArrowRight size={18} />
          </Link>
        </AnimatedSection>
      </div>

      <Lightbox
        images={previewImages.map((img) => ({ src: img.src, alt: img.alt }))}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}
