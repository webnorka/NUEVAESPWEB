import type { MetadataRoute } from 'next'
import { siteConfig } from '@config'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/private/', '/admin/'],
        },
        sitemap: `https://${siteConfig.domain}/sitemap.xml`,
    }
}
