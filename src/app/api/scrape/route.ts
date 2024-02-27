import puppeteer from "puppeteer"

export async function POST(req: Request) {
    const url = 'https://www.cardkingdom.com/builder'
    const { cards } = await req.json()
    const price = await scrape(url, cards)
    return new Response(JSON.stringify(price))
}

const scrape = async (url: string, cardData: string) => {
    console.log("Commencing scraping...")
    const browser = await puppeteer.launch()
    const page = await browser.newPage()

    try {
        await page.goto(url, { waitUntil: 'domcontentloaded' })
        await page.waitForSelector('.decklist-form')

        // Put data into decklist
        page.focus('textarea[name="cardData"]')
        page.type('textarea[name="cardData"]', cardData)

        await Promise.all([
            page.click('.decklist-form button[role="submit"]'),
            page.waitForFunction(() => {
                // Customize this function based on the changes you expect on the page after form submission
                const resultsHeader = document.querySelector('.search-results-header');
                return resultsHeader && resultsHeader.textContent?.includes('Price:');
            })
        ])


        const price = await page.evaluate(() => {
            const results_header = document.querySelector('.search-results-header')
            if (!results_header) throw new Error('Could not find results header')

            const results = results_header.querySelectorAll('b')
            if (!results || results.length < 2) throw new Error('Could not find results')

            return results[1].textContent
        })

        console.log("Finished scraping...")
        return price
    } catch (error) {
        console.error('Error during scraping:', error)
    } finally {
        await browser.close()
    }
}