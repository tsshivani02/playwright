import {test, expect} from '@playwright/test';

test("Single file Upload", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.locator("#singleFileInput").setInputFiles('uploads/Demo.txt');  //attach the file
    await page.locator("button:has-text('Upload Single File')").click();  //clicks the upload file button

    const msg = await page.locator("#singleFileStatus").textContent();
    expect(msg).toContain("Demo.txt");

    await page.waitForTimeout(3000);
})

test.only("Multiple file Upload", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    await page.locator("#multipleFilesInput").setInputFiles(['uploads/Demo.txt', 'uploads/Screenshot 2025-10-21 202501.png']);  //attach multiple files using array
    await page.locator("button:has-text('Upload Multiple Files')").click();  //clicks the upload file button

    const msg = await page.locator("#multipleFilesStatus").textContent();
    expect(msg).toContain("Multiple files selected:");

    await page.waitForTimeout(3000);
})