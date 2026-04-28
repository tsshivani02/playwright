import {test, expect, Locator} from '@playwright/test';

test("IFrames", async ({page}) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");

    //total number of frames present on the page
    const frames = page.frames(); //every frame is an element. page.frames() returns an array of frames
    console.log("Number of frames:",frames.length);

    /* //1. using page.frame() - can use either url or name of the frame
    const frame = page.frame({url : "https://ui.vision/demo/webtest/frames/frame_1.html"});

    if(frame){  //frame can be present or null so if present 
        await frame.locator("[name='mytext1']").fill("Hello"); //locate the element and fill
        //await frame.fill("[name='mytext1']", "Hello");
    }
    else{
        console.log("Frame is not available");
    }
 */
    //2. using frameLocator - can use any of the attribute of the frame
    const frame3 = page.frameLocator("[src='frame_3.html']").locator("[name='mytext3']");
    await frame3.fill("Marry john");

})

test.only("Inner frames", async ({page}) => {
    await page.goto("https://ui.vision/demo/webtest/frames/");

    const frame3 = page.frame({url:"https://ui.vision/demo/webtest/frames/frame_3.html"});
    if(frame3){
        await frame3.locator("[name='mytext3']").fill("Mary kom");
        const childFrame = frame3.childFrames(); //returns an array of child frames
        console.log("Child Frames inside Frame3:",childFrame.length);
        const radio = childFrame[0].getByLabel("I am a human");
        await radio.check(); //to select radio button
        await expect(radio).toBeChecked();
    }
    else{
        console.log("No frame is available");
    }
    

})