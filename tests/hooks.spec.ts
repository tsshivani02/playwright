import {test, expect, Page} from '@playwright/test';

let page: Page;

test.beforeAll("Open app", async ({browser})=>{
    page = await browser.newPage();

    await page.goto("https://demoblaze.com/index.html")
})

test.afterAll("Closing app", async()=>{
    await page.close();
})

test.beforeEach("login", async()=>{
    await page.locator("#login2").click();

    await page.locator("#loginusername").fill("pavanol");
    await page.locator("#loginpassword").fill("test@123");
    await page.locator("button[onclick='logIn()']").click();
    await page.waitForTimeout(2000);
})

test.afterEach("logout", async()=>{
    
    await page.locator("#logout2").click();
})

//If the hooks are inside any group, then it is applicable to that particular group
//If the hooks are outside any group, then it is applicable to any group present in the same file
test.describe("Grouping both test", async()=>{ 
    test("Find no of products", async()=>{
        const products = page.locator("#tbodyid .hrefch");
        const count = await products.count();
        console.log("No of products:", count);
        await expect(products).toHaveCount(9);
    })

    test("Add to cart", async ()=>{
        await page.locator("text='Samsung galaxy s6'").click();

        //Handle alert before the click
        page.on('dialog', async (dialog) =>{
            expect(dialog.message()).toContain("product added");
            await dialog.accept();
        });

        await page.locator('.btn.btn-success.btn-lg').click();
    })
})
