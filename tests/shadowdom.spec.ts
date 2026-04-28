import {test, expect} from '@playwright/test';

test("Shadow DOM", async ({page})=>{
    await page.goto("https://shop.polymer-project.org/");

    await page.locator("a[aria-label=\"Men's Outerwear Shop Now\"]").click(); //Men's has a single quote so it will throw error, so use \ \ to avoid 
    await page.waitForTimeout(5000);

    const productsFound = await page.locator("div.title").all();
    console.log("Number of products found:", productsFound.length);

    expect(productsFound.length).toBe(16);
    await page.waitForTimeout(3000);
})