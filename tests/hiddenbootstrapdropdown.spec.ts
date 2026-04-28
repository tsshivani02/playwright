import {test, expect, Locator} from '@playwright/test';

test("Boostrap hidden dropdwon", async ({page}) =>{
    await page.goto("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login");

    //Login
    await page.locator('input[name="username"]').fill("Admin");
    await page.locator('input[name="password"]').fill("admin123");
    await page.locator('button[type="submit"]').click();

    await page.waitForTimeout(3000);

    //click on PIm
    await page.getByText('PIM').click();
    await page.waitForTimeout(3000);

    //click on Job title dropdown
    await page.locator('form i').nth(2).click();
    await page.waitForTimeout(3000);

    //capture all the options from dropdown
    const options:Locator = page.locator("div[role='listbox'] span");

    const count = await options.count();
    console.log("count of options:", count);

    //print all options
    console.log( await options.allTextContents());  //returns an array

    //other method
    for(let i=0; i<count; i++){
        console.log(await options.nth(i).innerText());
    }

    //select and click a particular option
    for(let i=0; i<count; i++){
        const text = await options.nth(i).innerText();
        if(text === 'Automation Tester'){
            await options.nth(i).click();
            break;
        }
    }

    await page.waitForTimeout(5000);
})