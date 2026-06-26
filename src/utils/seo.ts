import type { Organization, Contact } from '@/types';

/**
 * Generates JSON-LD structured data for the Organization.
 * This helps search engines understand the entity and its details.
 */
export function generateOrgJsonLd(organization: Organization, contact: Contact, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'NGO',
    'name': organization.name,
    'url': siteUrl,
    'logo': `${siteUrl}${organization.logo}`,
    'description': organization.shortDescription,
    'foundingDate': String(organization.foundedYear),
    'address': {
      '@type': 'PostalAddress',
      'streetAddress': `${contact.address.line1}, ${contact.address.line2}`,
      'addressLocality': contact.address.city,
      'addressRegion': contact.address.state,
      'postalCode': contact.address.pincode,
      'addressCountry': 'IN',
    },
    'contactPoint': {
      '@type': 'ContactPoint',
      'telephone': contact.phone[0],
      'contactType': 'customer service',
      'email': contact.email[0],
    },
    'sameAs': [
      'https://facebook.com/shriramsangh',
      'https://instagram.com/shriramsangh',
      'https://twitter.com/shriramsangh',
      'https://youtube.com/@shriramsangh',
    ],
  };
}
