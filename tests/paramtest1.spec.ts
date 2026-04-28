import {test, expect} from '@playwright/test';

//test data
const searchItems:string[] = ['laptop', 'gift card', 'jewelry', 'monitor'];

//for-of loop
/* for(const item of searchItems){
    test(`Search item for ${item}`, async ({page}) =>{
        await page.goto("https://demowebshop.tricentis.com/");
        await page.locator(".search-box-text").fill(item);
        await page.locator('input[value="Search"]').click();
        await expect(page.locator("h2 a").nth(0)).toContainText(item, {ignoreCase:true})
    })
} */

//using forEach function
/* searchItems.forEach((item)=>{
    test(`Search item for ${item}`, async ({page}) =>{
        await page.goto("https://demowebshop.tricentis.com/");
        await page.locator(".search-box-text").fill(item);
        await page.locator('input[value="Search"]').click();
        await expect(page.locator("h2 a").nth(0)).toContainText(item, {ignoreCase:true})
    })
}) */

//using describe
test.describe("Search items using describe", async() =>{
    searchItems.forEach((item)=>{
        test(`Search item for ${item}`, async ({page}) =>{
            await page.goto("https://demowebshop.tricentis.com/");
            await page.locator(".search-box-text").fill(item);
            await page.locator('input[value="Search"]').click();
            await expect(page.locator("h2 a").nth(0)).toContainText(item, {ignoreCase:true})
        })
    })
})
