import {test, expect, Locator} from '@playwright/test'
import { only } from 'node:test';

//text input button
test("Text Input actions", async ({page}) =>{
    await page.goto("https://testautomationpractice.blogspot.com/")

    const textBox:Locator = page.locator("input#name");
    await expect(textBox).toBeVisible();
    await expect(textBox).toBeEnabled();

    const maxLength: string | null = await textBox.getAttribute("maxlength");
    expect(maxLength).toBe('15');

    await textBox.fill("John kennedy");
    const enteredValue = await textBox.inputValue();
    console.log(enteredValue);
    expect(enteredValue).toBe("John kennedy");

})

//Radio button
test ("Radio button actions", async ({page}) =>{
    await page.goto("https://testautomationpractice.blogspot.com/")

    const maleRadio:Locator = page.locator("input#male");
    await expect(maleRadio).toBeVisible();
    await expect(maleRadio).toBeEnabled();

    expect(await maleRadio.isChecked()).toBe(false); //ischecked returns false since radio button is not checked and is compared with false, so returns true
    
    await maleRadio.check(); //check the radio button
    expect(await maleRadio.isChecked()).toBe(true); //returns true since button is checked
    await expect(maleRadio).toBeChecked(); //actual method that checks wether radio button is checked or not


})

//checkbox
test.only("Check box actions", async ({page}) =>{
    await page.goto("https://testautomationpractice.blogspot.com/")

    //1. Select specific checkbox using getByLabel and assert
    const sundaycheck:Locator = page.getByLabel('Sunday');
    await sundaycheck.check();
    await expect(sundaycheck).toBeChecked();

    //2. get all checkboxes and assert
    const days:string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']; //Get all the lables in a string
    const checkeboxes:Locator[] = days.map(index =>(page.getByLabel(index)));
    expect(checkeboxes.length).toBe(7);

    //3. Select all checkboxes and assert each s checked
    for(const i of checkeboxes){
        await i.check();
        await expect(i).toBeChecked();
    }

    //4. Uncheck last 3 checkboxes
    for(const i of checkeboxes.slice(-3)){
        await i.uncheck();
        await expect(i).not.toBeChecked();
    }

    //5. Toggle: if checked, then uncked and reverse and assert state flipped
    for(const i of checkeboxes){
        if(await i.isChecked()){
            await i.uncheck();
            await expect(i).not.toBeChecked();
        }
        else{
            await i.check();
            await expect(i).toBeChecked();
        }
    }

    //6. Randomly selct checkboxes by index (1,3,6) and assert
    const indexes: number[] = [1,3,6];
    for(const i of indexes){
        await checkeboxes[i].check();
        await expect(checkeboxes[i]).toBeChecked();
    }

    //7. select the checkbox based on the label
    const weekname:string = "Friday";

    for(const label of days){
        if(label.toLowerCase() === weekname.toLowerCase()){
            const checkbox = page.getByLabel(label);
            await checkbox.check();
            await expect(checkbox).toBeChecked();
        }
    }


})