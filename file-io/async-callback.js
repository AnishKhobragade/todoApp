"use strict";
exports.__esModule = true;
var fs = require("fs");
//Callback => first parametr is Error, 2nd Paramter is result (or data)
//in Node js we callback => Error first callback
//1. How to return data from Callback
//2. Readability=> code get rigyht skewed
function callbackHandler(err, data) {
    WriteToFile("BBBBBBBBBBBBBBBBBBBBBBb");
    console.log("Callback start");
    console.log(err);
    console.log(data);
    console.log("Callback ends");
}
function ReadFile() {
    console.log("Read file start");
    fs.readFile("./test.txt", "utf-8", callbackHandler);
    console.log("read file done");
}
function WriteToFile(fileData) {
    console.log("Write file start");
    var aa = {
        flag: "a"
    };
    fs.writeFile("./test.txt", fileData, aa, function () {
        console.log("Write operation callback called");
        // sendEmail("", "" , (err, data)=>{
        //     if(err)
        //     {
        //     }else{
        //         updateDB("", (err, data)=>{
        //             if(err)
        //             {
        //             }
        //             else
        //             {
        //                 //
        //             }
        //         })
        //     }
        // })
        //updateDB to make status email is sent
        //ReadFile();
    });
    console.log("Write file done");
}
function FileOpertion() {
    console.log("file operation starts");
    ReadFile();
    console.log("file operation ends");
}
//callback hell example
function FileOps() {
    var data = fs.readFile("./test.txt", "utf-8", function (err, data) {
        //callback1
        return fs.writeFile("./test.txt", "aaa", function () {
            //callback2
            return fs.readFile("./test.txt", "utf-8", function (err, data) {
                //callback3
                return 200;
            });
        });
    });
    setTimeout(function () {
        console.log(data);
    }, 6000);
}
//FileOpertion();
var data = FileOps();
console.log(data);
