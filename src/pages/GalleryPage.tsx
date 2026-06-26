import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useDataContext } from '@/hooks/useWebsiteData';
import PageHero from '@/components/PageHero';
import AnimatedSection from '@/components/AnimatedSection';
import Lightbox from '@/components/Lightbox';

export default function GalleryPage() {
  const { data } = useDataContext();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!data) return null;
  const { gallery, seo } = data;
  const pageSeo = seo.pages.gallery;

  // Filter images based on selected category
  const filteredImages = useMemo(() => {
    if (selectedCategory === 'All') return gallery.images;
    return gallery.images.filter((img) => img.category === selectedCategory);
  }, [gallery.images, selectedCategory]);

  // Map to the lightbox schema
  const lightboxImages = useMemo(() => {
    return filteredImages.map((img) => ({
      src: img.src,
      alt: img.alt,
    }));
  }, [filteredImages]);

  return (
    <>
      <Helmet>
        <title>{seo.titleTemplate.replace('%s', pageSeo.title)}</title>
        <meta name="description" content={pageSeo.description} />
      </Helmet>

      <PageHero title={gallery.title} subtitle={gallery.subtitle} />

      {/* Categories Filter */}
      <section className="bg-light pt-12 pb-4">
        <div className="container-custom">
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {gallery.categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setLightboxIndex(null);
                }}
                className={`px-5 py-2 rounded-full font-heading font-semibold text-xs transition-all duration-300 cursor-pointer ${
                  selectedCategory === category
                    ? 'gradient-primary text-white shadow-md'
                    : 'bg-white text-gray-500 hover:text-dark border border-gray-100 hover:border-gray-200 shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Images Grid */}
      <section className="section-padding bg-light">
        <div className="container-custom">
          {filteredImages.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredImages.map((image, i) => (
                <AnimatedSection key={i} direction="up" delay={i * 0.03}>
                  <div
                    onClick={() => setLightboxIndex(i)}
                    className="group relative rounded-2xl overflow-hidden aspect-square bg-white shadow-sm border border-gray-100 cursor-pointer"
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-dark/90 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5" />

                    {/* Image Caption & Category Tag */}
                    <div className="absolute inset-x-0 bottom-0 p-5 translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <span className="inline-block bg-primary text-white text-[10px] font-semibold tracking-wider uppercase px-2 py-0.5 rounded mb-2">
                        {image.category}
                      </span>
                      <p className="text-white text-sm font-semibold leading-tight line-clamp-2">
                        {image.alt}
                      </p>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-400">
              No photos found in this category.
            </div>
          )}
        </div>
      </section>

      {/* Lightbox for full screen preview with navigation */}
      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          initialIndex={lightboxIndex}
          isOpen={lightboxIndex !== null}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </>
  );
}
