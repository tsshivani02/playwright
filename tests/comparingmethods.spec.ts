import {test, expect, Locator} from '@playwright/test';

test("Comparing methods", async ({page}) => {
    await page.goto("https://demowebshop.tricentis.com/");

    const products:Locator = page.locator(".product-title");

    //innertext() vs textContent() - will return the text of single web element
    /* console.log(await products.nth(3).innerText()); //returns only the text content
    console.log(await products.nth(3).textContent()); //returns along with space, line break, hidden element

    const count = await products.count()

    for(let i=0; i<count; i++){
        //console.log(await products.nth(i).innerText());
        const productName = await products.nth(i).textContent(); //productname returns null or string
        console.log(productName?.trim()); //so using a optional symbol(?) incase if it's a null
        //since products is not an array we're using just trim
    } */

    //2. allInnertext() vs allTextContent() - will return the text for multiple web elements
    /* //const productNames: string[] = await products.allInnerTexts(); //allinnertxt returns an array
    //console.log("All product names:",productNames);

    const productNames: string[] = await products.allTextContents();
    console.log("All product names:",productNames);

    const productNamesTrimmed:string[] = productNames.map(text => text.trim()); //productNames returns an array so we're using map method to trim
    console.log("Product names after trimmed",productNamesTrimmed)
     */

    //3. all() - converts all Locator type to Locator[], returns (an array of locators) all the locator that the products hold
    const productsLocators:Locator[]=await products.all();
    console.log(productsLocators);

    console.log(await productsLocators[0].innerText());  //returns the text of first productLocator

    for(let prodloc of productsLocators){   //since productsLocators is an array we can use for(of) loop
        console.log(await prodloc.innerText());
    }
})