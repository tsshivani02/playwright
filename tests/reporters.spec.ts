import {test, expect} from '@playwright/test';

test.beforeEach("launching app", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");
})

test("Logo test", async({page})=>{
    await expect(page.locator("img[alt='Tricentis Demo Web Shop']")).toBeVisible();
})

test("title test", async({page})=>{
    await expect(page).toHaveTitle("Demo Web Shop");
})

test("Search test", async({page})=>{
    await page.locator(".search-box-text").fill("laptop");
    await page.locator("input[type='submit']").click();
    await expect(page.locator("h2 a").nth(0)).toContainText("laptop", {ignoreCase:true});
})