import puppeteer, { product } from 'puppeteer'
import { PROVIDERS } from '../../constants'
import { firstLetterUpper } from '../strings'
import axios from 'axios'
import { load } from 'cheerio'


export const run = async (mainPageUrl: string, category: string) => {
    let browser = await puppeteer.launch({
        headless: true,
        executablePath: '/usr/bin/chromium-browser',
        args: [
            '--no-sandbox',
            '--headless',
            '--disable-gpu',
            '--disable-dev-shm-usage',
            '--force-gpu-mem-available-mb'
        ]
    })
    let page = await browser.newPage()

    const urls = []
    let pageNum = 1
    let isLastPage = false
    while (!isLastPage) {
        console.log(pageNum)
        await page.goto(`${mainPageUrl}&pag=${pageNum}`)
        try {
            await page.click('button#onetrust-accept-btn-handler')
            console.log('cookie')
        } catch (err) {
        }

        const cookies = await page.cookies()
        await page.setCookie(...cookies)

        const productsEl = await page.$$('div.product-item > a')

        if (productsEl.length === 0) break

        for (const prod of productsEl) {
            const url = await prod.evaluate(el => el.getAttribute("href"))
            urls.push(`https://www.leroymerlin.pt${url}`)
        }

        pageNum += 1
    }
    await browser.close()



    const products = []

    for (const url of urls) {
        console.log(url)


        let resp
        try {
            resp = await axios.get(url)

            if (resp.data.includes('onetrust-accept-btn-handler')) {
                console.log('Cookies Popup')
                continue
            }
        } catch (err) {
            console.log('Invalid URL')
            continue
        }

        let $ = load(resp.data)

        let el = $('h1[itemprop="name"]').first()
        const name = firstLetterUpper(el.text().trim().split(/[\n\t]+/).at(-1))

        let oldPriceStr = $('div.old-price').first().text()
        oldPriceStr = oldPriceStr.replace(',', '.')
        const oldPrice = Number(oldPriceStr.substring(0, oldPriceStr.length - 1))

        let priceInt = $('span.price-int').first().text()
        let priceDec = $('span.price-dec').first().text()
        priceDec = priceDec.substring(2)
        const currPrice = Number(`${priceInt}.${priceDec}`)

        const attrs = {
            'Marca': '',
            'Marca do produto': '',
            'EAN': ''
        }


        $('div.d-flex.att').each((_, el) => {
            const cols = $(el).find('div')

            const key = $(cols.get(0)).text()
            const attr = $(cols.get(1)).text()
            if (key in attrs) attrs[key] = attr
        })

        try {
            const product = {
                url,
                ean: attrs.EAN,
                brand: attrs.Marca === '' ? firstLetterUpper(attrs['Marca do produto']) : attrs.Marca,
                discount: oldPrice === 0 ? 0 : 100 * (1 - currPrice / oldPrice),
                price: currPrice,
                name,
                category,
                provider: PROVIDERS.LEROY_MERLIN
            }
            products.push(product)
        } catch (err) {
            console.log(err)
        }
    }

    return products
}
