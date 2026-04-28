import {test, expect, Locator} from '@playwright/test'

test("Multi select dropdown", async ({page}) =>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //1. select option from the dropdown (4 ways)
    //await page.locator("#colors").selectOption(['Red', 'Blue']); //using visible text
    //await page.locator("#colors").selectOption(['red', 'green', 'white']); //using value attribute
    //await page.locator("#colors").selectOption([{label:'Yellow'}, {label:'Red'}, {label:'White'}]); //using label attribute
    await page.locator("#colors").selectOption([{index:0}, {index:1}, {index:2}]); //usig visible text
    
    
    //check number of options in dropdown (count)
    const dropdrownoptions:Locator = page.locator("#colors>option");
    await expect(dropdrownoptions).toHaveCount(7);

    
    //check an option present in dropdown
    const optionstext:string[] = (await dropdrownoptions.allTextContents()).map(text => text.trim()); //alltextcontents returns an array, use a map fn on that array, trim each element in the array using text var
    console.log(optionstext);
    expect(optionstext).toContain("Green");
    
    
    //Printing all the options in the dropdown
    for(const i of optionstext){
        console.log(i);
    }
    

})