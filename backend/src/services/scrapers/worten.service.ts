import axios from 'axios'
import _ from 'lodash'


const urlBase = 'https://www.worten.pt/grandes-eletrodomesticos/aquecimento-de-agua/esquentadores'
const category = 'Esquentadores'

let pageNum = 1

export const runScraper = async () => {
    let products = []

    while (true) {
        const urlProdsPage = `${urlBase}?sort_by=name&x-event-type=product_list%3Arefresh&page=${pageNum}`

        const axiosConfig = {
            headers: {
                'x-render-partials': 'true',
                'x-render-events': 'product_filters:changed',
            }
        }
        let {
            products: prodBatch,
            count,
            offset: { max: pageMax }
        } = await axios.get(urlProdsPage, axiosConfig)
            .then(resp => {
                return (Object.values(resp.data.modules)
                    .find((module: any) => module?.model?.template === 'product_list') as any)
                    .model
            })
            .catch(err => { throw err })

        const prodKeys = ['ean', 'name', 'brand', 'category_path', 'price', 'striked_price', 'default_url']
        prodBatch = prodBatch.map(prod => _.pick(prod, ...prodKeys))
        products = products.concat(...prodBatch)

        if (pageMax === count) break

        pageNum += 1
    }

    products = products
        .filter(prod => prod.category_path.at(-1).trim() === category)
        .map(prod => {
            return {
                ean: prod.ean,
                name: prod.name,
                brand: prod.brand,
                price: prod.price,
                discount: (1 - prod.price / prod.striked_price) * 100,
                url: `https://www.worten.pt/${prod.default_url}`
            }
        })

    console.log(products)
}
