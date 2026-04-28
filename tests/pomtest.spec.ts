import {test, expect} from '@playwright/test';

import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { CartPage } from '../pages/CartPage';

test("User login, add Products to the cart", async({page})=>{
    await page.goto("https://demoblaze.com/index.html");

    //Create an object for the class created and call the action methods
    const loginPage = new LoginPage(page);
    await loginPage.performLogin('pavanol', 'test@123'); //You can also call individual methods

    //Object for homepage
    const homePage = new HomePage(page);
    await homePage.addProductToCart('Samsung galaxy s6');
    await page.waitForTimeout(2000);
    await homePage.gotToCart();
    await page.waitForTimeout(2000);

    //Object for cart page
    const cartPage = new CartPage(page);
    const isProductinCart = await cartPage.checkProductsinCart('Samsung galaxy s6');
    expect(isProductinCart).toBeTruthy();
})