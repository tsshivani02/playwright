import {test, expect} from '@playwright/test';

test("Screen shot demo", async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");

    const timestamp = Date.now() //will return the current date and time

    //If we run this code again, new ss will replace the older ss since there is only 1 file name
    //So to avoid this, we attach the timestamp to each ss
    //1.Page screenshot
    //await page.screenshot({path : 'screenshots/'+'homepage'+timestamp+'.png'}); //will take the ss and store it in the specified location

    //2.Full page screenshot
    //await page.screenshot({path : 'screenshots/'+'fullpage'+timestamp+'.png', fullPage:true});

    //3. Specific element screenshot
    //const logo = page.locator("img[alt='Tricentis Demo Web Shop']");
    //await logo.screenshot({path : 'screenshots/'+'logo'+timestamp+'.png'});

    //3.1
    await page.locator(".product-grid").screenshot({path : 'screenshots/'+'featuredprdts'+timestamp+'.png'})
})

test.only("Screen shot from config", async ({page}) => {

  await page.goto('https://demoblaze.com/index.html');
  await page.getByRole('link', { name: 'Log in' }).click();
  await page.locator('#loginusername').fill('pavanol');
  //await page.locator('#loginpassword').fill('test@123x');
  await page.locator('#loginpassword').fill('test@123'); //incorrect pw
  await page.getByRole('button', { name: 'Log in' }).click();
  await expect(page.locator('#nameofuser')).toContainText('Welcome pavanol');
  await page.getByRole('link', { name: 'Log out' }).click();
});

