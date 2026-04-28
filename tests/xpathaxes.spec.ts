import {test, expect, Locator} from '@playwright/test'

test("Xpath axes demo", async ({page}) => {
    await page.goto("https://www.w3schools.com/html/html_tables.asp");

    //1. self axis - select <td> element that contains Germany
    const germanycell:Locator = page.locator("//td[text()='Germany']/self::td");
    await expect(germanycell).toHaveText("Germany");

    //2. parent axis - get parent <tr> of the "germany" cell
    const parentcell:Locator = page.locator("//td[text()='Germany']/parent::tr");
    let displayparent:string[] = await parentcell.allTextContents();
    for(let i of displayparent){
        console.log(i);
    }
    //await expect(parentcell).toContainText("Maria Anders");
    //console.log(await parentcell.textContent());
    
    //3. Child axis - Get all <td> children of the third <tr> in the table
    const childcell:Locator = page.locator("//table[@id='customers']//tr[3]/child::td");
    console.log(await childcell.count());
    await expect(childcell).toHaveCount(3);

    //4. Ancestor axis - get ancestor <table> of the Germany cell
    const ancestorcell:Locator = page.locator("//td[text()='Germany']/ancestor::table") //ancestor::table - table represents the specific ancestor to be searched
    await expect(ancestorcell).toHaveAttribute('id', 'customers');

    //5. Descendent - get all <td> elements under <table>
    const descendentcell:Locator = page.locator("//table[@id='customers']/descendant::td");
    await expect(descendentcell).toHaveCount(18);

    //6. Followig - get all <td> elements that comes after "germany" in document order
    const followingcell:Locator = page.locator("//td[text()='Germany']/following::td[1]");
    await expect(followingcell).toHaveText("Centro comercial Moctezuma");

    //7. Followig-sibling - get all <td> elements to the right of "germany"
    const followingsiblingcell:Locator = page.locator("//td[text()='Germany']/following-sibling::td");
    await expect(followingsiblingcell).toHaveCount(0);

    //8. Preceding - get all <td> elements just before "germany"
    const precedingcell:Locator = page.locator("//td[text()='Germany']/preceding::td[1]");
    await expect(precedingcell).toHaveText("Maria Anders");
    
    //8. Preceding-sibling - get all <td> elements to the left of "germany"
    const precedingsiblingcell:Locator = page.locator("//td[text()='Germany']/preceding-sibling::td");
    await expect(precedingsiblingcell).toHaveCount(2);
    await expect(precedingsiblingcell.nth(0)).toHaveText("Alfreds Futterkiste");
    await expect(precedingsiblingcell.nth(1)).toHaveText("Maria Anders");
})