import {test, expect} from '@playwright/test';

//POST - https://restful-booker.herokuapp.com/booking
//In the PW config file, baseURL is set to https://restful-booker.herokuapp.com - it will take the URL from config file

test("Create post request using static body", async ({request})=>{

    //request body
    const requestBody = {
        firstname : "John",
        lastname : "kennedy",
        totalprice : 111,
        depositpaid : true,
        bookingdates : {
            checkin : "2018-01-01",
            checkout : "2019-01-01"
        },
        additionalneeds : "Breakfast"
    }

    //send post request
    const response = await request.post("/booking", {data:requestBody});

    const responseBody = await response.json(); //Extract only the body of response
    console.log(responseBody);

    //validate json
    expect(response.ok()).toBeTruthy();
    expect(response.status()).toBe(200);

    //validate response body attributes
    expect(responseBody).toHaveProperty("bookingid");
    expect(responseBody).toHaveProperty("booking");
    expect(responseBody).toHaveProperty("booking.additionalneeds");

    //validate booking details
    const booking = responseBody.booking;

    expect(booking).toMatchObject({
        firstname : "John",
        lastname : "kennedy",
        totalprice : 111,
        depositpaid : true,
    })

    expect(booking.bookingdates).toMatchObject({
        checkin : "2018-01-01",
        checkout : "2019-01-01"
    })
})