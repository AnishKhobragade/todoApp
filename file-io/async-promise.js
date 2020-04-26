"use strict";
exports.__esModule = true;
var fs = require("fs");
var util = require("util");
var flag = false;
var promiseObj = new Promise(function (resolve, reject) {
    //perform any async operation
    //error or success
    //in case of error
    //reject("error")
    //in case of success
    //resolve(300);
    setTimeout(function () {
        //callback function
        if (flag) {
            resolve(200);
        }
        else {
            reject("Error");
        }
    }, 2000);
});
//console.log(promiseObj);
//how to handle promise object => then and catch block
promiseObj.then(function (data) {
    //in case of sucess or if promise is resolved
    //console.log(data);
})["catch"](function (err) {
    //in case of error or if promise reject
    //console.log(err);
});
function ReadFile() {
    var promiseObj = new Promise(function (resolve, reject) {
        fs.readFile("./test1.txt", "utf-8", function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(data);
            }
        });
    });
    return promiseObj;
}
function WriteFile() {
    var promise2 = util.promisify(fs.writeFile);
    return promise2('./test4.txt', "Hello, WOrld");
}
function fileOp() {
    console.log("File OP start");
    //Read file
    var promise1 = ReadFile();
    promise1.then(function (data) {
        console.log(data);
        console.log(promise1);
    })["catch"](function (err) {
        console.log(err);
    });
    //Write to File
    var writeFilePromise = WriteFile();
    writeFilePromise.then(function () {
        console.log("Write Op done");
    })["catch"](function (err) {
        console.log("Error occure while Write OP");
        console.log(err);
    });
    console.log("file OP done");
}
fileOp();
//Promise Chaining => Readability to remove the Callback hell problem
