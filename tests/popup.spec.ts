import {test, expect} from '@playwright/test';

test("Handle tabs", async ({browser}) =>{
    const context = await browser.newContext();

    const page = await context.newPage();
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Multiple popups
    //page.waitForEvent('popup')
    //await page.locator("#PopUp").click();

    await Promise.all([page.waitForEvent('popup'), await page.locator("#PopUp").click()]);

    const allPopupWindows = context.pages();
    console.log("Number of pages/windows:", allPopupWindows.length);

    console.log(allPopupWindows[0].url());
    console.log(allPopupWindows[1].url());
    //console.log(allPopupWindows[2].url());

    for(const pw of allPopupWindows){
        const title = await pw.title();
        if(title.includes('Selenium')){
            await pw.locator("a:has-text('Register now!')").click();
            await pw.close(); //this will close playwright popup window
        }
    }
    
    await page.waitForTimeout(5000);
})