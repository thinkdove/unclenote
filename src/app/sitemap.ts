import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://unclenote.com';

  return [
    {
      url: `${baseUrl}`,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/salary-calculator`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tile-calculator`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wallpaper-calculator`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/flooring-calculator`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/paint-calculator`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/curtain-calculator`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/severance-pay-calculator`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/wage-calculator`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/vat-calculator`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guide`,
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide/first-marriage-age-2025`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guide/divorce-duration-2025`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guide/one-person-household-2025`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guide/salary-percentile-2026`,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
    {
      url: `${baseUrl}/guide/salary-table-2026`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/guide/severance-pay-guide-2026`,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/terms`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/privacy`,
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ];
}
