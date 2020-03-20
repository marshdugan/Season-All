// can I change request with axios and the syntax stays the same?
// how can I async await the results so they're in order?
// how do we know that the requests are complete? Therefore I can organize the array in alphabetical order. A nested async await seems like the answer, but I don't know how to do that

// 1. make this request("http://nhlr.org/lookouts/us",
//     -.ech to grab all URLSearchParams, and store each URL in an Array
// 2. Call a seconf function  that for loops through the array of URL for each iteration you will mkae the second request call, and then you can store each HTML obj in anarray

/*
setTimeout(() => {
    // Resolve the promise
    resolve(console.log('hello'));
}, 1000);
*/

let cheerio = require("cheerio");
let request = require("request");

let queryURL1 = "http://nhlr.org/lookouts/us"
let emptyArray = [];
// let ObjectsToCsv = require('objects-to-csv');

// make ajax call to main 200 link URL
// ajax.get("/whatever")
request("http://nhlr.org/lookouts/us", (error, response, html) => {

    if (!error && response.statusCode == 200) {
        // console.log(html);
        let $ = cheerio.load(html);
        
            $(".tablewhitegrid tr td a").each(function() {
                // console.log($(this).attr("href"))
                let queryURL2 = $(this).attr("href");
                
                    request(`http://nhlr.org${queryURL2}`, (error, response, html) => {
                        if (!error && response.statusCode == 200) {
                            let $ = cheerio.load(html);
                            
                            // use trim for whitespace
                            let location = $(".tablewhitegridnoheader tr:contains('Location') td:nth-of-type(2)").text().trim();
                            let coordinates = $(".tablewhitegridnoheader tr:contains('Coordinates') td:nth-of-type(2)").text().trim().split(" ").join("");
                            let elevation = $(".tablewhitegridnoheader tr:contains('Elevation') td:nth-of-type(2)").text().trim();
                            let built = $(".tablewhitegridnoheader tr:contains('Built') td:nth-of-type(2)").text().trim();

                            let htmlObject = {location, coordinates, elevation, built};

                            // emptyArray.push(htmlObject);
                            // console.log(location);
                            // console.log(coordinates);
                            // console.log(elevation);
                            // console.log(built);
                            // console.log(htmlObject)
                        };
                    });
                    // console.log(emptyArray)
            })
    }
});

/*

// How to teell the browser that this function is asynchronous
async function myFunc() {
    // Await for the promise to resolve
    await new Promise((resolve) => {
        setTimeout(() => {
            // Resolve the promise
            resolve(console.log('hello'));
        }, 3000);
    });
    // Once the promise gets resolved continue on
    console.log('hi');
}

// Call the function
myFunc();

*/