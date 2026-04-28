/*
1. To run all sanity test = npx playwright test tags.spec.ts --grep "@sanity"
2. To run all regression test = npx playwright test tags.spec.ts --grep "@regression"
3. To run both sanity & regression = npx playwright test tags.spec.ts --grep "(?=.*@sanity)(?=.*@regression)"
4. To run tests belongs to either sanity or regresssion = npx playwright test tags.spec.ts --grep "@sanity|@regression"
5. To run tests which are sanity and not regression (only sanity) = npx playwright test tags.spec.ts --grep-invert "@regression"
*/

import {test, expect} from '@playwright/test';

//@sanity @regression - user defined tags, you can specify any name
/* test("@sanity @regression test1", async({page})=>{  
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle('Google');
}) */

test("test2", {tag: '@sanity'}, async({page})=>{  
    await page.goto("https://www.google.com/");
    await expect(page).toHaveTitle('Google');
})

test("test3", {tag: '@regression'}, async({page})=>{  
    await page.goto("https://www.google.com/");
    await page.locator("text='Store'").click();
    await expect(page).toHaveTitle("Google Store for Google Made Devices & Accessories")
})

test("test4", {tag: ['@sanity', '@regression']}, async({page})=>{  
    await page.goto("https://www.google.com/");
    await page.locator("text='Store'").click();
    await expect(page.locator("text='Popular on the Google Store.'")).toHaveText("Popular on the Google Store.")
})