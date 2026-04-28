import {test, expect, Locator} from '@playwright/test';

test("Read data from all the table pages", async ({page}) => {
  await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
  
  let hasmorepages = true;  //to check if there's next page
  
  while(hasmorepages){
    const rows = await page.locator("table#example tbody tr").all();
    for(let row of rows){
        console.log(await row.innerText());
    }
    
    //capturing the locator of '>' (Next) button
    //button[aria-label="Next"], button[aria-controls='example']:has-text("›"), button[aria-controls='example']:nth-child(9) - all these pointing to the same locator
    const nextButton:Locator = page.locator("button[aria-label='Next']");
    const isDisabled = await nextButton.getAttribute('class');  //value of class attribute is "dt-paging-button disabled next" when the page is in 6th page

    if(isDisabled?.includes('disabled')){  //isDisabled returns string or null so using optional parameter
        hasmorepages = false; //if no more pages then make the while loop to stop
    }
    else{
        await nextButton.click();
    }
  }
})


test("Filter the page and check the row count", async ({page}) => {
  await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
  
  const dropdwon:Locator = page.locator("select#dt-length-0")  //locator of filter page
  await dropdwon.selectOption({label: '25'});

  const rows = await page.locator("table#example tbody tr").all();
  expect(rows.length).toBe(25);  //rows is an array so using length

  /* const rows2 = page.locator("table#example tbody tr");
  expect(rows2).toHaveCount(25);  //rows2 is a locator so using toHaveCount */

})


test.only("Search for specific row in a table", async ({page}) => {
  await page.goto("https://datatables.net/examples/basic_init/zero_configuration.html");
  
  const searchbox = page.locator("input.dt-input");
  await searchbox.fill("Tiger Nixon");

  const rows = await page.locator("table#example tbody tr").all();
  if(rows.length>=1){
    let matchFound = false;
    for(let row of rows){
        const text = await row.innerText();
        if(text.includes("Tiger Nixon")){
            console.log("Record found");
            matchFound = true;
            break;
        }
    }
    //expect(matchFound).toBe(true);
    expect(matchFound).toBeTruthy();
  }
  else{
    console.log("No records found");
  }

})