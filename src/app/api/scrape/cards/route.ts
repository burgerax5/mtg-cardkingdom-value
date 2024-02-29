import { Card } from "@/lib/model"
import puppeteer, { CookieParam } from "puppeteer"
import { Page } from "puppeteer"
import { connectToDB } from "@/lib/dbutils"

// Scrape all cards
export async function POST(req: Request) {
    const url = 'https://www.cardkingdom.com/catalog/search?search=header&filter%5Bname%5D=&page='
    const cards_data = await scrape(url)
    return new Response(JSON.stringify(cards_data.length))
}

interface ICard {
    name: string;
    edition: string;
    image: string;
    conditions: {
        nm: {
            quantity: number;
            price: number;
        };
        ex: {
            quantity: number;
            price: number;
        };
        vg: {
            quantity: number;
            price: number;
        };
        g: {
            quantity: number;
            price: number;
        };
    }
}

const scrape = async (url: string) => {
    console.log("Commencing scraping...")
    let page_num = 1
    let has_next_page = true
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    let data: ICard[] = []

    try {
        connectToDB()

        // First visit page and set the cookie for no. results per page to be 100
        await page.goto('https://www.cardkingdom.com', { waitUntil: 'domcontentloaded' })
        await setLimitCookie(page)

        // Scrape all the cards from each of the available pages
        while (has_next_page) {
            await new Promise(resolve => setTimeout(resolve, 5000))
            await page.goto(url + page_num, { waitUntil: 'domcontentloaded' })
            await page.waitForSelector('.mainListing')

            const new_cards = await scrape_page_cards(page)
            data = data.concat(new_cards)
            page_num++

            await Card.insertMany(new_cards)

            has_next_page = await page.evaluate(() => {
                return document.querySelector('.mainListing .no-results') ? false : true
            })
        }

        console.log("Finished scraping...")
    } catch (error) {
        console.error('Error during scraping:', error)
    } finally {
        await browser.close()
        return data
    }
}

async function setLimitCookie(page: Page) {
    const cookies = await page.cookies()
    const limitCookie = cookies.find(cookie => cookie.name === 'limit')
    if (limitCookie && limitCookie.value !== '100') {
        limitCookie.value = '100'
        await page.deleteCookie({ name: "limit" })
        await page.setCookie(limitCookie)
    } else if (!limitCookie) {
        const cookie: CookieParam = {
            name: 'limit',
            value: '100',
            domain: 'www.cardkingdom.com'
        }

        page.setCookie(cookie)
    }

    await page.reload()
}

const scrape_page_cards = async (page: Page) => {
    return await page.evaluate(async () => {
        const card_wrappers = Array.from(document.querySelectorAll('.productItemWrapper'))
        const card_collection: ICard[] = []

        const scrape_card_data = async (card_wrapper: Element) => {
            const name = card_wrapper.querySelector('.productDetailTitle')?.textContent as string
            const edition = (card_wrapper.querySelector('.productDetailSet a')?.textContent as string).trim().replace("\n", "")
            const image = card_wrapper.querySelector('.card-image')?.getAttribute("src") as string

            let conditions = {
                nm: { quantity: 0, price: 0 },
                ex: { quantity: 0, price: 0 },
                vg: { quantity: 0, price: 0 },
                g: { quantity: 0, price: 0 }
            }

            const amtAndPrice = Array.from(card_wrapper.querySelectorAll('.itemAddToCart .amtAndPrice'))

            amtAndPrice.map((data, i) => {
                const priceEl = data.querySelector('.stylePrice')
                const qtyEl = data.querySelector('.styleQty')

                let price = 0
                let qty = 0

                if (priceEl !== null) {
                    const txt = priceEl?.textContent as string ? priceEl?.textContent as string : "0"
                    price = parseFloat(txt.replace('$', '').trim())
                }

                if (qty !== null) {
                    const txt = qtyEl?.textContent as string ? qtyEl?.textContent as string : "0"
                    qty = parseInt(txt.trim())
                }

                switch (i) {
                    case 0:
                        conditions.nm.price = price
                        conditions.nm.quantity = qty
                    case 1:
                        conditions.ex.price = price
                        conditions.ex.quantity = qty
                    case 2:
                        conditions.vg.price = price
                        conditions.vg.quantity = qty
                    case 3:
                        conditions.g.price = price
                        conditions.g.quantity = qty
                }
            })

            return { name, edition, image, conditions }
        }

        const scrapePromises = [];

        for (const card_wrapper of card_wrappers) {
            const promise = scrape_card_data(card_wrapper);
            scrapePromises.push(promise);
        }

        // Wait for all promises to resolve using Promise.all
        const card_data = await Promise.all(scrapePromises);
        card_collection.push(...card_data);

        return card_collection;
    })
}