import { Helmet } from 'react-helmet-async';
import { useDataContext } from '@/hooks/useWebsiteData';
import HeroSection from '@/sections/HeroSection';
import AboutSection from '@/sections/AboutSection';
import MissionVisionSection from '@/sections/MissionVisionSection';
import ActivitiesSection from '@/sections/ActivitiesSection';
import EventsSection from '@/sections/EventsSection';
import GalleryPreview from '@/sections/GalleryPreview';
import FounderSection from '@/sections/FounderSection';
import TeamPreview from '@/sections/TeamPreview';
import CertificatesPreview from '@/sections/CertificatesPreview';
import ContactSection from '@/sections/ContactSection';

export default function HomePage() {
  const { data } = useDataContext();

  const seo = data?.seo.pages.home;

  return (
    <>
      <Helmet>
        <title>{seo?.title || data?.seo.defaultTitle}</title>
        <meta name="description" content={seo?.description || data?.seo.defaultDescription} />
        <meta property="og:title" content={seo?.title || data?.seo.defaultTitle} />
        <meta property="og:description" content={seo?.description || data?.seo.defaultDescription} />
        <meta property="og:image" content={data?.seo.ogImage} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo?.title} />
        <meta name="twitter:description" content={seo?.description} />
        <link rel="canonical" href={data?.seo.siteUrl} />
      </Helmet>

      <HeroSection />
      <AboutSection />
      <MissionVisionSection />
      <ActivitiesSection />
      <EventsSection />
      <GalleryPreview />
      <FounderSection />
      <TeamPreview />
      <CertificatesPreview />
      <ContactSection />
    </>
  );
}
