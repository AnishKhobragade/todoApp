import * as fs from "fs"
import * as util from "util"
import { json } from "body-parser";

//Promise Chaining

function ReadFilePromise()
{
    let ReadFilePromiseBased = util.promisify(fs.readFile);
    let promise = ReadFilePromiseBased("./test.txt","utf-8");
    return promise;
}

function WriteFilePromise(data)
{

    let WriteFilePromiseBased = util.promisify(fs.writeFile);
    let promise = WriteFilePromiseBased("./test.txt",data);
    return promise;
}

function FileOperations()
{
    ReadFilePromise()
    .then((fileData)=>{
        console.log("Read file done1");
        console.log(fileData);
        //let parseData = JSON.parse(fileData);
        try {
            let parseData = JSON.parse(fileData);
        } catch (error) {
            console.log("errr")
        }
       
        return WriteFilePromise("AAAAAAAAAAAA");
    })
    .then(()=>{
        console.log("Write to file done1");
        return ReadFilePromise();
    })
    .then((fileData)=>{
        console.log("Read file done2");
        console.log(fileData);
        return WriteFilePromise("CCCCCCCCCCCC");
       
    })
    .then(()=>{
        console.log("Write to file done2");
    })
    .catch((err)=>{
        console.log("ERRR");
        console.log(err);
    })
}

FileOperations();