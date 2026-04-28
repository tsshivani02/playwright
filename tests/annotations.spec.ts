import {expect, test} from '@playwright/test';

//only
test("test1", async({page})=>{   //only will execute that particular test
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle('Google');
})

//skip
test.skip("test2", async({page})=>{  //intentionally skipping the particular test
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle('Google');
})

//Skip the test based on some condition
test("test3", async({page, browserName})=>{  //browserName is predefined var in the config file
    test.skip(browserName==='chromium', 'test is skipped if browser name is Chromium')
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle('Google');
})

//Fail
/* test.fail("test4", async({page})=>{  //intentionally fail the particular test
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle('Google');
}) */

//fixme - this is also same as skip but the code is partially completed here
test.fixme("test5", async({page})=>{  
    await page.goto("https://www.google.com/");
    //await expect(page).toHaveTitle('Google');
})

//slow
test("test6", async({page})=>{  
    test.slow(); //triple the default time(30s, after tripling - 90s)
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle('Google');
})

test.only("Products price", async({page})=>{
    await page.goto("https://demoblaze.com/index.html");
    await page.locator("#login2").click();

    await page.locator("#loginusername").fill("pavanol");
    await page.locator("#loginpassword").fill("test@123");
    await page.locator("button[onclick='logIn()']").click();
    await page.waitForTimeout(2000);

    //To print only the title of 1st product
    console.log(await page.locator(".hrefch").nth(8).textContent());

    //To get all the prices
    console.log(await page.locator(".card h5").allTextContents());
})