import {test, expect} from '@playwright/test';
//import fs from 'fs';

test("Download files", async({page})=>{
    await page.goto("https://testautomationpractice.blogspot.com/p/download-files_25.html");
    
    await page.locator("#inputText").fill("Download file");  //Fill text in the input box
    await page.locator("#generateTxt").click(); //Click on the 'generate and download text file' button

    //Start waiting for the download before clicking
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.locator("#txtDownloadLink").click()
    ])

    //Save the file to custom path
    const downloadpath = 'downloads/testfile.txt';
    await download.saveAs(downloadpath);

    /* //Check if file exists in the path
    const fileexists = fs.existsSync(downloadpath);
    expect(fileexists).toBeTruthy(); */

    /* //cleanup downloaded files
    if(fileexists){
        fs.unlinkSync(downloadpath);
    }
     */
    await page.waitForTimeout(3000);

})