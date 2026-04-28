import {test, expect, Locator} from "@playwright/test"

test("verify playwright locators", async ({page})=>{
    await page.goto("https://demo.nopcommerce.com/");
    
    //getByAltText() - identifies images and similar elements based on the alt attribute.
    //use this locator when your element supports alt text such as img and area elements
    const logo:Locator=page.getByAltText("opCommerce demo store")
    await expect(logo).toBeVisible();

    //getBytext()
    await expect(page.getByText("Welcome to our store")).toBeVisible();  //right click on the welcome to store txt and inspect to open HTML content - copy paste
    //await expect(page.getByText("Welcome to")).toBeVisible(); -- accpets substr
    //await expect(page.getByText(/Welcome\s+to\s+our\s+store/i)).toBeVisible(); -- accepts reg exp 

/*     //getByRole()
    await page.getByRole("link", {name:'Register'}).click();
    //await expect(page.getByText("Register")).toBeVisible(); //also use getBytext()

    await page.getByLabel("First name:").fill("John")
    await page.getByLabel("Last name:").fill("Kennedy")
    await page.getByLabel("Email:").fill("abc@gmail.com") */

    //getByPlaceholder()
    await page.getByPlaceholder("Search store").fill("Chennai")

    //getByTitle()
    page.getByTitle("Featured products")





})