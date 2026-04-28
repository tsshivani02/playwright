import {test, expect} from '@playwright/test';
import fs from 'fs';
import {parse} from 'csv-parse/sync';

//Reading data from csv
const csvPath = 'testdata/loginData.csv';
const fileContent = fs.readFileSync(csvPath, 'utf-8');
const records = parse(fileContent, {columns:true, skip_empty_lines:true} );

test.describe("Login data driven test", async()=>{
    for(const data of records){  
        test(`Login test for ${data.email} & ${data.password}`, async({page})=>{
            await page.goto("https://demowebshop.tricentis.com/login");
            
            //Fill login form
            await page.locator("#Email").fill(data.email);
            await page.locator("#Password").fill(data.password);
            await page.locator('input[value="Log in"]').click();

            //1. check for valid creds and logout link is visible - test passed
            if(data.validity.toLowerCase() === "valid"){
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
 