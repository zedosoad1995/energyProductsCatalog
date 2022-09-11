import { Prisma } from '@prisma/client'
import prisma from '../../prisma/prisma-client'
import { PROVIDERS } from '../constants'
import { IProduct } from '../types/scraper'
import * as wortenScraper from '../helpers/scrapers/worten'

const scrapers = {
    [PROVIDERS.WORTEN]: wortenScraper
}

const upsertProduct = async ({ ean, name, price, discount, brand, category, provider, url }) => {
    const providerId = (await prisma.provider.findFirst({
        where: {
            name: provider
        },
        select: {
            id: true
        }
    })).id

    return prisma.product.upsert({
        where: {
            prodId: {
                ean, providerId
            }
        },
        update: {
            name, price, discount, brand, url, isDeleted: false,
            category: {
                connect: {
                    name: category
                }
            },
        },
        create: {
            ean, name, price, discount, brand, url,
            provider: {
                connect: {
                    name: provider
                }
            },
            category: {
                connect: {
                    name: category
                }
            },
        },

    })
}

const deleteNonExistingProducts = async (products, provider) => {
    const eanProviderConcats = products.map(p => `${p.ean + p.provider}`)

    const idsNotInProducts = await prisma.$queryRaw`
    SELECT concated.id
    FROM(
        SELECT p.id AS id, CONCAT(p.ean, prov.name) AS eanProvider, prov.name AS itemProvider
        FROM public."Product" AS p
        INNER JOIN public."Provider" AS prov
            ON p."providerId" = prov.id
    ) AS concated
    WHERE concated.eanProvider NOT IN (${Prisma.join(eanProviderConcats)})
        AND concated.itemProvider IN (${provider})`
        .then((res: any) => res.map(r => r.id))

    prisma.product.updateMany({
        where: {
            id: {
                in: idsNotInProducts
            }
        },
        data: {
            isDeleted: true
        }
    })

    return idsNotInProducts.length
}

export const runAllScrapers = async () => {
    for (const provider of Object.values(PROVIDERS)) {
        const products = await fetchDataFromProvider(provider)
        const updatedProds = await Promise.all(products.map(p => upsertProduct(p)))
        await deleteNonExistingProducts(products, provider)
    }
}

export const fetchDataFromProvider = async (provider: string): Promise<IProduct[]> => {
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


