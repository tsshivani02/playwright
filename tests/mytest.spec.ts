import {test, expect} from "@playwright/test";


//fixture - global variable: page, browser
test("Verify page title", async ({page})=>{
    await page.goto("https://playwright.dev/")
    console.log(await page.title())
    await expect(page).toHaveTitle("Fast and reliable end-to-end testing for modern web apps | Playwright")

})