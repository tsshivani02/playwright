import{test, expect, Locator} from '@playwright/test';

test("verify chrome CPU load in dynamic table", async ({page}) =>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table:Locator = page.locator("table#taskTable tbody");
    await expect(table).toBeVisible();

    //select all the rows, then find the number of rows
    const rows:Locator[] = await table.locator("tr").all();
    console.log("Row length", rows.length);
    expect(rows).toHaveLength(4);

    //1. For chrome process get value of CPU load
    //read each row to check Chrome presence
    let cpuLoad = '';
    
    for(const row of rows){
        const processName:string = await row.locator("td").nth(0).innerText();
        if(processName === 'Chrome'){
            //cpuLoad = await row.locator("td:has-text('%')").innerText(); //CSS
            cpuLoad = await row.locator("td",{hasText:'%'}).innerText(); //playwright   
            console.log("CPU load of Chrome", cpuLoad);
            break;
        }
    }

    //2. Compare cpuLoad with the value below the table
    let value:string = await page.locator("strong.chrome-cpu").innerText();
    console.log("CPU load of Chrome process:",value);

    if(value.includes(cpuLoad)){
        console.log("Value is same");
    }
    else{
        console.log("Not equal");
    }

    expect(value).toContain(cpuLoad);
})