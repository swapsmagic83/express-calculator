const express = require('express');
const app = express();

const ExpressError = require('./expressError')

app.use(express.json());


function mean(arr){
    let sum = 0;
    for (let x of arr){
        sum = sum +x
    }
    let mean=sum/arr.length
    return mean
}

app.get('/mean',(req,res,next)=>{
    try{
        if(!req.query.nums){
            throw new ExpressError('nums are required',400)
        }
        let stringArr = req.query['nums'].split(',')
        let arr =[]
    
            for(let i=0; i<stringArr.length; i++) {
            
                if(isNaN(stringArr[i])) {
                    throw new ExpressError(`${stringArr[i]} is not a number`,400)
                }else{
                    arr.push(Number(stringArr[i]))
                }
                console.log(arr)
            }
        
        let result ={operation : "Mean", value : mean(arr)}
        return res.status(200).send(result)
    }
    catch(e){
        return next(e)
    }
})

function median(arr){
    sortedArr=arr.sort()
    if(sortedArr.length%2 !==0){
        let p = (sortedArr.length+1)/2
        let median=sortedArr[p-1]
        return median
    }else{
        let p=sortedArr.length/2
        let median=((sortedArr[p-1]+sortedArr[p])/2)
        return median
    }
}

app.get('/median',(req,res,next)=>{
    try{
        if(!req.query.nums){
            throw new ExpressError('nums are required',400)
        }
        let stringArr = req.query['nums'].split(',');
        let arr =[]
    
            for(let i=0; i<stringArr.length; i++) {
            
                if(isNaN(stringArr[i])) {
                    throw new ExpressError(`${stringArr[i]} is not a number`,400)
                }else{
                    arr.push(Number(stringArr[i]))
                }
            }
        let result ={operation : "median", value : median(arr)}
        res.status(200).json(result) 
    }
    catch(e){
        return next(e)
    }
})

function mode(arr){
    let object={}
    for (let i=0;i<arr.length;i++){
        if (object[arr[i]]) {
               object[arr[i]] += 1
          } else {
            object[arr[i]] = 1
          } 
    }
    let biggestValue = -1
  let biggestValuesKey = -1
  Object.keys(object).forEach(key => {
    let value = object[key]
    if (value > biggestValue) {
      biggestValue = value
      biggestValuesKey = key
    }
  })
  return Number(biggestValuesKey)

}

app.get('/mode',(req,res,next)=>{
    try{
        if(!req.query.nums){
            throw new ExpressError('nums are required',400)
        }
        let stringArr = req.query['nums'].split(',');
        let arr =[]
    
            for(let i=0; i<stringArr.length; i++) {
            
                if(isNaN(stringArr[i])) {
                    throw new ExpressError(`${stringArr[i]} is not a number`,400)
                }else{
                    arr.push(Number(stringArr[i]))
                }
            }
        let result ={operation : "mode", value : mode(arr)}
        res.status(200).json(result)
    }
    catch(e){
        return next(e)
    }
})

app.use((error,req,res,next)=>{
    return res.status(error.status).send(error.message);
})

app.listen(3000, ()=> {
    console.log('Server started on port 3000.');
  });

module.exports = {
    mean:mean,
    median:median,
    mode:mode
}