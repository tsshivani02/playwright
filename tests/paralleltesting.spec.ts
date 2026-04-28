import {test} from '@playwright/test';

//test.describe.configure({mode: 'serial'})
//test.describe.configure({mode: 'parallel'})

test.describe("group1", async()=>{
    test("test1", async()=>{
        console.log("test1");
    });

    test("test2", async()=>{
        console.log("test2");
    })

    test("test3", async()=>{
        console.log("test3");
    });

    test("test4", async()=>{
        console.log("test4");
    });

    test("test5", async()=>{
        console.log("test5");
    });

})