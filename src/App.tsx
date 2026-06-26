import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainLayout from '@/layouts/MainLayout';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import ActivitiesPage from '@/pages/ActivitiesPage';
import EventsPage from '@/pages/EventsPage';
import GalleryPage from '@/pages/GalleryPage';
import TeamPage from '@/pages/TeamPage';
import CertificatesPage from '@/pages/CertificatesPage';
import ContactPage from '@/pages/ContactPage';
import { DataProvider } from '@/hooks/useWebsiteData';

function App() {
  return (
    <DataProvider>
      <BrowserRouter basename={import.meta.env.BASE_URL}>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<HomePage />} />
            <Route path="about" element={<AboutPage />} />
            <Route path="activities" element={<ActivitiesPage />} />
            <Route path="events" element={<EventsPage />} />
            <Route path="gallery" element={<GalleryPage />} />
            <Route path="team" element={<TeamPage />} />
            <Route path="certificates" element={<CertificatesPage />} />
            <Route path="contact" element={<ContactPage />} />
            {/* Fallback to home */}
            <Route path="*" element={<HomePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
