import type { MetadataRoute } from 'next'
import { siteConfig } from '@config'

export default function sitemap(): MetadataRoute.Sitemap {
    const routes = [
        '',
        '/asociaciones',
        // Add other static routes here
    ]

    return routes.map((route) => ({
        url: `https://${siteConfig.domain}${route}`,
        lastModified: new Date(),
        changeFrequency: 'weekly',
        priority: route === '' ? 1 : 0.8,
    }))
}
