"use strict";
exports.__esModule = true;
var fs = require("fs");
function ReadFile() {
    console.log("Read file start");
    var data = fs.readFileSync("./test.txt", "utf-8");
    console.log("read file done");
    return data;
}
function WriteToFile(fileData) {
    console.log("Write file start");
    var data = fs.writeFileSync("./test1.txt", fileData);
    console.log("Write file done");
    return data;
}
function FileOpertion() {
    console.log("file operation starts");
    var data = ReadFile();
    console.log(data);
    data = WriteToFile("Welcome to newstein class");
    console.log(data);
    console.log("file operation ends");
}
FileOpertion();
