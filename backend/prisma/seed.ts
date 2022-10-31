import { PrismaClient } from '@prisma/client'
import { CATEGORIES, PROVIDERS } from '../src/constants'
const prisma = new PrismaClient()

async function main() {
    for (const provider of Object.values(PROVIDERS)) {
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

    for (const category of Object.values(CATEGORIES)) {
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
        {
            url: 'https://www.worten.pt/grandes-eletrodomesticos/aquecimento-de-agua/bombas-de-calor',
            category: CATEGORIES.BOMBA_DE_CALOR,
            provider: PROVIDERS.WORTEN
        },
        {
            url: 'https://www.leroymerlin.pt/Produtos/Canalizacao/Esquentadores?orderby=priceup&price-filter=0%2C99999&price-filter-low=0&price-filter-high=99999&facets%5B%5D=ATTI_00874&facets%5B%5D=ATTI_00226&facets%5B%5D=ATTI_00941&facets%5B%5D=ATTI_00949&facets%5B%5D=ATTI_00894&facets%5B%5D=ATT_06575&facets%5B%5D=ATTI_00883&selectorderby=relevance&filterprice=true',
            category: CATEGORIES.ESQUENTADOR,
            provider: PROVIDERS.LEROY_MERLIN
        },
        {
            url: 'https://www.leroymerlin.pt/Produtos/Canalizacao/Termoacumuladores?orderby=priceup&price-filter=0%2C99999&price-filter-low=0&price-filter-high=99999&facets%5B%5D=ATTI_00898&facets%5B%5D=ATTI_00949&facets%5B%5D=ATTI_00952&facets%5B%5D=ATT_20406&facets%5B%5D=ATTI_00963&facets%5B%5D=ATT_00054&facets%5B%5D=ATT_00053&facets%5B%5D=ATT_00055&facets%5B%5D=ATTI_01110&facets%5B%5D=ATT_00628&selectorderby=relevance&filterprice=true',
            category: CATEGORIES.TERMOACUMULADOR,
            provider: PROVIDERS.LEROY_MERLIN
        },
        {
            url: 'https://www.leroymerlin.pt/produtos/aquecimento-e-climatizacao/aquecimento-de-agua/bombas-de-calor?orderby=priceup&price-filter=0%2C99999&price-filter-low=0&price-filter-high=99999&selectorderby=bestresult&filterprice=true',
            category: CATEGORIES.BOMBA_DE_CALOR,
            provider: PROVIDERS.LEROY_MERLIN
        },
        {
            url: 'https://www.leroymerlin.pt/produtos/aquecimento-e-climatizacao/aquecimento-central/caldeiras/caldeiras-a-gas?orderby=priceup&price-filter=0%2C99999&price-filter-low=0&price-filter-high=99999&facets%5B%5D=ATTI_00898&facets%5B%5D=ATTI_00949&facets%5B%5D=ATTI_00952&facets%5B%5D=ATT_20406&facets%5B%5D=ATTI_00963&facets%5B%5D=ATT_00054&facets%5B%5D=ATT_00053&facets%5B%5D=ATT_00055&facets%5B%5D=ATTI_01110&facets%5B%5D=ATT_00628&selectorderby=relevance&filterprice=true',
            category: CATEGORIES.CALDEIRA_A_GAS,
            provider: PROVIDERS.LEROY_MERLIN
        }
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