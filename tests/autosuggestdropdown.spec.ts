import {test, expect, Locator} from '@playwright/test';

test("Auto suggest dropdown", async ({page}) =>{
    await page.goto("https://www.flipkart.com/");

    await page.locator("input[name='q']:not([readonly])").fill("smart");  //search text

    await page.waitForTimeout(5000);  //wait for previous step to search - since it's a ajax call - the server will return the response, so explicit wait should be mentioned

    //get all suggested options --> ctrl+shift+p on DOM --> emulate focused page
    const options:Locator = page.locator("ul>li");
    
    const count = await options.count();
    console.log("Number of suggested options:", count);

    await page.waitForTimeout(5000);

    //print all the suggested options in the console
    console.log("5th option:", await options.nth(5).innerText());
    
    console.log("Printing all auto suggestions")
    for(let i=0; i<count; i++){
        //console.log(await options.nth(i).innerText());
        console.log(await options.nth(i).textContent());
    }

    //search 'smart' and click on smartphone option
    for(let i=0; i<count; i++){
        const text = await options.nth(i).innerText();
        if(text == 'smartphone'){
            console.log(text);
            await options.nth(i).click();  //click the option
            break; //break after it is clicked
        } 
    }

    await page.waitForTimeout(5000);
})