import {test, expect, chromium} from '@playwright/test';

test("Cookies", async()=>{
    const browser = await chromium.launch();
    const context = await browser.newContext();
    const page = await context.newPage();

    context.addCookies(
        [
        {name:'mycookie', value:'387234', url:'https://testautomationpractice.blogspot.com/'}
        //you can add any number of values in this array
        ]
    );

    await page.goto("https://testautomationpractice.blogspot.com/");

    //Get the details of cookie by name
    const allcookies = await context.cookies();
    const retrivedcookies = allcookies.find( (i) => i.name === 'mycookie' );

    console.log("Printing cookie details:", retrivedcookies);
    expect(retrivedcookies?.value).toBe("387234");
    expect(retrivedcookies).toBeDefined();

    //Get all the cookies
    console.log("total cookies created", allcookies.length);
    expect(allcookies.length).toBeGreaterThan(0);

    console.log("Printing all cookies",allcookies);

    //Clear all the cookies from browser
    await context.clearCookies();

    //Verify cookies got cleared
    const cookiescleared = await context.cookies();
    console.log(cookiescleared.length);

})