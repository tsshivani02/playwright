import {test, expect} from '@playwright/test';

test("Mouse hover", async ({page}) =>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    const pointme = page.locator(".dropbtn");
    await pointme.hover();

    const laptops = page.locator(".dropdown-content a:nth-child(2)");
    await laptops.hover();

    await page.waitForTimeout(3000);
})

test("Double click", async ({page}) =>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    const btncopy = page.locator('button[ondblclick="myFunction1()"]');
    await btncopy.dblclick();

    const field = page.locator("#field2");
    expect(field).toHaveValue("Hello World!");

    await page.waitForTimeout(3000);
})

test.only("Drag and drop", async ({page}) =>{

    await page.goto("https://testautomationpractice.blogspot.com/");

    const drag = page.locator('#draggable');
    const drop = page.locator("#droppable");

    //Approach 1: mouse hover and drop manually
    /* await drag.hover();
    await page.mouse.down();
    await drop.hover();
    await page.mouse.up(); */

    //Approach2: mouse hover and drop automatically
    await drag.dragTo(drop);

    await page.waitForTimeout(3000);
})