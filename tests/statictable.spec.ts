import {test, expect, Locator} from '@playwright/test';

test("Static tables", async ({page}) => {
    await page.goto("https://testautomationpractice.blogspot.com/");

    const table:Locator = page.locator("table[name='BookTable'] tbody");
    await expect(table).toBeVisible();

    //1.count number of rows in the table
    //const rows:Locator = page.locator("table[name='BookTable'] tbody tr"); //returns all the rows including the header
    const rows:Locator = table.locator("tr"); //page.locator("table[name='BookTable'] tbody is replaced by table since table holds the same value - chaining of locators
    await expect(rows).toHaveCount(7); //await is used since rows is holding the web element

    const rowCount = await rows.count();
    console.log("Number of rows:", rowCount);
    expect(rowCount).toBe(7); //here await is not used because rowCount doesn't hold any web element

    //2. count number of headers/columns
    const columns:Locator = rows.locator("th"); //rows= table.locator("tr")
    await expect(columns).toHaveCount(4);

    const coulmnCount = await columns.count();
    console.log("Number of columns:", coulmnCount);
    expect(coulmnCount).toBe(4);

    //3. Read all data from the 2nd row(index 2 means 3rd row including header)
    const secRowCells:Locator = rows.nth(2).locator("td");
    const secRowText:string[] = await secRowCells.allInnerTexts();
    console.log("Second Row Data:",secRowText);

    await expect(secRowCells).toHaveText([ 'Learn Java', 'Mukesh', 'Java', '500' ]);

    for(let text of secRowText){
        console.log(text);
    }

    //4. read all data from the table without header
    const allRowData = await rows.all();  //get all row locators
    for(let row of allRowData.slice(1)){  //slice(1) - will skip the header
        const col = await row.locator("td").allInnerTexts();
        console.log(col.join('\t'));
    }

    //5. Print book names where author is Mukesh
    const mukeshBooks:string[] = [];
    for(let row of allRowData.slice(1)){  //slice(1) - will skip the header
        const cells = await row.locator("td").allInnerTexts();
        const author = cells[1];
        const book = cells[0];
        if(author === 'Mukesh'){
            console.log(`${author} \t ${book}`);
            mukeshBooks.push(book);
        }
    }
    expect(mukeshBooks).toHaveLength(2);

    //6. Calculate total price of all books
    let totalPrice:number = 0;
    for(let row of allRowData.slice(1)){  //slice(1) - will skip the header
        const cells = await row.locator("td").allInnerTexts();
        const price = cells[3];
        
        totalPrice = totalPrice+parseInt(price)  //price is a str type so converting to number type
        
    }
    console.log(totalPrice);
    expect(totalPrice).toBe(7100);


})