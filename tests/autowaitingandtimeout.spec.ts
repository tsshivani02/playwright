import {test, expect} from '@playwright/test';

test("Auto waiting and forcing", async ({page}) =>{
    test.setTimeout(50000); //local
    test.slow(); //Default is 30 secs, this will triple the default (90 secs)
    await page.goto("https://demowebshop.tricentis.com/");

    //Assertion - auto wait works
    await expect(page).toHaveURL("https://demowebshop.tricentis.com/");
    await expect(page.locator("text=Welcome to our store")).toBeVisible({timeout: 10000}); //local

    //Action - auto wait works
    await page.locator("#small-searchterms").fill("Laptop", {force:true}); //Force action(it will not perform actionability checks)
    await page.locator(".search-box-button").click({force:true}); //Force action
})