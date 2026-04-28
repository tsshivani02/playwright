import {test, expect, Locator} from '@playwright/test'

test("Single select dropdown", async ({page}) =>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //1. select option from the dropdown (4 ways)
    //await page.locator("select#country").selectOption('India');  //by using visible text
    //await page.locator("select#country").selectOption({value:'uk'});  //by using value attribute
    //await page.locator("select#country").selectOption({label:'India'});  //by using label attribute
    await page.locator("select#country").selectOption({index:3});  //by using index attribute

    //check number of options in dropdown (count)
    const dropdrownoptions:Locator = page.locator("#country>option");
    await expect(dropdrownoptions).toHaveCount(10);

    //check an option present in dropdown
    //const optionstext:string[] = await dropdrownoptions.allTextContents(); //returns text along with space
    const optionstext:string[] = (await dropdrownoptions.allTextContents()).map(text => text.trim()); //alltextcontents returns an array, use a map fn on that array, trim each element in the array using text var
    console.log(optionstext);
    expect(optionstext).toContain("Brazil");
    
    //Printing all the options in the dropdown
    for(const i of optionstext){
        console.log(i);
    }

})