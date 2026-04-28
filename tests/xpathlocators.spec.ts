import {test, expect, Locator} from '@playwright/test'

test("XPath locators", async({page})=>{
    await page.goto("https://demowebshop.tricentis.com/");

    //1.Absoulte xpath
    const abslogo:Locator = page.locator("//html[1]/body[1]/div[4]/div[1]/div[1]/div[1]/a[1]/img[1]");
    await expect(abslogo).toBeVisible();

    //2. Relative xpath
    const rellogo:Locator = page.locator("//img[@alt='Tricentis Demo Web Shop']");
    await expect(rellogo).toBeVisible();

    //contains()
    const prdts:Locator = page.locator("//h2/a[contains(@href,'computer')]") //locates the element that are inside h2/a tag that contains computer keyword
    
    const prdtcount = await prdts.count(); //stores the count of the var
    console.log(prdtcount);
    expect(prdtcount).toBeGreaterThan(0);
    //console.log(await prdts.textContent()) -- this will throw strict mode violation cause we're getting content from var which has multiple values
    console.log(await prdts.first().textContent());
    console.log(await prdts.last().textContent());
    console.log(await prdts.nth(3).textContent()); //index starts from 0

    let prdttitle:string[] = await prdts.allTextContents(); //to get all matched prdts in an array
    for(let i of prdttitle){
        console.log(i);
    } 

    //starts-with()
    const Beginprdts:Locator = page.locator("//h2/a[starts-with(@href,'/build')]")
    console.log(await Beginprdts.count());

    //text()
    const reglink:Locator = page.locator("//a[text()='Register']")
    await expect(reglink).toBeVisible()

    //last()
    const lastline:Locator = page.locator("//div[@class='column follow-us']//li[last()]")
    await expect(lastline).toBeVisible();
    console.log(await lastline.textContent());

    //position()
    const positionat:Locator = page.locator("//div[@class='column follow-us']//li[position()=3]")
    await expect(positionat).toBeVisible();
    console.log(await positionat.textContent());


})