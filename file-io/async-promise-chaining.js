"use strict";
exports.__esModule = true;
var fs = require("fs");
var util = require("util");
//Promise Chaining
function ReadFilePromise() {
    var ReadFilePromiseBased = util.promisify(fs.readFile);
    var promise = ReadFilePromiseBased("./test.txt", "utf-8");
    return promise;
}
function WriteFilePromise(data) {
    var WriteFilePromiseBased = util.promisify(fs.writeFile);
    var promise = WriteFilePromiseBased("./test.txt", data);
    return promise;
}
function FileOperations() {
    ReadFilePromise()
        .then(function (fileData) {
        console.log("Read file done1");
        console.log(fileData);
        //let parseData = JSON.parse(fileData);
        try {
            var parseData = JSON.parse(fileData);
        }
        catch (error) {
            console.log("errr");
        }
        return WriteFilePromise("AAAAAAAAAAAA");
    })
        .then(function () {
        console.log("Write to file done1");
        return ReadFilePromise();
    })
        .then(function (fileData) {
        console.log("Read file done2");
        console.log(fileData);
        return WriteFilePromise("CCCCCCCCCCCC");
    })
        .then(function () {
        console.log("Write to file done2");
    })["catch"](function (err) {
        console.log("ERRR");
        console.log(err);
    });
}
FileOperations();
