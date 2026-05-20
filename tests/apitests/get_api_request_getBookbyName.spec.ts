import {test, expect} from '@playwright/test'

//GET - https://restful-booker.herokuapp.com/booking?firstname=Jim&lastname=Brown

test("Get booking details by ID - path param", async({request})=>{

    const firstname = "Jim"; //Query parameter
    const lastname = "Brown"; //Query parameter

    //sending get request along with query parameter
    const response = await request.get("/booking", {params: {firstname, lastname}});

    //parse the response and print
    const responseBody = await response.json();
    console.log(responseBody);

    //add assertions
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    //check response should not be empty
    expect(responseBody.length).toBeGreaterThan(0);

    for(const item of responseBody){
        expect(item).toHaveProperty("bookingid");
        expect(typeof item.bookingid).toBe("number");
        expect(item.bookingid).toBeGreaterThan(0);
    }
})