/*
Pre-req: data - json file
create token

1. create a booking (POST) -- booking ID
2. update booking (PUT) //requires token
*/

import {test, expect} from '@playwright/test'
//import fs from 'fs';

//PUT - https://restful-booker.herokuapp.com/booking/4489

//Utility functions that returns json file data
/* function readJson(filePath:string){
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
} */

test("Update booking - PUT", async({request})=>{
    //1. create a booking (POST) -- booking ID
    //const requestBody = readJson('testdata/post_request_body.json')
    const requestBody = {
    "firstname": "John",
    "lastname": "Kennedy",
    "totalprice": 1000,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2025-07-01",
        "checkout": "2025-07-05"
    },
    "additionalneeds": "orange"
    }

    const createResponse = await request.post('/booking', {data:requestBody});

    expect(createResponse.ok()).toBeTruthy();

    const responseBody = await createResponse.json();
    const bookingId = responseBody.bookingid; //extract only booking ID from response
    console.log("Booking ID:", bookingId);

    //2. create token
    const tokenrequestBody = {
        username: "admin",
        password: "password123"
    }

    const tokenResponse = await request.post('/auth', {data:tokenrequestBody});
    expect(tokenResponse.ok()).toBeTruthy();

    const tokenResponseBody = await tokenResponse.json();
    const token = tokenResponseBody.token;
    console.log("Token:", token);
    
    //3. Update booking (PUT)
    //const updaterequestBody = readJson('testdata/put_request_body.json')
    const updaterequestBody = {
    "firstname": "John",
    "lastname": "Kennedy",
    "totalprice": 2000,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2025-07-01",
        "checkout": "2025-07-05"
    },
    "additionalneeds": "orange"
    }
    
    const updateResponse = await request.put(`/booking/${bookingId}`, 
                                                    {
                                                        headers: {"Cookie" : `token=${token}`}, 
                                                        data:updaterequestBody
                                                    }
                                                );
    
    expect(updateResponse.ok()).toBeTruthy();
    expect(updateResponse.status()).toBe(200);

    const updateResponseBody = await updateResponse.json();
    console.log(updateResponseBody);
})

