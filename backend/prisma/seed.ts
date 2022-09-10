import { PrismaClient } from '@prisma/client'
import { CATEGORIES, PROVIDERS } from '../src/constants'
const prisma = new PrismaClient()

async function main() {
    const providers = [PROVIDERS.WORTEN]
    for (const provider of providers) {
        await prisma.provider.upsert({
            where: {
                name: provider
            },
            update: {},
            create: {
                name: provider
            }
        })
    }

    const categories = [CATEGORIES.ESQUENTADOR, CATEGORIES.TERMOACUMULADOR]
    for (const category of categories) {
        await prisma.category.upsert({
            where: {
                name: category
            },
            update: {},
            create: {
                name: category
            }
        })
    }

    const urls = [
        {
            url: 'https://www.worten.pt/grandes-eletrodomesticos/aquecimento-de-agua/esquentadores',
            category: CATEGORIES.ESQUENTADOR,
            provider: PROVIDERS.WORTEN
        },
        {
            url: 'https://www.worten.pt/grandes-eletrodomesticos/aquecimento-de-agua/termoacumuladores',
            category: CATEGORIES.TERMOACUMULADOR,
            provider: PROVIDERS.WORTEN
        },
    ]

    for (const urlInfo of urls) {
        await prisma.catalogUrl.upsert({
            where: {
                url: urlInfo.url
            },
            update: {},
            create: {
                url: urlInfo.url,
                provider: {
                    connect: {
                        name: urlInfo.provider
                    }
                },
                category: {
                    connect: {
                        name: urlInfo.category
                    }
                }
            }
        })
    }

}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })