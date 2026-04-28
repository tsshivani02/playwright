import {test, expect, chromium} from '@playwright/test';

//if browser is passed as parameter to the async function then, you need to create only context and Page
/* test("Browser context demo", async ({browser}) =>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");
}) */

//If context is passed to the async fn, then you need to create only page
/* test("Browser context demo", async ({context}) =>{
    let page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");
})  */

//If is page is passed to the async function, then you need to launch only the URL
/* test("Browser context demo", async ({page}) =>{
    await page.goto("https://testautomationpractice.blogspot.com/");
}) */

//If nothing is passed to the async fn, then you need to create browser, context and Page and pass the name of the browser in the import line or it will take the default broswer mentioned in the config file
test("Browser context demo", async () =>{
    let browser = await chromium.launch();
    let context = await browser.newContext();
    
    //creating 2 pages
    let page1 = await context.newPage();
    let page2 = await context.newPage();
    
    console.log("No. of pages created:", context.pages().length); //counts the no. of pages created for 1 context
    
    await page1.goto("https://testautomationpractice.blogspot.com/");
    await expect(page1).toHaveTitle("Automation Testing Practice");

    await page2.goto("https://www.selenium.dev/");
    await expect(page2).toHaveTitle("Selenium");
}) 



