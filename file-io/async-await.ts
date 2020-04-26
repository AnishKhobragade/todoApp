import * as fs from "fs"
import * as util from "util"

//File Operations using async & await

//async and await we can use on asyn function
//async function wrap the data or object in promise
//if object is promise then its awaitable otherwise normal execution

function ReadFilePromise()
{
    let ReadFilePromiseBased = util.promisify(fs.readFile);
    let promise = ReadFilePromiseBased("./test.txt","utf-8");
    return promise;
}

//custom way to make fucntions asynchronous
 async function Display()
{
    return setTimeout(()=>{
        console.log("Display Function")
        return 200
    },2000)
    // return new Promise((resolve, reject)=>{
    //      setTimeout(()=>{
    //         console.log("Display Function")
    //          resolve(200);
    //     },2000)
    // })
    //return 200;
    
}

function WriteFilePromise(data)
{

    let WriteFilePromiseBased = util.promisify(fs.writeFile);
    let promise = WriteFilePromiseBased("./test.txt",data);
    return promise;
}

 async function FileOperations()
{
    try {
        //read file 1
    let readFileData =  ReadFilePromise();
    let dd11 =  Display();
    console.log(dd11);
    let data1 = await dd11;
    console.log(data1)

    console.log("HELLO")
    //
        //code without depedengt on fileread operation
    //

    //
    let data = await readFileData;

    console.log(readFileData)
    console.log(data)
    console.log("Read file done -1 ");
    //let parseData = JSON.parse(data);
    

    //write to file 1
    await WriteFilePromise("AAAAAAAAAA");
    console.log("Write file done -1 ");

    //read file 2
    let readFileData2 = await ReadFilePromise();
    console.log(readFileData2)
    console.log("Read file done - 2 ");
    } catch (err) {
        console.log("ERRR");
        console.log(err)
    }

}

FileOperations();