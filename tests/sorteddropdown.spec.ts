import {test, expect, Locator} from '@playwright/test';

test("Verify sorted dropdown", async ({page}) =>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    const dropdownOptions:Locator = page.locator("#animals>option"); //sorted
    //const dropdownOptions:Locator = page.locator("#colors>option"); //not sorted

    const optionsText:string[] = (await dropdownOptions.allTextContents()).map(text => text.trim());

    const originalList:string[] = [...optionsText]; //... indicates spread operator which means Original array will not be disturbed
    const sortedList:string[] = [...originalList].sort(); 

    console.log("Original List", originalList);
    console.log("Sorted List", sortedList);

    expect(originalList).toEqual(sortedList); // will fail for unsorted and pass for sorted one

})

test.only("Verify duplicates found", async({page}) =>{
    await page.goto("https://testautomationpractice.blogspot.com/");

    //const dropdownOptions:Locator = page.locator("#animals>option"); //not having duplicates
    const dropdownOptions:Locator = page.locator("#colors>option"); //has duplicates

    const optionsText:string[] = (await dropdownOptions.allTextContents()).map(text => text.trim());

    const myset = new Set<string>();  //set - has no duplicates, myset is an empty set
    const duplicates:string[] = [];  //array - has dupliates, duplicates is an empty array

    for(const i of optionsText){
        if(myset.has(i)){
            duplicates.push(i);  //if set has that particular text, it will add to array(duplicate)
        }
        else{
        myset.add(i);  //else it will add to set
        }
    }

    console.log("Duplicate elements", duplicates);

    if(duplicates.length>0){
        console.log("Has duplicates", duplicates);  
    }
    else{
        console.log("No duplicates found")
    }

})