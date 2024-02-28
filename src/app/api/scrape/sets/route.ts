import { addSets } from "@/lib/card"
import puppeteer from "puppeteer"

export async function GET(req: Request) {
    const url = 'https://www.cardkingdom.com/catalog/magic_the_gathering/search'
    const sets = await scrape_sets(url)
    await addSets(sets)
    return new Response(JSON.stringify(sets))
}

const scrape_sets = async (url: string) => {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded' })
        await page.waitForSelector('select[name="filter[edition]"]')

        const editions = await page.evaluate(() => {
            const editions_select = document.querySelector('select[name="filter[edition]"]')
            if (!editions_select) throw new Error('Could not find select element for editions')

            const editions_options = Array.from(editions_select.querySelectorAll('option'))

            const editions: {
                name: string,
                code: string
            }[] = []

            editions_options.map(option => {
                editions.push({
                    name: option?.textContent ? option.textContent : "???",
                    code: option.value
                })
            })

            return editions
        })

        return editions

    } finally {
        browser.close()
    }
}