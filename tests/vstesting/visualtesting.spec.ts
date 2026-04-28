import {test, expect} from '@playwright/test';

test("VS testing", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");

    //Compare snapshot of the page
    //Approach1
    expect(await page.screenshot()).toMatchSnapshot('homepage.png');

    //Approach2
    //await expect(page).toHaveScreenshot();

    //Compare snapshot of the element
    const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
    expect(await logo.screenshot()).toMatchSnapshot('element.png');

})