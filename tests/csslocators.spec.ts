import {test, expect, Locator} from '@playwright/test'

test("Verify CSS Locators", async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");

    //1. tag#id
    const searchbox:Locator = page.locator("input#small-searchterms");
    //const searchbox:Locator = page.locator("#small-searchterms"); -- we can mention without tag name also
    await expect(searchbox).toBeVisible();
    await searchbox.fill("Laptops");

    //2. tag.class
    await page.locator("input.search-box-text").fill("Laptops");
    //await page.locator(".search-box-text").fill("Laptops");

    //3. tag[attribute=value]
    await page.locator("input[name=q]").fill("Laptops");
    //wait page.locator("[name=q]").fill("Laptops");

    //4. tag.class[attibute=value]
    await page.locator("input.search-box-text[value='Search store']").fill("T-shirts");
    
})