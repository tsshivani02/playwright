import {test, expect} from '@playwright/test'

test("Inifinite scrolling", async({page})=>{
    test.slow(); //set timeout for a single test - it will triple the default timeout (30s to 90s)
    await page.goto("https://www.booksbykilo.in/new-books?pricerange=201to500");

    //window.scrollTo(0, document.body.scrollHeight) - this is a js method
    let previousHeight = 0;
    while(true){
        
        //scroll down the page
        await page.evaluate( ()=>{
            window.scrollTo(0, document.body.scrollHeight);
        })
        
        //wait for new content to load
        await page.waitForTimeout(3000);

        //capture the current height of the page
        const currentHeight = await page.evaluate( ()=>{
            return document.body.scrollHeight
        })

        console.log("Current height", currentHeight);
        console.log("Previous height", previousHeight);

        if(currentHeight === previousHeight){
            break;
        }

        previousHeight = currentHeight;
    }
    console.log("End of page reached")
})


//To find books
test.only("Inifinite scrolling and find book", async({page})=>{
    test.slow(); //set timeout for a single test - it will triple the default timeout (30s to 90s)
    await page.goto("https://www.booksbykilo.in/new-books?pricerange=201to500");

    //window.scrollTo(0, document.body.scrollHeight) - this is a js method
    let previousHeight = 0;
    let bookfound = false;

    while(true){
        
        const titles = await page.locator("#productsDiv h3").allTextContents();

        if(titles.includes('The Ugly Five')){
            console.log("Book found");
            bookfound = true;
            expect(bookfound).toBeTruthy();
            break;
        }

        //scroll down the page
        await page.evaluate( ()=>{
            window.scrollTo(0, document.body.scrollHeight);
        })
        
        //wait for new content to load
        await page.waitForTimeout(3000);

        //capture the current height of the page
        const currentHeight = await page.evaluate( ()=>{
            return document.body.scrollHeight
        })

        console.log("Current height", currentHeight);
        console.log("Previous height", previousHeight);

        if(currentHeight === previousHeight){
            break;
        }

        previousHeight = currentHeight;
    }
    
    console.log("End of page reached")
    
    if(!bookfound){
        console.log("No book found");
    }
})