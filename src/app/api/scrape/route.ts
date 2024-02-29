import puppeteer from "puppeteer"
import { Page } from "puppeteer"

export async function GET(req: Request) {
    return new Response(JSON.stringify({
        message: "NOBISHIRO"
    }))
}