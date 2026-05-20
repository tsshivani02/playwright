/*
1. create booking
2. get booking
3. update booking
4. delete booking
*/

import {test, expect} from '@playwright/test'
//import fs from 'fs';

//PATCH - https://restful-booker.herokuapp.com/booking/4489

//Utility functions that returns json file data
/* function readJson(filePath:string){
    return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
} */

test("Delete booking end-to-end", async({request})=>{
    //1. create a booking
    //const postrequestBody = readJson('testdata/post_request_body.json')
    const postrequestBody = {
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

    const postResponse = await request.post('/booking', {data:postrequestBody});
    const postresponseBody = await postResponse.json();
    console.log(postresponseBody);
    const bookingId = postresponseBody.bookingid; //extract only booking ID from response
    console.log("Booking ID:", bookingId);

    //2. get booking
    const getResponse = await request.get(`/booking/${bookingId}`);
    const getResponseBody = await getResponse.json();
    console.log(getResponseBody);

    //3. create token
    const tokenrequestBody = {
        username: "admin",
        password: "password123"
    }

    const tokenResponse = await request.post('/auth', {data:tokenrequestBody});
    const tokenResponseBody = await tokenResponse.json();
    const token = tokenResponseBody.token;
    console.log("Token:", token);

    //4. update booking
    //const updaterequestBody = readJson('testdata/put_request_body.json')
    const updaterequestBody = {
    "firstname": "Jim",
    "lastname": "Brew",
    "totalprice": 2000,
    "depositpaid": true,
    "bookingdates": {
        "checkin": "2025-07-01",
        "checkout": "2025-07-05"
    },
    "additionalneeds": "apple"
    }
    
    const updateResponse = await request.put(`/booking/${bookingId}`, 
                                                    {
                                                        headers: {"Cookie" : `token=${token}`}, 
                                                        data:updaterequestBody
                                                    }
                                                );
    const updateResponseBody = await updateResponse.json();
    console.log(updateResponseBody);

    //5. delete booking
    const deleteResponse = await request.delete(`/booking/${bookingId}`, {headers: {"Cookie" : `token=${token}`}});
    expect(deleteResponse.statusText()).toBe("Created");
    expect(deleteResponse.status()).toBe(201);
})