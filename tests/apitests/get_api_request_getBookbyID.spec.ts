import {test, expect} from '@playwright/test'

//GET - https://restful-booker.herokuapp.com/booking/1

test("Get booking details by ID - path param", async({request})=>{

    const bookingId = 1; //path parameter

    //sending get request along with path parameter
    const response = await request.get(`/booking/${bookingId}`);

    //parse the response and print
    const responseBody = await response.json();
    console.log(responseBody);

    //add assertions
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);
})