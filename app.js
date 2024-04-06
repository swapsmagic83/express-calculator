const express = require('express');
const app = express();

app.use(express.json());


function mean(arr){
    let sum = 0;
    for (let x of arr){
        sum = sum +x
    }
    let mean=sum/arr.length
    return mean
}

app.get('/mean',(req,res)=>{
    console.log(req.query['nums'])
    if(!req.query.nums){
        return res.status(400).send('nums are required');
    }
    let stringArr = req.query['nums'].split(',')
    let arr =[]

        for(let i=0; i<stringArr.length; i++) {
        
            if(isNaN(stringArr[i])) {
                return res.status(404).send(`${stringArr[i]} is not a number`);
            }else{
                arr.push(Number(stringArr[i]))
            }
            console.log(arr)
        }
    
    let result ={operation : "Mean", value : mean(arr)}
    return res.status(200).send(result)
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

app.get('/median',(req,res)=>{
    if(!req.query.nums){
        return res.status(400).send('nums are required');
    }
    let stringArr = req.query['nums'].split(',');
    let arr =[]

        for(let i=0; i<stringArr.length; i++) {
        
            if(isNaN(stringArr[i])) {
                return res.status(404).send(`${stringArr[i]} is not a number`);
            }else{
                arr.push(Number(stringArr[i]))
            }
        }
    let result ={operation : "median", value : median(arr)}
    res.status(200).json(result)
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

app.get('/mode',(req,res)=>{
    if(!req.query.nums){
        return res.status(400).send('nums are required');
    }
    let stringArr = req.query['nums'].split(',');
    let arr =[]

        for(let i=0; i<stringArr.length; i++) {
        
            if(isNaN(stringArr[i])) {
                return res.status(404).send(`${stringArr[i]} is not a number`);
            }else{
                arr.push(Number(stringArr[i]))
            }
        }
    let result ={operation : "mode", value : mode(arr)}
    res.status(200).json(result)
})


app.listen(3000, ()=> {
    console.log('Server started on port 3000.');
  });

module.exports = {
    mean:mean,
    median:median,
    mode:mode
}