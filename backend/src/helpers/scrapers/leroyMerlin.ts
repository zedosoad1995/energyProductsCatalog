import puppeteer from 'puppeteer'
import { PROVIDERS } from '../../constants'
import { firstLetterUpper } from '../strings'

export const run = async (mainPageUrl: string, category: string) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/105.0.0.0 Safari/537.36')

    const urls = []
    let pageNum = 1
    let isLastPage = false
    while (!isLastPage) {
        await page.goto(`${mainPageUrl}&pag=${pageNum}`)
        try {
            await page.click('button#onetrust-accept-btn-handler')
        } catch (err) {
        }

        const cookies = await page.cookies()
        await page.setCookie(...cookies)

        const products = await page.$$('div.product-item > a')

        if (products.length === 0) break

        for (const prod of products) {
            const url = await prod.evaluate(el => el.getAttribute("href"))
            urls.push(`https://www.leroymerlin.pt${url}`)
        }

        pageNum += 1
    }

    const products = []

    for (const url of urls) {
        try {
            await page.goto(url)
        } catch (err) {
            continue
        }
        try {
            await page.click('button#onetrust-accept-btn-handler')
        } catch (err) {
        }
        const el = await page.$('h1[itemprop="name"]')
        const name = await el.evaluate(el => el.textContent)

        const currPrice = await page.$('div.current-price')
        let oldPrice = await (await page.$('div.old-price')).evaluate(el => el.textContent)
        oldPrice = oldPrice.replace(',', '.')
        oldPrice = oldPrice.substring(0, oldPrice.length - 1)
        const priceInt = await (await currPrice.$('span.price-int')).evaluate(el => el.textContent)
        const priceDec = await (await currPrice.$('span.price-dec')).evaluate(el => el.textContent)

        await page.click('.expandtabContent_btn')

        const attrs = {
            'Marca': '',
            'Marca do produto': '',
            'EAN': ''
        }

        const rows = await page.$$('.d-flex.att')
        for (const row of rows) {
            const cols = await row.$$('div')
            const key = await cols[0].evaluate(el => el.textContent)
            const attr = await cols[1].evaluate(el => el.textContent)
            if (key in attrs) attrs[key] = attr
        }

        try {
            const product = {
                url,
                ean: attrs.EAN,
                brand: attrs.Marca === '' ? firstLetterUpper(attrs['Marca do produto']) : attrs.Marca,
                discount: Number(oldPrice) === 0 ? 0 : 100 * (1 - Number(`${priceInt}.${priceDec.substring(2)}`) / Number(oldPrice)),
                price: Number(`${priceInt}.${priceDec.substring(2)}`),
                name: firstLetterUpper(name.trim().split(/[\n\t]+/).at(-1)),
                category,
                provider: PROVIDERS.LEROY_MERLIN
            }
            products.push(product)
        } catch (err) {
            console.log(err)
        }
    }
    await browser.close()
    return products
}
