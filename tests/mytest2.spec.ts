import {test, expect} from "@playwright/test";


//fixture - global variable: page, browser
test("Verify page URL", async ({page})=>{
    await page.goto("https://playwright.dev/")
    let url:string = page.url()
    console.log("URL:",url)
    await expect(page).toHaveURL(/playwright.dev/)

})