/* ── Navigation ── */
export interface NavItem {
  label: string;
  path: string;
  id: string;
}

/* ── Organization ── */
export interface Organization {
  name: string;
  tagline: string;
  shortDescription: string;
  logo: string;
  logoAlt: string;
  favicon: string;
  foundedYear: number;
  registrationNumber: string;
  pan: string;
  section80G: string;
  section12A: string;
}

/* ── Hero ── */
export interface HeroStat {
  value: number;
  suffix: string;
  label: string;
}

export interface CTAButton {
  label: string;
  path: string;
  variant: 'primary' | 'secondary';
}

export interface Hero {
  title: string;
  subtitle: string;
  backgroundImage: string;
  ctaButtons: CTAButton[];
  stats: HeroStat[];
}

/* ── About ── */
export interface Highlight {
  icon: string;
  title: string;
  description: string;
}

export interface About {
  title: string;
  subtitle: string;
  description: string;
  extendedDescription: string;
  image: string;
  highlights: Highlight[];
}

/* ── History ── */
export interface TimelineEntry {
  year: string;
  title: string;
  description: string;
}

export interface History {
  title: string;
  subtitle: string;
  timeline: TimelineEntry[];
}

/* ── Vision ── */
export interface Vision {
  title: string;
  subtitle: string;
  statement: string;
  points: string[];
}

/* ── Mission ── */
export interface FocusArea {
  icon: string;
  title: string;
  description: string;
}

export interface Mission {
  title: string;
  subtitle: string;
  statement: string;
  focusAreas: FocusArea[];
}

/* ── Objectives ── */
export interface Objectives {
  title: string;
  subtitle: string;
  list: string[];
}

/* ── Founder ── */
export interface Founder {
  name: string;
  designation: string;
  photo: string;
  message: string;
  shortQuote: string;
}

/* ── Team ── */
export interface TeamMember {
  name: string;
  designation: string;
  photo: string;
  bio: string;
  social: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  category: string;
}

export interface Team {
  title: string;
  subtitle: string;
  members: TeamMember[];
}

/* ── Activities ── */
export interface ActivityStat {
  value: string;
  label: string;
}

export interface Activity {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  image: string;
  icon: string;
  stats: ActivityStat;
  gallery: string[];
}

export interface Activities {
  title: string;
  subtitle: string;
  items: Activity[];
}

/* ── Events ── */
export interface UpcomingEvent {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  description: string;
  image: string;
  category: string;
}

export interface PastEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  description: string;
  image: string;
  category: string;
  attendees: number;
}

export interface Events {
  title: string;
  subtitle: string;
  upcoming: UpcomingEvent[];
  past: PastEvent[];
}

/* ── Gallery ── */
export interface GalleryImage {
  src: string;
  alt: string;
  category: string;
}

export interface Gallery {
  title: string;
  subtitle: string;
  categories: string[];
  images: GalleryImage[];
}

/* ── Documents ── */
export interface DocumentItem {
  title: string;
  description: string;
  image: string;
  pdf: string;
}

export interface Documents {
  title: string;
  subtitle: string;
  items: DocumentItem[];
}

/* ── Contact ── */
export interface Address {
  line1: string;
  line2: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface Contact {
  title: string;
  subtitle: string;
  address: Address;
  phone: string[];
  email: string[];
  workingHours: string;
  map: {
    embedUrl: string;
    latitude: number;
    longitude: number;
  };
}

/* ── Social Media ── */
export interface SocialMedia {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  whatsapp: string;
}

/* ── Footer ── */
export interface FooterLink {
  label: string;
  path: string;
}

export interface Footer {
  description: string;
  quickLinks: FooterLink[];
  activityLinks: FooterLink[];
  copyright: string;
  madeWith: string;
}

/* ── SEO ── */
export interface PageSEO {
  title: string;
  description: string;
}

export interface SEO {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  keywords: string[];
  siteUrl: string;
  ogImage: string;
  twitterHandle: string;
  pages: Record<string, PageSEO>;
}

/* ── Theme ── */
export interface Theme {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    dark: string;
    light: string;
    primaryGradient: string;
    heroGradient: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

/* ── Root Data Type ── */
export interface WebsiteData {
  organization: Organization;
  navigation: NavItem[];
  hero: Hero;
  about: About;
  history: History;
  vision: Vision;
  mission: Mission;
  objectives: Objectives;
  founder: Founder;
  team: Team;
  activities: Activities;
  events: Events;
  gallery: Gallery;
  documents: Documents;
  contact: Contact;
  socialMedia: SocialMedia;
  footer: Footer;
  seo: SEO;
  theme: Theme;
}
