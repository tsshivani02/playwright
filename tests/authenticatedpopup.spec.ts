import {test, expect} from '@playwright/test';

test("Handle tabs", async ({browser}) =>{
    const context = await browser.newContext({httpCredentials: {username:'admin', password:'admin'}});

    const page = await context.newPage();
    
    //https://the-internet.herokuapp.com/basic_auth
    //http://username:pw@the-internet.herokuapp.com/basic_auth
    
    //1. Directly pass the login to the url
    /* //await page.goto("https://the-internet.herokuapp.com/basic_auth"); since it is throwing error as its a pop up window use the below method
    await page.goto("http://admin:admin@the-internet.herokuapp.com/basic_auth") //pass the username and pw along with the url

    await page.waitForLoadState(); //wait for the page to load completely

    await expect(page.locator("p:has-text('Congratulations')")).toBeVisible(); */


    //2. Pass the login using browser context
    await page.goto("https://the-internet.herokuapp.com/basic_auth"); //since it is throwing error as its a pop up window use the below method
    
    await page.waitForLoadState(); //wait for the page to load completely

    await expect(page.locator("p:has-text('Congratulations')")).toBeVisible();

})