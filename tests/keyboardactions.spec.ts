import {test, expect} from '@playwright/test';

test('Keyboard actions', async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const input1 = page.locator("#input1")

    //1. Focus on #input1 element
    await input1.focus();  //or await input1.click() - both does the same
    
    //2. provide text to #input1 element
    await page.keyboard.insertText("Hello");

    //3. Ctrl + A - select the text
    await page.keyboard.down("Control");  //For normal keys use down or up
    await page.keyboard.press("A"); //For alphabets use press
    await page.keyboard.up("Control");

    //4. Ctrl + C - copy the text
    await page.keyboard.down("Control");  //For normal keys use down or up
    await page.keyboard.press("C"); //For alphabets use press
    await page.keyboard.up("Control");

    //5. press tab 2 times to go to the next input box
    await page.keyboard.press("Tab"); //You can also use up & down instead of press
    await page.keyboard.press("Tab");

    //6. Ctrl + V - paste the text
    await page.keyboard.down("Control");  //For normal keys use down or up
    await page.keyboard.press("V"); //For alphabets use press
    await page.keyboard.up("Control");

    //7. Press tab2 2 times to go to the next input box
    await page.keyboard.press("Tab"); 
    await page.keyboard.press("Tab");

    //8. Ctrl + V - paste the text
    await page.keyboard.down("Control");  //For normal keys use down or up
    await page.keyboard.press("V"); //For alphabets use press
    await page.keyboard.up("Control");
});


test.only('Another way - Keyboard actions', async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");
    const input1 = page.locator("#input1")

    //1. Focus on #input1 element
    await input1.focus();  //or await input1.click() - both does the same
    
    //2. provide text to #input1 element
    await page.keyboard.insertText("Hello");

    //3. Ctrl + A - select the text
    await page.keyboard.press('Control+A'); //Instead of down and up you can use press

    //4. Ctrl + C - copy the text
    await page.keyboard.press('Control+C'); //Instead of down and up you can use press

    //5. press tab 2 times to go to the next input box
    await page.keyboard.press("Tab"); //You can also use up & down instead of press
    await page.keyboard.press("Tab");

    //6. Ctrl + V - paste the text
    await page.keyboard.press('Control+V'); //Instead of down and up you can use press

    //7. Press tab2 2 times to go to the next input box
    await page.keyboard.press("Tab"); 
    await page.keyboard.press("Tab");

    //8. Ctrl + V - paste the text 
    await page.keyboard.press('Control+V'); //Instead of down and up you can use press

    await page.waitForTimeout(5000);
});
