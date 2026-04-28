import {test, expect, Locator, Page} from '@playwright/test';

async function selectDate(targetYear:string, targetMonth:string, targetDate:string, page:Page, isFuture:boolean){
    while(true){
        const currentMonth = await page.locator(".ui-datepicker-month").textContent();
        const currentYear = await page.locator(".ui-datepicker-year").textContent();

        //Current month & year
        if(currentMonth === targetMonth && currentYear === targetYear){
            break;
        }

        //Future year & month
        if(isFuture){
            await page.locator(".ui-datepicker-next").click();
        }
        else{
            //Past year & month
            await page.locator(".ui-datepicker-prev").click();
        }
    }

    //capturing all dates and select the specified date
    const allDates = await page.locator(".ui-datepicker-calendar td").all();
    for(let dt of allDates){
        const dateText = await dt.innerText();

        if(dateText === targetDate){
            await dt.click();
            break;
        }
    }

}


test("JQuery Datepicker", async ({page}) =>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const dateInput:Locator = page.locator("input#datepicker");
    expect(dateInput).toBeVisible();

    /* //using fill method
    await dateInput.fill("04/02/2026");  // mm/dd/yy */

    await dateInput.click(); //click to see the calendar
    //select target date
    const year = '2025';
    const month = 'June';
    const date = '30';

    selectDate(year, month, date, page, false);
    
    const expectedDate = '06/30/2025';
    await expect(dateInput).toHaveValue(expectedDate);
})