import axios from 'axios'
import _ from 'lodash'
import { IWortenProductsCatalog } from '../../types/wortenScraper'
import { IProduct } from '../../types/scraper'
import { CATEGORIES, PROVIDERS } from '../../constants'
import { firstLetterUpper } from '../strings'


const axiosConfig = {
    headers: {
        'x-render-partials': 'true',
        'x-render-events': 'product_filters:changed',
    }
}

const categoryTranslated = {
    [CATEGORIES.ESQUENTADOR]: 'Esquentadores',
    [CATEGORIES.TERMOACUMULADOR]: 'Termoacumuladores',
}

export const run = async (urlBase: string, category: string): Promise<IProduct[]> => {
    let pageNum = 1
    let products = []

    while (true) {
        const urlProdsPage = `${urlBase}?sort_by=name&x-event-type=product_list%3Arefresh&page=${pageNum}`

        let {
            products: prodBatch,
            count,
            offset: { max: pageMax }
        } = await axios.get<IWortenProductsCatalog>(urlProdsPage, axiosConfig)
            .then(resp => {
                return Object.values(resp.data.modules)
                    .find(module => module?.model?.template === 'product_list')
                    .model
            })
            .catch(err => { throw err })

        const prodKeys = ['ean', 'name', 'brand', 'category_path', 'price', 'striked_price', 'default_url']
        prodBatch = prodBatch.map(prod => _.pick(prod, ...prodKeys))
        products = products.concat(...prodBatch)

        if (pageMax === count) break

        pageNum += 1
    }

    const transformedProducts = products
        .filter(prod => prod.category_path.at(-1).trim() === categoryTranslated[category])
        .map(prod => {
            return {
                ean: prod.ean,
                name: prod.name,
                brand: firstLetterUpper(prod.brand),
                price: prod.price,
                discount: (1 - prod.price / prod.striked_price) * 100,
                url: `https://www.worten.pt/${prod.default_url}`,
                category,
                provider: PROVIDERS.WORTEN
            }
        })

    return transformedProducts
}
