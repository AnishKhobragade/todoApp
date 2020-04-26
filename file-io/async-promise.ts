import * as fs from "fs";
import * as util from "util"


var flag: Boolean = false;

var promiseObj = new Promise((resolve, reject )=>{
    //perform any async operation
    //error or success

    //in case of error
    //reject("error")

    //in case of success
    //resolve(300);

    setTimeout(()=>{
        //callback function
    if(flag)
    {
        resolve(200)
    }
    else
    {
        reject("Error")
    }
    }, 2000)
});

//console.log(promiseObj);

//how to handle promise object => then and catch block

promiseObj.then((data)=>{
    //in case of sucess or if promise is resolved
    //console.log(data);
})
.catch((err)=>{
    //in case of error or if promise reject
    //console.log(err);
})

function ReadFile()
{
    
    let promiseObj = new Promise((resolve, reject)=>{
        fs.readFile("./test1.txt","utf-8", (err, data)=>{
            if(err)
            {
                reject(err);
            }
            else{
                resolve(data);
            }
        })  
    });

    return promiseObj;
}

function WriteFile()
{
    let fsWritePromiseBased = util.promisify(fs.writeFile);
    let promise =  fsWritePromiseBased('./test4.txt', "Hello, WOrld");
    return promise;
}




function fileOp()
{
    console.log("File OP start")
    
    //Read file
    let promise1 = ReadFile();
    promise1.then((data)=>{
        console.log(data)
        console.log(promise1)
    })
    .catch((err)=>{
        console.log(err);
    });

    //Write to File

    let writeFilePromise = WriteFile();
    
    writeFilePromise.then(()=>{
        console.log("Write Op done")
    })
    .catch((err)=>{
        console.log("Error occure while Write OP");
        console.log(err);
    });

    console.log("file OP done");
 
}

fileOp();

//Promise Chaining => Readability to remove the Callback hell problem