import prisma from '../../prisma/prisma-client'
import { PROVIDERS } from '../constants'
import { IProduct } from '../types/scraper'
import * as wortenScraper from './scrapers/worten'

const scrapers = {
    [PROVIDERS.WORTEN]: wortenScraper
}


export const runAllScrapers = async (): Promise<IProduct[]> => {
    return (await Promise.all(
        Object.values(PROVIDERS).map(async (provider) => await runScraper(provider))
    )).flat()
}

export const runScraper = async (provider: string): Promise<IProduct[]> => {
    const scraper = scrapers[provider]

    const categories = await prisma.catalogUrl.findMany({
        where: {
            provider: {
                name: provider
            }
        },
        select: {
            url: true,
            category: {
                select: {
                    name: true
                },
            }
        }
    })

    const products = (await Promise.all(
        categories.map(async ({ url, category: { name: category } }) => await scraper.run(url, category))
    )).flat()

    return products
}
