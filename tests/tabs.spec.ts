import {test, expect, chromium} from '@playwright/test';

test("Handle tabs", async () =>{
    const browser = await chromium.launch();
    const context = await browser.newContext();

    const parentPage = await context.newPage();
    await parentPage.goto("https://testautomationpractice.blogspot.com/");

    //these 2 statements should run parallely so use promise.all()
    //context.waitForEvent('page'); //this will wait for the button to be clicked and captures the event, returns pending, fulfiled, rejected
    //parentPage.locator("button:has-text('New Tab')").click();  //opens new tab and it will trigger the event

    const [childPage] = await Promise.all([context.waitForEvent('page'), parentPage.locator("button:has-text('New Tab')").click()]);
    //promise.all() - will take an array of promises and will return a promise by executing all the promises parallely
    //the var childPage will return either null or promise so using a [] to handle both

    //approach1: switch btwn pages and get their title using context
    const pages = context.pages(); //returns an array
    console.log("Number of pages:", pages.length);

    console.log('title of 1st page:', await pages[0].title());
    console.log("Title of 2nd page:", await pages[1].title());

    //approach2: using pages
    console.log('title of 1st page:', await parentPage.title());
    console.log("Title of 2nd page:", await childPage.title());
})