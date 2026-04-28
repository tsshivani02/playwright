import {test, expect} from '@playwright/test';

const loginTestData: string[][] = [    //2D array
    ["laura.taylor1234@example.com", "test123", "valid"],  //row1
    ["invaliduser@example.com", "test312", "invalid"],  //row2
    ["validuser@example.com", "test456", "invalid"],  //row3
    ["", "", "invalid"]  //row4
];

//for(const data of loginTestData) - here data points to each row and from each row you have to access email pw using test[0],[1]. 
//instead access each element using [email, pw, validity]
test.describe("Login data driven test", async()=>{
    for(const [email, password, validity] of loginTestData){  
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




