import * as fs from "fs"


function ReadFile() : string
{
    console.log("Read file start");

    var data = fs.readFileSync("./test.txt","utf-8");

    console.log("read file done");

    return data;
}

function WriteToFile(fileData)
{
    console.log("Write file start");

    var data = fs.writeFileSync("./test.txt",fileData);

    console.log("Write file done");
}

function FileOpertion()
{
    console.log("file operation starts");

    var data = ReadFile();

    console.log(data)

    WriteToFile("Welcome to newstein class");

    console.log("file operation ends")

}

FileOpertion();

