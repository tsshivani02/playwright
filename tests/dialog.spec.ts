import {test, expect, Locator} from '@playwright/test';

test("Simple Dialog", async ({page}) =>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Register a dialog handler
    page.on("dialog", (dialog) => {
        console.log("Dialog Type", dialog.type());  //returns the type of dialog
        expect(dialog.type()).toContain('alert');
        
        console.log("Dialog text", dialog.message());  //returns the message from dialog
        expect(dialog.message()).toContain("I am an alert box!");
        
        dialog.accept();
    });
    await page.locator("#alertBtn").click(); //opens the dialog
    await page.waitForTimeout(3000); 
})

test("Confirmation Dialog", async ({page}) =>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Register a dialog handler
    page.on("dialog", (dialog) => {
        console.log("Dialog Type", dialog.type());  //returns the type of dialog
        expect(dialog.type()).toContain('confirm');
        
        console.log("Dialog text", dialog.message());  //returns the message from dialog
        expect(dialog.message()).toContain("Press a button!");
        
        dialog.accept(); //close the dialog by accpeting (ok)
        //dialog.dismiss(); //close the dialog box by dismissing (cancel)
    });
    await page.locator("#confirmBtn").click(); //opens the confirmation dialog

    const text:string = await page.locator("#demo").innerText();
    console.log("Output text:", text);
    await expect(page.locator("#demo")).toHaveText("You pressed OK!");
    
    await page.waitForTimeout(3000); 
})

test.only("Prompt Dialog", async ({page}) =>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //Register a dialog handler
    page.on("dialog", (dialog) => {
        console.log("Dialog Type", dialog.type());  //returns the type of dialog
        expect(dialog.type()).toContain('prompt');
        
        console.log("Dialog text", dialog.message());  //returns the message from dialog
        expect(dialog.message()).toContain("Please enter your name:");

        expect(dialog.defaultValue()).toContain("Harry Potter"); //checks the default value in the prompt box
        
        dialog.accept('Mary'); //close the dialog by accpeting (ok)
        //dialog.dismiss(); //close the dialog box by dismissing (cancel)
    });
    await page.locator("#promptBtn").click(); //opens the confirmation dialog

    const text:string = await page.locator("#demo").innerText();
    console.log("Output text:", text);
    await expect(page.locator("#demo")).toHaveText("Hello Mary! How are you today?");
    
    await page.waitForTimeout(3000); 
})