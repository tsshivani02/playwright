import {test, expect} from '@playwright/test';
import fs from 'fs';

//reading data from json

const jsonPath = "testdata/loginData.json";
const loginData:any = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

test.describe("Login data driven test", async()=>{
    for(const [email, password, validity] of loginData){  
        test(`Login test for ${email} & ${password}`, async({page})=>{
            await page.goto("https://demowebshop.tricentis.com/login");
            
            //Fill login form
            await page.locator("#Email").fill(email);
            await page.locator("#Password").fill(password);
            await page.locator('input[value="Log in"]').click();

            //1. check for valid creds and logout link is visible - test passed
            if(validity.toLowerCase() === "valid"){
                const logoutLink = page.locator(".ico-logout");
                await expect(logoutLink).toBeVisible( {timeout:5000} );
            } 
            
            //2. check for invalid creds and error msg is visible - test passes
            else{
                const errorMessage = page.locator(".validation-summary-errors");
                await expect(errorMessage).toBeVisible( {timeout:5000} );

                await expect(page).toHaveURL("https://demowebshop.tricentis.com/login");
            }
        })
    }
})

